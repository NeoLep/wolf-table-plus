import { stylePrefix } from '../../config'
import { h } from '../../element'

import BaseButtons from '.'
import type { HElement } from '../..'
import type Table from '../..'

export default class ClearformatButton extends BaseButtons {
    table: Table
    constructor(table: Table) {
        super(table)
        this.table = table

        const buttonItem = h('div', `${stylePrefix}-hm-button`)
        const iconEle = h('div', `${stylePrefix}-icon`)
        iconEle.html(`<div class="icon clearformat"></div>`)
        this._.append(buttonItem.append(iconEle))
        buttonItem.on('click', (e) => this.action(e as MouseEvent))
    }

    update() {
        //
    }

    action(_evt: MouseEvent) {
        this.table._events.eventTrigger('clearCell', 'style')
        this.table._events.eventTrigger('clearCell', 'format')
    }
}
