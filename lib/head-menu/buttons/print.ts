import { stylePrefix } from '../../config'
import { h } from '../../element'

import BaseButtons from '.'
import type { HElement } from '../..'
import type Table from '../..'

export default class PrintButton extends BaseButtons {
    table: Table
    button: HElement
    constructor(table: Table) {
        super(table)
        this.table = table
        this.button = h('div', `${stylePrefix}-hm-button`).append(
            h('div', `${stylePrefix}-icon`).html(`<div class="icon print"></div>`),
        )
        this._.append(this.button)
        this.button.on('click', (e) => this.action(e as MouseEvent))
    }

    update() {
        //
    }

    action(_evt: MouseEvent) {
        if (this.disabled) return
        this.table._events.eventTrigger('print')
    }
}
