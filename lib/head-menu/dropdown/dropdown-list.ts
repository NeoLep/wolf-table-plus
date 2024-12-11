import { h } from '../../element'
import { stylePrefix } from '../../config'
import Dropdown from '.'
import type HElement from '../../element'

type StatusType = boolean | (() => boolean) | (() => Promise<boolean>)
export type OptionItemType<T> =
    | {
          label: string
          value: T
          hide?: StatusType
          disabled?: StatusType
          action: (evt: MouseEvent) => void
          props?: Record<string, unknown>
      }
    | 'divider'

export const transferStatusToPromise = (status?: StatusType): Promise<boolean> => {
    if (status === undefined) return new Promise((resolve) => resolve(false))
    if (typeof status === 'boolean') return new Promise((resolve) => resolve(status))
    else if (typeof status === 'function') {
        const funcRes = status()
        if (Object.prototype.toString.call(funcRes) === '[object Promise]') {
            return funcRes as Promise<boolean>
        } else {
            return new Promise((resolve) => resolve(funcRes as boolean))
        }
    }

    return new Promise((resolve) => resolve(false))
}
export default class DropdownList<T> {
    disabled = false
    value: T | null = null
    options: OptionItemType<T>[] = []
    _: HElement

    _dropDownElement: Dropdown

    customOption: ((option: OptionItemType<T>, li: HElement) => HElement | null) | null = null

    constructor(options: OptionItemType<T>[]) {
        this.options = options
        this._dropDownElement = new Dropdown(
            h('span', [`${stylePrefix}-hm-button`, `${stylePrefix}-hm-dropdown`]),
            h('ul', 'dropdown-list'),
        )

        this._ = this._dropDownElement._
        this._dropDownElement.beforeShow = async () => {
            if (this.disabled) {
                throw new Error('dropdown list disabled')
            }
            await this.renderList()
        }
    }

    async renderList() {
        const result: HElement[] = []
        for (const option of this.options) {
            if (typeof option === 'string' && option === 'divider') {
                result.push(h('li', 'divider'))
            } else if (typeof option === 'object') {
                const hide = await transferStatusToPromise(option.hide)
                if (hide) continue

                const classList = ['dropdown-item']
                const disabled = await transferStatusToPromise(option.disabled)
                if (disabled) classList.push('disabled')

                const listItem = h('li', classList)
                if (this.customOption) {
                    listItem.append(this.customOption(option, listItem) || '')
                } else {
                    listItem.html(option.label)
                }

                if (option.action && typeof option.action === 'function') {
                    listItem.on('click', (e) => option.action(e as MouseEvent))
                }

                result.push(listItem)
            }
        }
        this._dropDownElement._contentElement.html('')
        this._dropDownElement._contentElement.append(...result)
    }

    render() {
        let vlabel = ''
        const index = this.options.findIndex(
            (item) => typeof item !== 'string' && item.value === this.value,
        )
        if (index !== -1) {
            vlabel = (this.options[index] as { label: string })?.label
        }
        const htmlText = `${vlabel}
        <span class="${stylePrefix}-icon triangle-icon">
          <span class="icon arrow-down"></span>
        </span>
  `
        this._dropDownElement._labelElement.html(htmlText)
    }

    hide = (evt?: MouseEvent) => this._dropDownElement.hide(evt)
}
