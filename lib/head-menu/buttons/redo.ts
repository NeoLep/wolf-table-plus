import { stylePrefix } from '../../config'
import { h } from '../../element'

import BaseButtons from '.'
import type { HElement } from '../..'
import type Table from '../..'

export default class RedoButton extends BaseButtons {
    table: Table
    button: HElement
    constructor(table: Table) {
        super(table)
        this.table = table

        this.button = h('div', `${stylePrefix}-hm-button`)
        const iconEle = h('div', `${stylePrefix}-icon`)
        iconEle.html(`<div class="icon redo"></div>`)
        this._.append(this.button.append(iconEle))
        this.button.on('click', (e) => this.action(e as MouseEvent))
    }

    update() {
        this.disabled = !this.table._history.canRedo()
        if (this.disabled) {
            this.button._.classList.add('disabled')
        } else {
            this.button._.classList.remove('disabled')
        }
    }

    action(_evt: MouseEvent) {
        if (this.disabled) return
        this.table._events.eventTrigger('redo')
    }
}
