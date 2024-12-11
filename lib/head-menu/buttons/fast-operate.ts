import { stylePrefix } from '../../config'
import { h } from '../../element'

import BaseButtons from '.'
import type { HElement } from '../..'
import type Table from '../..'

type ButtonType =
    | 'font-bold'
    | 'font-italic'
    | 'underline'
    | 'strike'
    | 'merge'
    | 'textwrap'
    | 'freeze'
    | 'reduce-dicimal'
    | 'increase-dicimal'

export default class FastOperateButton extends BaseButtons {
    table: Table
    buttonType: ButtonType
    button: HElement
    constructor(table: Table, type: ButtonType, callback?: Function) {
        super(table)
        this.table = table
        this.buttonType = type

        this.button = h('div', `${stylePrefix}-hm-button`)

        const iconEle = h('div', `${stylePrefix}-icon`)
        iconEle.html(`<div class="icon ${this.buttonType}"></div>`)
        this.button.append(iconEle)

        if (callback) callback(this)

        this.button.on('click', (e) => this.action(e as MouseEvent))
        this._.append(this.button)
    }

    update() {
        if (!this.table._selector?._focus) return
        if (!this.table._selector?._focusRange) return
        const { startRow, startCol } = this.table._selector._focusRange
        const cell = this.table.cell(startRow, startCol)
        const style = this.table.getStyle(startRow, startCol, true)

        let status = false
        if (this.buttonType === 'font-bold') {
            status = !!style.bold
        } else if (this.buttonType === 'font-italic') {
            status = !!style.italic
        } else if (this.buttonType === 'strike') {
            status = !!style.strikethrough
        } else if (this.buttonType === 'underline') {
            status = !!style.underline
        } else if (this.buttonType === 'merge') {
            status = this.table.isMerged()
        } else if (this.buttonType === 'textwrap') {
            status = !!style.textwrap
        } else if (this.buttonType === 'freeze') {
            status = !!this.table._data.freeze
        } else if (this.buttonType === 'increase-dicimal' || this.buttonType === 'reduce-dicimal') {
            if (
                cell instanceof Object &&
                (cell.format === 'number' || cell.format === 'scientific')
            ) {
                this._.show()
            } else {
                this._.hide()
            }
        }

        if (status) this.button.addCss('active')
        else this.button.removeCss('active')

        return this
    }

    action(_evt: MouseEvent) {
        if (this.buttonType === 'font-bold') {
            this.table._events.eventTrigger('fastStyle', 'bold')
        } else if (this.buttonType === 'font-italic') {
            this.table._events.eventTrigger('fastStyle', 'italic')
        } else if (this.buttonType === 'strike') {
            this.table._events.eventTrigger('fastStyle', 'strikethrough')
        } else if (this.buttonType === 'underline') {
            this.table._events.eventTrigger('fastStyle', 'underline')
        } else if (this.buttonType === 'merge') {
            this.table._events.eventTrigger('merge')
        } else if (this.buttonType === 'textwrap') {
            this.table._events.eventTrigger('fastStyle', 'textwrap')
        } else if (this.buttonType === 'freeze') {
            this.table._events.eventTrigger('freeze')
        } else if (this.buttonType === 'increase-dicimal') {
            this.table._events.eventTrigger('fastFixed', 'increase')
        } else if (this.buttonType === 'reduce-dicimal') {
            this.table._events.eventTrigger('fastFixed', 'reduce')
        }
        // this.table._events.eventTrigger('clearCell', { type: 'style' })
    }
}
