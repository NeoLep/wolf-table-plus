import { h } from '../../element'
import { borderWidth, stylePrefix } from '../../config'
import Editor from '..'
import { cellValueString } from '../../data'
import type HElement from '../../element'
import type { Rect } from '../../table-renderer'
import type { MoveDirection } from '../..'
import type { DataCell } from '../../data'

export default class TextEditor extends Editor {
    _text: HElement = h('textarea', '')
    _textMeasure: HElement = h('div', 'measure')

    _editing = false

    constructor() {
        super(`${stylePrefix}-editor`)
        this._.append(this._text, this._textMeasure)
        this._text
            .on('keydown', (evt) => {
                keydownHandler(this, evt as KeyboardEvent)
            })
            .on('input', (evt) => {
                const target = (evt as KeyboardEvent).target as HTMLInputElement
                const { value } = target
                this._editing = true
                this._value = value
                // if (!Number.isNaN(Number(value))) {
                //   this._value = Number(value)
                // }
                // this._changer(value)
                resizeSize(this)
            })
    }

    value(v: DataCell) {
        super.value(v)
        this._text.value(cellValueString(v) || '')
        resizeSize(this)
        return this
    }

    rect(rect: Rect | null) {
        super.rect(rect)
        if (rect) {
            setTimeout(() => {
                const { _value } = this
                let position = 0
                if (_value !== null) {
                    position = cellValueString(_value).length
                }
                const el = this._text.element() as HTMLTextAreaElement
                el.focus()
                el.setSelectionRange(position, position)
            }, 0)
        }
        return this
    }

    hide() {
        super.hide()
        this._editing = false
        return this
    }
}

function resizeSize(editor: TextEditor) {
    const { _, _value, _rect, _textMeasure, _target } = editor
    if (typeof _value !== 'string') return
    // const txts = _value.split('\n');
    let measureHtml = _value.replace('\n', '<br/>')
    if (_value.endsWith('\n')) measureHtml += 'T'
    _textMeasure.html(measureHtml)

    if (_rect && _target) {
        const padding = Number.parseInt(_textMeasure.computedStyle().getPropertyValue('padding'))
        const toffset = _target.offset()
        const maxWidth = toffset.width - _rect.x - borderWidth
        const maxHeight = toffset.height - _rect.y - borderWidth
        _.css('max-width', `${maxWidth}px`)
        _textMeasure.css('max-width', `${maxWidth - padding * 2}px`)
        const { width, height } = _textMeasure.rect()
        const minWidth = _rect.width - borderWidth
        if (width > minWidth) {
            _.css({ width })
        }
        if (height > _rect.height && height <= maxHeight) {
            _.css({ height })
        } else if (height < _rect.height) {
            _.css({ height: _rect.height - borderWidth })
        }
    }
}

function keydownHandler(editor: TextEditor, evt: KeyboardEvent) {
    const { code, shiftKey, metaKey, altKey, ctrlKey, target } = evt
    const moveChanger = (direction: MoveDirection) => {
        editor.hide()
        editor._moveChanger(direction)
    }
    // console.log('code:', code, shiftKey, ctrlKey)
    if (code === 'Enter' || code === 'NumpadEnter') {
        // if (ctrlKey || metaKey || altKey) {
        if (altKey) {
            ;(target as HTMLInputElement)!.value += '\n'
            editor.value((target as HTMLInputElement).value)
        } else if (shiftKey) {
            moveChanger('up')
        } else {
            moveChanger('down')
        }
        evt.preventDefault()
    } else if (code === 'Tab' && !ctrlKey && !metaKey && !altKey) {
        if (shiftKey) {
            moveChanger('left')
        } else {
            moveChanger('right')
        }
        evt.preventDefault()
    } else if (code === 'Escape') {
        editor.cancel()
        moveChanger('none')
        evt.preventDefault()
    }
}
