import argparse
import ctypes
import ctypes.wintypes as w
import json
import urllib.error
import urllib.request

TARGET = "figma|d39d3b6252bc1ac5.Codex MCP Credentials"
ENDPOINT = "https://mcp.figma.com/mcp"
CRED_TYPE_GENERIC = 1


class CREDENTIAL(ctypes.Structure):
    _fields_ = [
        ("Flags", w.DWORD),
        ("Type", w.DWORD),
        ("TargetName", w.LPWSTR),
        ("Comment", w.LPWSTR),
        ("LastWritten", ctypes.c_byte * 8),
        ("CredentialBlobSize", w.DWORD),
        ("CredentialBlob", ctypes.POINTER(ctypes.c_ubyte)),
        ("Persist", w.DWORD),
        ("AttributeCount", w.DWORD),
        ("Attributes", ctypes.c_void_p),
        ("TargetAlias", w.LPWSTR),
        ("UserName", w.LPWSTR),
    ]


def read_access_token() -> str:
    cred_read = ctypes.windll.advapi32.CredReadW
    cred_read.argtypes = [w.LPCWSTR, w.DWORD, w.DWORD, ctypes.POINTER(ctypes.POINTER(CREDENTIAL))]
    cred_read.restype = w.BOOL
    cred_free = ctypes.windll.advapi32.CredFree
    cred_free.argtypes = [ctypes.c_void_p]

    pcred = ctypes.POINTER(CREDENTIAL)()
    if not cred_read(TARGET, CRED_TYPE_GENERIC, 0, ctypes.byref(pcred)):
        raise RuntimeError("CredReadW failed")
    try:
        cred = pcred.contents
        blob = ctypes.string_at(cred.CredentialBlob, cred.CredentialBlobSize)
    finally:
        cred_free(pcred)

    data = None
    for enc in ("utf-16-le", "utf-8"):
        try:
            data = json.loads(blob.decode(enc))
            break
        except Exception:
            continue
    if not data:
        raise RuntimeError("Could not decode credential JSON")
    return data["token_response"]["access_token"]


def parse_sse(raw: str):
    events = []
    event_name = None
    data_lines = []
    for line in raw.splitlines():
        if line == "":
            if event_name is not None or data_lines:
                payload = "\n".join(data_lines)
                item = {"event": event_name, "raw_data": payload}
                try:
                    item["data_json"] = json.loads(payload)
                except Exception:
                    pass
                events.append(item)
            event_name = None
            data_lines = []
            continue
        if line.startswith("event:"):
            event_name = line.split(":", 1)[1].strip()
        elif line.startswith("data:"):
            data_lines.append(line.split(":", 1)[1].strip())
    if event_name is not None or data_lines:
        payload = "\n".join(data_lines)
        item = {"event": event_name, "raw_data": payload}
        try:
            item["data_json"] = json.loads(payload)
        except Exception:
            pass
        events.append(item)
    return events


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--method", required=True)
    parser.add_argument("--params", default="{}")
    parser.add_argument("--params-file")
    parser.add_argument("--timeout", type=float, default=30.0)
    args = parser.parse_args()

    if args.params_file:
        with open(args.params_file, "r", encoding="utf-8") as f:
            params = json.load(f)
    else:
        params = json.loads(args.params)
    token = read_access_token()

    body = json.dumps(
        {
            "jsonrpc": "2.0",
            "id": 1,
            "method": args.method,
            "params": params,
        }
    ).encode("utf-8")

    req = urllib.request.Request(
        ENDPOINT,
        data=body,
        method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
        },
    )

    out = {"request_method": args.method}
    try:
        with urllib.request.urlopen(req, timeout=args.timeout) as resp:
            text = resp.read().decode("utf-8", errors="replace")
            out["status"] = resp.status
            out["content_type"] = resp.headers.get("content-type")
            out["mcp_session_id"] = resp.headers.get("mcp-session-id")
            if out["content_type"] and "text/event-stream" in out["content_type"]:
                out["events"] = parse_sse(text)
            else:
                try:
                    out["json"] = json.loads(text)
                except Exception:
                    out["raw"] = text
    except urllib.error.HTTPError as e:
        out["status"] = e.code
        out["www_authenticate"] = e.headers.get("www-authenticate")
        out["raw"] = e.read().decode("utf-8", errors="replace")
    except Exception as e:
        out["status"] = "error"
        out["error"] = str(e)

    print(json.dumps(out, ensure_ascii=False))


if __name__ == "__main__":
    main()
