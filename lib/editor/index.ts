import { h } from '../element'
import { borderWidth } from '../config'
import type HElement from '../element'
import type { Rect } from '../table-renderer'
import type { DataCell } from '../data'

type MoveDirection = 'up' | 'down' | 'left' | 'right' | 'none'
type MoveChanger = (direction: MoveDirection) => void
type Changer = (value: DataCell) => void

/**
 * new -> cellIndex -> rect -> target -> hide
 */
export default class Editor {
    _: HElement
    _target: HElement | null = null
    _rect: Rect | null = null

    _oldValue = ''
    _value: DataCell

    _visible = false

    _moveChanger: MoveChanger = () => {
        //
    }
    _changer: Changer = () => {
        //
    }

    storeHistory: () => number = () => 0

    constructor(cssClass: string) {
        this._ = h('div', cssClass)
    }

    get visible() {
        return this._visible
    }

    target(target: HElement) {
        target.append(this._)
        this._target = target
        return this
    }

    cellIndex(r: number, c: number) {
        return this
    }

    value(v?: DataCell) {
        this._value = v
        return this
    }

    changed() {
        this._changer(this._value)
        this.hide()
    }

    rect(rect: Rect | null) {
        if (rect) {
            this._visible = true
            this._rect = rect
            const { x, y, width, height } = rect
            this._.setStyles({
                left: `${x - borderWidth / 2}px`,
                top: `${y - borderWidth / 2}px`,
                width: `${width - borderWidth}px`,
                height: `${height - borderWidth}px`,
            }).show()
        }
        return this
    }

    show(text?: string | number) {
        this._oldValue = JSON.stringify(this._value)

        if (text !== undefined) {
            this.value(text)
        }

        this._.show()
        return this
    }

    hide() {
        if (JSON.stringify(this._value || '') !== this._oldValue) {
            this._changer(this._value)
        }

        this._visible = false
        this._oldValue = ''
        this.value()
        this._.hide()
        return this
    }

    moveChanger(value: MoveChanger) {
        this._moveChanger = value
        return this
    }
    cancel() {
        this._value = JSON.parse(this._oldValue)
    }

    changer(value: Changer) {
        this._changer = value
        return this
    }
}
