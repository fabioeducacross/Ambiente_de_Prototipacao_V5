export function logIframeAccessBlocked(payload) {
    const data = payload && typeof payload === "object" ? payload : {}

    const entry = {
        timestamp: new Date().toISOString(),
        journeyId: data.journeyId || "unknown",
        personaId: data.personaId || "unknown",
        target: data.target || "",
        reasonCode: data.reasonCode || "UNKNOWN_REASON"
    }

    console.warn("[iframe-access-blocked]", entry)
}
