import { h } from '../element'
import { stylePrefix } from '../config'
import ButtonList from './button-list'
import type BaseButtons from './buttons'
import type HElement from '../element'
import type Table from '..'

export default class HeadMenu {
    table: Table
    _headMenuElement: HElement
    height = 40

    options: BaseButtons[] = []

    constructor(table: Table) {
        this.table = table

        this._headMenuElement = h('div', `${stylePrefix}-head-menu`)
        this._headMenuElement.css({
            height: this.height,
        })

        this.init()
        this.table._i18n.onChange(() => {
            this.init()
        })
    }

    async init() {
        this._headMenuElement.html('')
        this.options = ButtonList(this.table)
        for (const btn of this.options) {
            this._headMenuElement.append(btn._)
        }
    }

    updateStatus() {
        for (const btn of this.options) {
            btn.update()
        }
    }
    render() {
        if (this._headMenuElement._.hasChildNodes()) {
            this.updateStatus()
        } else {
            this.init()
        }
    }
}
