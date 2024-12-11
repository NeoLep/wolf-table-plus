import { stylePrefix } from '../../config'
import { h } from '../../element'

import BaseButtons from '.'
import type { HElement } from '../..'
import type Table from '../..'

export default class PaintformatButton extends BaseButtons {
    table: Table
    constructor(table: Table) {
        super(table)
        this.table = table

        const buttonItem = h('div', `${stylePrefix}-hm-button`)
        const iconEle = h('div', `${stylePrefix}-icon`)
        iconEle.html(`<div class="icon paintformat"></div>`)
        this._.append(buttonItem.append(iconEle))
        buttonItem.on('click', (e) => this.action(e as MouseEvent))
    }

    update() {
        //
    }

    async action(_evt: MouseEvent) {
        if (this.table._selector) {
            this.table._selector?.showCopy()
            this.table._selector.paintFormatArea = this.table._selector._ranges[0]
        }
    }
}
