import { stylePrefix } from '../../config'
import HElement, { h } from '../../element'
import DropdownList from '../dropdown/dropdown-list'
import BaseButtons from '.'
import type { VerticalAlign } from '../../table-renderer'
import type { OptionItemType } from '../dropdown/dropdown-list'
import type Table from '../..'

export default class TextVerticalAlignButton extends BaseButtons {
    table: Table
    _dropdown: DropdownList<VerticalAlign>
    _visible = false

    constructor(table: Table) {
        super(table)
        this.table = table

        this._dropdown = new DropdownList([
            {
                label: 'top',
                value: 'top',
                action: () => this.changeTextAlign('top'),
            },
            {
                label: 'middle',
                value: 'middle',
                action: () => this.changeTextAlign('middle'),
            },
            {
                label: 'bottom',
                value: 'bottom',
                action: () => this.changeTextAlign('bottom'),
            },
        ])
        this._dropdown.value = this.table._data.style.valign
        this._dropdown._.css('margin-left', '2px')
        this._dropdown.render = this.render
        this._dropdown.customOption = this.renderOption
        this._dropdown.render()

        this._.append(this._dropdown._)
    }

    generateButton(icn: string) {
        const btn = h('div', [`${stylePrefix}-hm-button`, 'transparent_hover_color'])
        const iconEle = h('div', `${stylePrefix}-icon`)
        iconEle.html(`<div class="icon ${icn || ''}"></div>`)
        btn.append(iconEle)
        return btn
    }

    update() {
        if (!this.table._selector?._focus) return
        if (!this.table._selector?._focusRange) return
        const { startRow, startCol } = this.table._selector._focusRange
        // const cell = this.table.cell(startRow, startCol)
        const style = this.table.getStyle(startRow, startCol, true)
        this._dropdown.value = style.valign || this.table._data.style.valign

        this._dropdown.render()
    }

    render = () => {
        this._dropdown._dropDownElement._labelElement.html(
            `<div class="${stylePrefix}-icon">
        <div class="icon align-${this._dropdown.value || 'left'}"></div>
      </div>
       <span class="${stylePrefix}-icon triangle-icon" style="margin-left: -4px">
          <span class="icon arrow-down"></span>
        </span>
      `,
        )
    }
    renderOption = (item: OptionItemType<string>, li: HElement) => {
        if (item !== 'divider') {
            li.css('padding', '0 7px')
            return this.generateButton(`align-${item.value}`)
        } else {
            return h('div')
        }
    }

    changeTextAlign = (valign: VerticalAlign) => {
        this.table._events.eventTrigger('setStyle', { valign })
    }
}
