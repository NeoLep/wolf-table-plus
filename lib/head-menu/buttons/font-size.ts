import DropdownList from '../dropdown/dropdown-list'
import BaseButtons from '.'
import type { HElement } from '../..'
import type Table from '../..'

export default class FontSizeButton extends BaseButtons {
    table: Table
    _dropdown: DropdownList<number>

    _visible = false
    constructor(table: Table) {
        super(table)
        this.table = table

        // const { t } = this.table._i18n

        const fontsList = (
            [
                6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
                48, 50,
            ] as number[]
        ).map((font) => {
            return {
                label: `${font}`,
                value: font,
                action: (evt: MouseEvent) => this.changeFontSize(evt, font),
            }
        })
        this._dropdown = new DropdownList(fontsList)
        this._dropdown._dropDownElement._contentElement.css('max-height', '250px')
        this._dropdown._dropDownElement._contentElement.css('overflow-y', 'scroll')

        this._dropdown.value = 10
        this._.append(this._dropdown._)
        this.render()
    }

    update() {
        if (!this.table._selector?._focusRange) return
        const { startRow, startCol } = this.table._selector._focusRange
        const style = this.table.getStyle(startRow, startCol)
        this._dropdown.value = (style?.fontSize as number) || 10
        this.render()
    }

    changeFontSize(_evt: MouseEvent, size: number) {
        this._dropdown.value = size
        this.table._events.eventTrigger('setStyle', { fontSize: size })
        this._dropdown.hide()
        this.render()
    }

    render() {
        this._dropdown.render()
    }
}
