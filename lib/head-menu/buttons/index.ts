import { h } from '../../element'
import type { HElement } from '../..'
import type Table from '../..'

export default class BaseButtons {
    table: Table
    _: HElement
    _tooltip: HElement | null = null

    hidden = false
    disabled = false

    constructor(table: Table) {
        this.table = table
        this._ = h('div', 'button-container')
    }

    update() {}
    action(_evt: MouseEvent) {}
    tooltip(tooltip: { title: string; shortkey?: string; delay?: number } | string) {
        setTimeout(() => {
            let title = ''
            if (typeof tooltip === 'string') {
                title = tooltip
            } else {
                title = tooltip.title
            }
            let hText = `<div style="padding: 6px"><span>${title}</span>`

            if (tooltip instanceof Object) {
                if (tooltip.shortkey) {
                    hText += `<span style="margin-left: 5px; font-size: 12px">${tooltip.shortkey}</span>`
                }
            }

            hText += '</div>'

            this._tooltip = h('div', 'tooltips')
                .html(hText)
                .css('position', 'absolute')
                .css('top', '40px')
                .css('z-index', '999')
                .css('background', '#fff')
                .hide()

            let interval: number | null = null
            const delayTime = typeof tooltip === 'string' ? undefined : tooltip.delay
            this._.on('mouseenter', () => {
                if (interval) clearTimeout(interval)
                interval = window.setTimeout(() => {
                    this._tooltip?.show()
                }, delayTime ?? 500)
            })
            this._.on('mouseleave', () => {
                if (interval) clearTimeout(interval)
                this._tooltip?.hide()
            })
            this._.append(this._tooltip)
        }, 100)
        return this
    }
}
