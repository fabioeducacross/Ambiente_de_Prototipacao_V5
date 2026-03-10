import { config } from '@vue/test-utils'

config.global.stubs = {
    transition: false
}

Object.defineProperty(globalThis, '__WIKI_URL__', {
    value: 'http://localhost:3000/Ambiente_de_Prototipacao_V5/wiki/',
    writable: true,
    configurable: true
})

Object.defineProperty(globalThis, '__GIT_BRANCH__', {
    value: 'test',
    writable: true,
    configurable: true
})

Object.defineProperty(globalThis, '__GIT_SHA__', {
    value: '0000000',
    writable: true,
    configurable: true
})

Object.defineProperty(globalThis, '__APP_VERSION__', {
    value: 'test',
    writable: true,
    configurable: true
})

if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => { },
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => false
        })
    })
}
