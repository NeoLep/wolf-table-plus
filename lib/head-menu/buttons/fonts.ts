import DropdownList from '../dropdown/dropdown-list'
import BaseButtons from '.'
import type { SupportFonts } from '../../data/fonts'
import type { HElement } from '../..'
import type Table from '../..'

export default class FontButton extends BaseButtons {
    table: Table
    _dropdown: DropdownList<SupportFonts>

    _visible = false
    constructor(table: Table) {
        super(table)
        this.table = table

        const fontsList = (
            [
                'Arial',
                'Helvetica Neue',
                'Microsoft YaHei',
                'Courier New',
                'Verdana',
                'Roboto',
            ] as SupportFonts[]
        ).map((font) => {
            return {
                label: font,
                value: font,
                action: (evt: MouseEvent) => this.changeFonts(evt, font),
            }
        })

        this._dropdown = new DropdownList<SupportFonts>(fontsList)
        this._dropdown.value = 'Arial'
        this._.append(this._dropdown._)
        this.render()
    }

    update() {
        if (!this.table._selector?._focusRange) return
        const { startRow, startCol } = this.table._selector._focusRange
        // const cell = this.table.cell(startRow, startCol)
        const style = this.table.getStyle(startRow, startCol)
        this._dropdown.value = (style.fontFamily as SupportFonts) || 'Arial'
        this.render()
    }

    changeFonts(_evt: MouseEvent, font: SupportFonts) {
        this._dropdown.value = font
        this.table._events.eventTrigger('setStyle', { fontFamily: font })
        this.render()
    }

    render() {
        this._dropdown.render()
    }
}
