import { stylePrefix } from '../config'
import HElement, { CSSAttrs, h } from '../element'

export default class Button {
    _ = h('button', `${stylePrefix}-bse-button`).attr('type', 'button')
    configs:
        | {
              disabled?: boolean
              padding?: string
              noneBorder?: boolean
              onClick?: () => void
              style?: CSSAttrs
          }
        | undefined

    baseName: string | HElement

    constructor(
        name: string | HElement,
        type: 'default' | 'warning' | 'primary' | 'danger' | 'success' | 'info' = 'default',
        configs?: typeof this.configs,
    ) {
        this._.addCss(`${stylePrefix}-bse-button--${type}`)

        this._.on('click', (e) => {
            if (this.configs?.onClick && !this.configs.disabled) this.configs?.onClick()
            ;(e as MouseEvent).preventDefault()
        })

        this.baseName = name
        this.configs = configs

        this.render()
    }

    render() {
        if (typeof this.baseName === 'string') {
            this._.textContent(this.baseName)
        } else {
            this._.append(this.baseName)
        }

        if (this.configs?.padding) {
            this._.css('padding', this.configs.padding)
        }
        if (this.configs?.disabled) {
            this._.addCss(`is-disabled`)
        } else {
            this._.removeCss(`is-disabled`)
        }
        if (this.configs?.noneBorder) {
            this._.addCss('none-border')
        }
        if (this.configs?.style) {
            this._.setStyles(this.configs!.style)
        }
    }
}

export class Icon {
    _: HElement
    constructor(icon: string) {
        this._ = h('div', `${stylePrefix}-icon`).append(h('div', ['icon', icon]))
    }
}
