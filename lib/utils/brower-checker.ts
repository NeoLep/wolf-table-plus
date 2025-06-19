export const isFirefox = () => {
    return /Firefox/.test(window.navigator.userAgent)
}

export const isOpera = () => {
    return /Opera|OPR/.test(window.navigator.userAgent)
}

export const isSafari = () => {
    return /Safari/.test(window.navigator.userAgent) && !/Chrome/.test(window.navigator.userAgent)
}

export const isChrome = () => {
    return (
        /Chrome/.test(window.navigator.userAgent) &&
        !/OPR/.test(window.navigator.userAgent) &&
        !/Edge/.test(window.navigator.userAgent)
    )
}

export const isEdge = () => {
    return /Edg/.test(window.navigator.userAgent)
}
