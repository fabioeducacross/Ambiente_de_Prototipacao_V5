export const INTERNAL_PATH_PREFIXES = [
    '/',
    '/teacher',
    '/student',
    '/coordinator',
    '/director',
    '/administrator',
    '/network-manager'
]

export const EXTERNAL_ALLOWED = [
    {
        origin: 'https://www.youtube.com',
        pathPrefixes: ['/embed/']
    },
    {
        origin: 'https://youtube.com',
        pathPrefixes: ['/embed/']
    },
    {
        origin: 'https://player.vimeo.com',
        pathPrefixes: ['/video/']
    }
]

export const IFRAME_WHITELIST_CONFIG = {
    internalPathPrefixes: INTERNAL_PATH_PREFIXES,
    externalAllowed: EXTERNAL_ALLOWED,
    prohibitedSchemes: ['javascript:', 'data:', 'file:']
}
