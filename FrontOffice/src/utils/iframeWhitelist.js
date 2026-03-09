import { IFRAME_WHITELIST_CONFIG as IFRAME_WHITELIST_BASE_CONFIG } from '@/config/iframeWhitelist'

export const IFRAME_WHITELIST_CONFIG = IFRAME_WHITELIST_BASE_CONFIG

function normalizePath(value) {
    if (typeof value !== "string") {
        return ""
    }

    const trimmed = value.trim()
    if (!trimmed) {
        return ""
    }

    return trimmed.startsWith("/") ? trimmed : "/" + trimmed
}

function hasPathPrefix(pathname, prefixes) {
    return prefixes.some(function (prefix) {
        return pathname.startsWith(prefix)
    })
}

function isProhibitedScheme(target, prohibitedSchemes) {
    const lowerTarget = target.toLowerCase()
    return prohibitedSchemes.some(function (scheme) {
        return lowerTarget.startsWith(scheme)
    })
}

export function validateIframeTarget(target, config = IFRAME_WHITELIST_CONFIG) {
    const defaultResponse = {
        kind: "invalid",
        allowed: false,
        reasonCode: "INVALID_TARGET",
        normalizedUrl: "",
        origin: "",
        path: ""
    }

    if (typeof target !== "string") {
        return defaultResponse
    }

    const rawTarget = target.trim()
    if (!rawTarget) {
        return defaultResponse
    }

    const prohibitedSchemes = (config && config.prohibitedSchemes) || []
    if (isProhibitedScheme(rawTarget, prohibitedSchemes)) {
        return {
            kind: "invalid",
            allowed: false,
            reasonCode: "PROHIBITED_SCHEME",
            normalizedUrl: "",
            origin: "",
            path: ""
        }
    }

    const looksInternal =
        rawTarget.startsWith("/") ||
        rawTarget.startsWith("./") ||
        rawTarget.startsWith("../") ||
        rawTarget.startsWith("#")

    if (looksInternal) {
        const normalizedPath = normalizePath(rawTarget.split(/[?#]/)[0])
        const internalPrefixes = (config && config.internalPathPrefixes) || []

        if (!normalizedPath || !hasPathPrefix(normalizedPath, internalPrefixes)) {
            return {
                kind: "internal",
                allowed: false,
                reasonCode: "INTERNAL_PATH_NOT_ALLOWED",
                normalizedUrl: normalizedPath,
                origin: "",
                path: normalizedPath
            }
        }

        return {
            kind: "internal",
            allowed: true,
            reasonCode: "OK",
            normalizedUrl: normalizedPath,
            origin: "",
            path: normalizedPath
        }
    }

    let parsed
    try {
        parsed = new URL(rawTarget)
    } catch (error) {
        return {
            kind: "invalid",
            allowed: false,
            reasonCode: "MALFORMED_URL",
            normalizedUrl: "",
            origin: "",
            path: ""
        }
    }

    const protocol = parsed.protocol.toLowerCase()
    if (protocol !== "http:" && protocol !== "https:") {
        return {
            kind: "invalid",
            allowed: false,
            reasonCode: "UNSUPPORTED_PROTOCOL",
            normalizedUrl: parsed.href,
            origin: parsed.origin,
            path: parsed.pathname
        }
    }

    const normalizedOrigin = parsed.origin.toLowerCase()
    const pathname = parsed.pathname || "/"
    const normalizedUrl = parsed.href
    const externalAllowed = (config && config.externalAllowed) || []

    const matched = externalAllowed.find(function (entry) {
        const entryOrigin = String(entry.origin || "").toLowerCase()
        const prefixes = Array.isArray(entry.pathPrefixes) ? entry.pathPrefixes : []
        return entryOrigin === normalizedOrigin && hasPathPrefix(pathname, prefixes)
    })

    if (!matched) {
        return {
            kind: "external-blocked",
            allowed: false,
            reasonCode: "EXTERNAL_NOT_ALLOWED",
            normalizedUrl: normalizedUrl,
            origin: normalizedOrigin,
            path: pathname
        }
    }

    return {
        kind: "external-allowed",
        allowed: true,
        reasonCode: "OK",
        normalizedUrl: normalizedUrl,
        origin: normalizedOrigin,
        path: pathname
    }
}
