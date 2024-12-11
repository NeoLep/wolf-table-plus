import { h } from '../../element'
import { stylePrefix } from '../../config'
import type HElement from '../../element'

export const isMouseInnerElementArea = (element: HTMLElement, evt: MouseEvent): boolean => {
    const pos = element.getBoundingClientRect()
    const contentRange: {
        x: [number, number]
        y: [number, number]
    } = {
        y: [pos.top, pos.top + pos.height],
        x: [pos.left, pos.left + pos.width],
    }
    if (
        evt.clientX >= contentRange.x[0] &&
        evt.clientX <= contentRange.x[1] &&
        evt.clientY >= contentRange.y[0] &&
        evt.clientY <= contentRange.y[1]
    ) {
        return true
    }
    return false
}

export default class Dropdown {
    _visible = false
    disabled = false
    _: HElement
    _labelElement: HElement
    _contentElement: HElement // content

    beforeShow: ((evt?: MouseEvent) => void) | ((evt?: MouseEvent) => Promise<void>) | null = null
    onShow: ((evt?: MouseEvent) => void) | null = null
    beforeHide: ((evt?: MouseEvent) => void) | ((evt?: MouseEvent) => Promise<void>) | null = null
    onHide: ((evt?: MouseEvent) => void) | null = null

    constructor(labelElement: HElement, contentElement: HElement) {
        const elementClass = [`${stylePrefix}-dropdown-container`]

        this._ = h('div', elementClass)
        this._labelElement = labelElement
        this._labelElement.on('click', (_evt) => {
            if (this.disabled) return
            this.show()
        })
        this._.append(this._labelElement)

        this._contentElement = contentElement
        this._contentElement.addCss('dropdown-list')
        this._contentElement.hide()
        this._.append(this._contentElement)
    }

    async show(evt?: MouseEvent) {
        if (this.disabled) return
        try {
            if (this.beforeShow) {
                await this.beforeShow(evt)
            }
            this._contentElement.show()
            this._labelElement.addCss('active')
            this._visible = true
            setTimeout(() => {
                window.addEventListener('click', this.hide)
                window.addEventListener('contextmenu', this.hide)
            }, 0)
            if (this.onShow) {
                this.onShow(evt)
            }
        } catch {
            //
        }
    }

    hide = async (evt?: MouseEvent) => {
        if (
            this._contentElement.firstChild?._ &&
            evt &&
            isMouseInnerElementArea(this._contentElement._, evt)
        ) {
            return
        }

        try {
            if (this.beforeHide) {
                await this.beforeHide(evt)
            }
            setTimeout(() => {
                this._labelElement.removeCss('active')
                this._contentElement.hide()
                window.removeEventListener('click', this.hide)
                window.removeEventListener('contextmenu', this.hide)
                this._visible = false

                if (this.onHide) {
                    this.onHide(evt)
                }
            }, 0)
        } catch {
            //
        }
    }
}
