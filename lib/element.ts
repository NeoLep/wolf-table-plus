function createFragment(...nodes: (HElement | Node | string)[]) {
    const fragment = document.createDocumentFragment()
    nodes.forEach((node) => {
        let nnode: Node
        if (node instanceof HElement) nnode = node._
        else if (typeof node === 'string') nnode = document.createTextNode(node)
        else nnode = node
        fragment.append(nnode)
    })
    return fragment
}

export type CSSAttrs = {
    left?: number
    top?: number
    width?: number
    height?: number
    position?: string
    [property: string]: unknown
}

export default class HElement {
    _: HTMLElement
    _data = new Map()

    constructor(tag: string | Node, className?: string | string[] | object) {
        this._ = tag instanceof Node ? <HTMLElement>tag : document.createElement(tag)
        if (className) {
            if (typeof className === 'string') {
                this._.className = className
            } else if (Array.isArray(className)) {
                this._.className = className.join(' ')
            } else {
                for (const [key, value] of Object.entries(className)) {
                    if (value) this._.classList.add(key)
                }
            }
        }
    }

    element() {
        return this._
    }

    data(key: string): HElement
    data(key: string, value: unknown): HElement
    data(key: string, value?: unknown) {
        if (value) {
            this._data.set(key, value)
            return this
        } else {
            return this._data.get(key)
        }
    }

    on(eventName: string, handler: (evt: unknown) => void) {
        const [evtName, ...prop] = eventName.split('.')
        this._.addEventListener(evtName, (evt) => {
            handler(evt)
            for (const element of prop) {
                if (element === 'stop') {
                    evt.stopPropagation()
                }
                if (element === 'prevent') {
                    evt.preventDefault()
                }
            }
        })
        return this
    }

    focus() {
        this._.focus()
        return this
    }

    value(): string
    value(v: string): HElement
    value(v?: string): string | HElement {
        if (v !== undefined) {
            ;(this._ as HTMLInputElement).value = v
            return this
        }
        return (this._ as HTMLInputElement).value
    }

    textContent(v: string) {
        this._.textContent = v
        return this
    }

    html(v: string) {
        this._.innerHTML = v
        return this
    }

    attr(key: string): string | null
    attr(key: string, value: string): HElement
    attr(key: string, value?: string): string | HElement | null {
        if (value) {
            this._.setAttribute(key, value)
            return this
        }
        return this._.getAttribute(key)
    }

    addCss(name: string) {
        this._.classList.add(name)
    }
    removeCss(name: string) {
        this._.classList.remove(name)
    }

    css(key: string): string
    css(props: CSSAttrs): HElement
    css(key: string, value: string): HElement
    css(key: string | CSSAttrs, value?: string): string | HElement {
        const { style } = this._
        if (value && typeof key === 'string') {
            style.setProperty(key, value)
            return this
        }

        if (typeof key === 'string') {
            return style.getPropertyValue(key)
        }

        Object.keys(key).forEach((k) => {
            let v = key[k]
            if (typeof v === 'number') v = `${v}px`
            style.setProperty(k, v as string)
        })
        return this
    }

    rect() {
        return this._.getBoundingClientRect()
    }

    offset() {
        const { _ } = this
        return {
            x: _.offsetLeft,
            y: _.offsetTop,
            width: _.offsetWidth,
            height: _.offsetHeight,
        }
    }

    computedStyle() {
        return window.getComputedStyle(this._)
    }

    show(flag = true) {
        this.css('display', flag ? 'block' : 'none')
        return this
    }

    hide() {
        this.css('display', 'none')
        return this
    }

    scrollx(): number
    scrollx(value: number): HElement
    scrollx(value?: number): number | HElement {
        const { _ } = this
        if (value !== undefined) {
            _.scrollLeft = value
            return this
        }
        return _.scrollLeft
    }

    scrolly(): number
    scrolly(value: number): HElement
    scrolly(value?: number): number | HElement {
        const { _ } = this
        if (value !== undefined) {
            _.scrollTop = value
            return this
        }
        return _.scrollTop
    }

    after(...nodes: (HElement | Node | string)[]) {
        this._.after(createFragment(...nodes))
        return this
    }

    before(...nodes: (HElement | Node | string)[]) {
        this._.before(createFragment(...nodes))
        return this
    }

    append(...nodes: (HElement | Node | string)[]) {
        this._.append(createFragment(...nodes))
        return this
    }

    remove(...nodes: HElement[]) {
        nodes.forEach((node) => {
            ;(node instanceof HElement ? node._ : node).remove()
        })
    }

    cloneNode() {
        return this._.cloneNode(true)
    }

    get firstChild(): HElement | null {
        const first = this._.firstChild
        return first ? new HElement(first) : null
    }
}

export function h(tag: string | HTMLElement, className?: string | string[] | object) {
    return new HElement(tag, className)
}

export function textWidth(text: string, fontSize: string, fontFamily: string) {
    const el = document.createElement('span')
    el.style.display = 'inline-block'
    el.style.position = 'absolute'
    el.style.zIndex = '-900'
    el.style.whiteSpace = 'nowrap'
    el.style.fontSize = fontSize
    el.style.fontFamily = fontFamily
    el.textContent = text
    document.body.append(el)
    const width = el.clientWidth
    el.remove()
    return width
}
