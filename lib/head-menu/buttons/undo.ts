import { stylePrefix } from '../../config'
import { h } from '../../element'

import BaseButtons from '.'
import type { HElement } from '../..'
import type Table from '../..'

export default class UndoButton extends BaseButtons {
    table: Table
    button: HElement
    constructor(table: Table) {
        super(table)
        this.table = table

        this.button = h('div', `${stylePrefix}-hm-button`).append(
            h('div', `${stylePrefix}-icon`).html(`<div class="icon undo"></div>`),
        )
        this._.append(this.button)
        this.button.on('click', (e) => this.action(e as MouseEvent))
    }

    update() {
        this.disabled = !this.table._history.canUndo()

        if (this.disabled) {
            this.button._.classList.add('disabled')
        } else {
            this.button._.classList.remove('disabled')
        }
    }

    action(_evt: MouseEvent) {
        if (this.disabled) return
        this.table._events.eventTrigger('undo')
    }
}
