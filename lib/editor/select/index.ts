import { Rect } from '../../table-renderer'
import Editor from '..'
import { stylePrefix } from '../../config'
import HElement, { h } from '../../element'
import { CellSelect } from '../../table-renderer/renders'

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type OptionsFunc = (q: string) => Promise<(string | string[])[]>

export default class SelectEditor extends Editor {
    _searchInput: HElement
    _content: HElement
    _width: number = 150
    _height: number = 320
    _position: Position = 'bottom-left'
    _options: OptionsFunc | null = null

    constructor() {
        super(`${stylePrefix}-select`)
        this._searchInput = h('input').on('input', (evt) => {
            const target = (evt as InputEvent).target as HTMLInputElement
            this.query(target.value)
        })
        this._content = h('ul', `${stylePrefix}-select-content`)
        this._.append(
            h('div', `${stylePrefix}-select-input`).append(this._searchInput),
            this._content,
        )
    }

    async query(q: string) {
        if (this._options === null) return
        this._content.html('')
        await this._options(q).then((data: unknown) => {
            if (data && Array.isArray(data)) {
                this._content.append(
                    ...data.map((it) => {
                        const li: HElement = h('li', 'item').on('click', () => {
                            this._changer(Array.isArray(it) ? { key: it[0], value: it[1] } : it)
                            this.hide()
                        })
                        if (typeof it === 'string') {
                            li.append(it)
                        } else if (Array.isArray(it)) {
                            const [key, text, label] = it
                            li.append(text, it.length > 2 ? h('label').append(label) : '')
                        }
                        return li
                    }),
                )
            }
        })
    }

    options(v: OptionsFunc) {
        this._options = v
        return this
    }

    position(v: Position) {
        this._position = v
        return this
    }

    rect(rect: Rect | null) {
        if (rect) {
            let { _position } = this
            this._rect = rect
            this._visible = true
            setTimeout(() => {
                this._height = 0
                this._._.childNodes.forEach((d, index) => {
                    this._height += (d as HTMLElement).clientHeight
                    if (index === 1) {
                        this._width = (d as HTMLElement).clientWidth
                    }
                })

                const calc = () => {
                    const { x, y, width, height } = rect
                    let left = x,
                        top = y + height
                    if (_position === 'top-right' || _position === 'bottom-right') {
                        left += width - this._width
                    }
                    if (_position === 'top-right' || _position === 'top-left') {
                        top -= this._height + (rect.height || 25) + 3
                    }

                    return { top, left }
                }

                let { top, left } = calc()
                if (top < 0) {
                    _position = _position.replace('top', 'bottom') as Position
                    top = calc().top
                }
                if (left < 0) {
                    _position = _position.replace('left', 'right') as Position
                    left = calc().left
                }

                this._.css({
                    left: left + 'px',
                    top: top + 'px',
                })
            }, 0)
        }
        return this
    }

    show() {
        this._searchInput.value('')
        const cell = this._value as CellSelect
        if (cell.type !== 'select') return this
        this.options(
            (qword: string) =>
                new Promise((resolve, reject) => {
                    const cell = this._value as CellSelect
                    if (cell.type !== 'select') resolve([])
                    resolve(
                        cell.options.filter((v) => v.toLowerCase().includes(qword.toLowerCase())),
                    )
                }),
        )
        this.query('')
        super.show()
        return this
    }
}
