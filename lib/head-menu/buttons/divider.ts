import { stylePrefix } from '../../config'
import { h } from '../../element'

import BaseButtons from '.'
import type { HElement } from '../..'
import type Table from '../..'

export default class Divider extends BaseButtons {
    table: Table
    constructor(table: Table) {
        super(table)
        this.table = table
        this._.append(h('div', `${stylePrefix}-hm-divider`).css('margin-left', '3px'))
    }
}
