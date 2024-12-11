import { stylePrefix } from '../../config'
import { h } from '../../element'
import Dropdown from '../dropdown'
import ColorPicker from '../color-picker'
import BaseButtons from '.'
import type Table from '../..'

export default class textColorButton extends BaseButtons {
    table: Table
    _dropdown: Dropdown
    _colorPicker: ColorPicker
    _visible = false

    constructor(table: Table) {
        super(table)
        this.table = table
        this._colorPicker = new ColorPicker(undefined, table)
        this._colorPicker.onChange = (color: string) => {
            this.changeColor(color)
        }

        this._dropdown = new Dropdown(this.generateButton('color'), this._colorPicker._)

        this._colorPicker.fastColor = this.table._data.style.color
        this._dropdown._labelElement.firstChild?.css(
            'border-bottom',
            `3px solid ${this.table._data.style.color}`,
        )
        this._dropdown._.css('margin-left', '2px')

        this._.append(this._dropdown._)
        this.render()
    }

    generateButton(icn: string) {
        const btn = h('div', `${stylePrefix}-hm-button`)
        const iconEle = h('div', `${stylePrefix}-icon`)
        iconEle.html(`<div class="icon ${icn || ''}"></div>`)
        btn.append(iconEle)
        return btn
    }

    changeColor(color: string) {
        this.table._events.eventTrigger('setStyle', {
            color,
        })
        this._dropdown.hide()
        this.update()
    }

    update() {
        this.render()
    }
    render() {
        let color = this.table._data.style.color
        if (this.table._selector?._focusRange) {
            const { startRow, startCol } = this.table._selector._focusRange
            const style = this.table.getStyle(startRow, startCol, true)
            if (style.color) {
                color = style.color
            }
        }

        this._dropdown._labelElement.firstChild?.css('border-bottom-color', color)
    }
}
