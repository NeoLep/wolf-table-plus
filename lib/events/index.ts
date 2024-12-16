import editor from '../index.editor'
import selector from '../index.selector'
import scrollbar from '../index.scrollbar'

import type { Border, Style } from '../table-renderer'
import type { SupportFormats } from '../data/format'
import type { MoveDirection } from '..'
import type Table from '..'

/**
 * @description 事件管理
 */
export default class Events {
    table: Table
    setCutted = false
    constructor(table: Table) {
        this.table = table
        this.table._canvas
            .on('mousedown', (evt) => this.mousedownHandler(evt as MouseEvent))
            .on('mousemove', (evt) => this.mousemoveHandler(evt as MouseEvent))
            .on('mouseup', (evt) => this.mouseUpHandler(evt as MouseEvent))
            .on('wheel.prevent', (evt) => this.wheelHandler(evt as WheelEvent))
            .on('keydown', (evt) => this.keydownHandler(evt as KeyboardEvent))
            .on('contextmenu.prevent', (evt) =>
                this.contextmenuHandler(evt as MouseEvent & { layerY: number; layerX: number }),
            )
            .on('dblclick.prevent', () => {
                editor.reset(this.table)
            })

        this.initSelectorShadowInput()
    }

    initSelectorShadowInput() {
        const selector = this.table._selector
        const shadowInput = selector?._shadowInput
        if (!selector || !shadowInput) return
        shadowInput.on('compositionstart', (evt) => {
            selector._shadowInputLock = true
            ;(shadowInput._ as HTMLInputElement).value = ''
            shadowInput._.style.width = 'auto'
            ;(evt as KeyboardEvent).preventDefault()
        })
        shadowInput.on('compositionend', (evt) => {
            selector._shadowInputLock = false
            shadowInput._.style.width = '0'
            ;(shadowInput._ as HTMLInputElement).value = ''
            editor.reset(this.table, (evt as CompositionEvent).data)
            ;(evt as CompositionEvent).preventDefault()
        })
        shadowInput.on('keydown', (evt) => {
            setTimeout(() => {
                if (!selector._shadowInputLock) {
                    this.keydownHandler(evt as KeyboardEvent)
                }
            }, 0)
            ;(evt as KeyboardEvent).preventDefault()
        })
    }

    mousedownHandler(evt: MouseEvent) {
        if (evt.button === 1) return
        const { _selector, _renderer, _editor, _emitter } = this.table
        const { viewport } = _renderer
        if (_editor) _editor.hide()

        if (_selector && viewport) {
            const { offsetX, offsetY, ctrlKey, metaKey, shiftKey } = evt
            const vcell = viewport.cellAt(offsetX, offsetY)
            if (vcell) {
                _emitter.emit('click', vcell, evt)
                const { placement, row, col } = vcell
                if (shiftKey) {
                    // 基于已选进行聚合选择
                    selector.unionRange(this.table, row, col)
                } else {
                    // cache = { row, col };
                    if (evt.button === 2 && selector.isInRange(this.table, row, col)) {
                        //
                    } else {
                        _selector.placement(placement)
                        selector.addRange(this.table, row, col, !(metaKey || ctrlKey))
                    }

                    if (placement === 'body') {
                        scrollbar.autoMove(this.table, _selector.currentRange)
                    }
                }
                selector.reset(this.table)

                selector.bindMousemove(
                    this.table,
                    (row, col) => {
                        selector.unionRange(this.table, row, col)
                    },
                    (s) => s.currentRange,
                )
                this.table.render()
            }
        }
    }

    mouseUpHandler(evt: MouseEvent) {
        if (this.table._selector?.paintFormatArea) {
            this.eventTrigger('paintFormat')
        }
    }

    mousemoveHandler(evt: MouseEvent) {
        const { _rowResizer, _colResizer, _renderer } = this.table
        const { viewport } = _renderer
        const { buttons, offsetX, offsetY } = evt
        // press the mouse left button
        if (viewport && buttons === 0) {
            const { _rowHeader, _colHeader } = this.table._renderer
            if (_rowResizer && _rowHeader.width > 0) {
                if (offsetX < _rowHeader.width && offsetY > _colHeader.height) {
                    const cell = viewport.cellAt(offsetX, offsetY)
                    if (cell) _rowResizer.show(cell)
                } else {
                    _rowResizer.hide()
                }
            }
            if (_colResizer && _colHeader.height > 0) {
                if (offsetY < _colHeader.height && offsetX > _rowHeader.width) {
                    const cell = viewport.cellAt(offsetX, offsetY)
                    if (cell) _colResizer.show(cell)
                } else {
                    _colResizer.hide()
                }
            }
        }
    }

    wheelHandler(evt: WheelEvent) {
        const { deltaX, deltaY, shiftKey } = evt
        const { _hScrollbar, _vScrollbar } = this.table
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (_hScrollbar) {
                _hScrollbar.scrollBy(deltaX)
            }
        } else {
            if (shiftKey && _hScrollbar) {
                _hScrollbar.scrollBy(deltaY)
            } else if (!shiftKey && _vScrollbar) {
                _vScrollbar.scrollBy(deltaY)
            }
        }
    }

    canInput(evt: KeyboardEvent): boolean {
        const { ctrlKey, shiftKey, metaKey, altKey, code, keyCode } = evt

        if (ctrlKey || shiftKey || metaKey || altKey) return false
        if (code.startsWith('Key') || code.startsWith('Digit')) return true
        if (code.startsWith('Numpad') && keyCode >= 96) return true
        if (
            [
                'Minus',
                'Equal',
                'Space',
                'BracketLeft',
                'BracketRight',
                'Backslash',
                'Semicolon',
                'Quote',
                'Comma',
                'Period',
                'Slash',
            ].includes(code)
        )
            return true
        return false
    }

    eventTrigger(
        action:
            | 'copy'
            | 'cut'
            | 'undo'
            | 'redo'
            | 'clearCopy'
            | 'insertRow'
            | 'insertCol'
            | 'deleteRow'
            | 'deleteCol'
            | 'clearBorder'
            | 'merge'
            | 'freeze'
            | 'paintFormat',
    ): void
    eventTrigger(action: 'paste', onlyCopyText?: boolean): void
    eventTrigger(action: 'setStyle', style: Partial<Style>): void
    eventTrigger(
        action: 'fastStyle',
        type: 'bold' | 'underline' | 'italic' | 'strikethrough' | 'textwrap',
    ): void
    eventTrigger(action: 'fastFormat', format: SupportFormats): void
    eventTrigger(action: 'fastFixed', type: 'increase' | 'reduce'): void
    eventTrigger(action: 'move', direction: MoveDirection, step?: number, reselect?: boolean): void
    eventTrigger(action: 'clearCell', type: 'cell' | 'value' | 'style' | 'format'): void
    eventTrigger(action: 'setBorder', type: Border[1], lineStyle: Border[2], color: Border[3]): void

    eventTrigger(action: string, ...args: unknown[]) {
        if (action === 'move') {
            const direction = args[0] as MoveDirection
            const step = (args[1] as number) || undefined
            const reselect = !!args[2]
            selector.move(this.table, reselect, direction, step)
            this.table._canvas.focus()
            this.table.render()
        } else if (action === 'copy') {
            selector.copyValue(this.table)
        } else if (action === 'cut') {
            selector.copyValue(this.table)
            this.setCutted = true
        } else if (action === 'paste') {
            if (this.table._editable) {
                const onlyCopyText = !!args[0]
                selector.pasteValue(this.table, onlyCopyText, this.setCutted)
                this.table._canvas.focus()
                this.setCutted = false
            }
        } else if (action === 'undo') {
            this.table._history.undo({ type: 'undo', data: this.table.data() }, ({ data }) => {
                this.table.data(data)
                this.table.render()
            })
        } else if (action === 'redo') {
            this.table._history.redo({ type: 'redo', data: this.table.data() }, ({ data }) => {
                this.table.data(data)
                this.table.render()
            })
        } else if (action === 'setStyle') {
            selector.setCellStyle(this.table, (args[0] as Partial<Style>) || {})
        } else if (action === 'fastStyle') {
            const type = args[0] as 'bold' | 'underline' | 'italic' | 'strikethrough' | 'textwrap'
            selector.fastSetCellStyle(this.table, type)
        } else if (action === 'fastFormat') {
            const format = args[0] as SupportFormats
            selector.fastSetCellFormat(this.table, format)
        } else if (action === 'fastFixed') {
            const type = args[0] as 'increase' | 'reduce'
            selector.fastSetCellFixed(this.table, type)
        } else if (action === 'clearCopy') {
            selector.clearCopy(this.table)
        } else if (action === 'clearCell') {
            const type = args[0]
            if (type === 'cell') {
                selector.clearCell(this.table)
            } else if (type === 'value') {
                selector.clearCellValue(this.table)
            } else if (type === 'style') {
                selector.fastClearCellStyle(this.table)
            } else if (type === 'format') {
                selector.fastClearCellFormat(this.table)
            }
        } else if (action === 'insertRow') {
            selector.insertRowOrCol(this.table, 'row')
        } else if (action === 'insertCol') {
            selector.insertRowOrCol(this.table, 'col')
        } else if (action === 'deleteRow') {
            selector.deleteRowOrCol(this.table, 'row')
        } else if (action === 'deleteCol') {
            selector.deleteRowOrCol(this.table, 'col')
        } else if (action === 'setBorder') {
            const type = args[0] as Border[1]
            const lineStyle = args[1] as Border[2]
            const color = args[2] as Border[3]
            if (type && lineStyle && color) {
                selector.setBorder(this.table, { type, lineStyle, color })
            }
        } else if (action === 'clearBorder') {
            selector.clearBorder(this.table)
        } else if (action === 'merge') {
            selector.mergeGrid(this.table)
        } else if (action === 'freeze') {
            selector.freezeGrid(this.table)
        } else if (action === 'paintFormat') {
            selector.paintFormat(this.table)
        }

        // if (evt) {
        //   evt.preventDefault()
        // }
    }

    keydownHandler(evt: KeyboardEvent) {
        const { ctrlKey, shiftKey, metaKey, altKey, code } = evt
        if ((code === 'Enter' || code === 'NumpadEnter') && !ctrlKey && !metaKey && !altKey) {
            this.eventTrigger('move', shiftKey ? 'up' : 'down', 1, true)
        } else if (code === 'Tab' && !ctrlKey && !metaKey && !altKey) {
            this.eventTrigger('move', shiftKey ? 'left' : 'right', 1, true)
        } else if (code.startsWith('Arrow')) {
            this.eventTrigger(
                'move',
                code.slice(5).toLowerCase() as 'left' | 'right' | 'up' | 'down',
                1,
                !shiftKey,
            )
        } else if (code === 'KeyX' && (ctrlKey || metaKey)) {
            this.eventTrigger('cut')
        } else if (code === 'KeyC' && (ctrlKey || metaKey)) {
            this.eventTrigger('copy')
        } else if (code === 'KeyV' && (ctrlKey || metaKey)) {
            this.eventTrigger('paste', evt.shiftKey)
        } else if (code === 'KeyZ' && (ctrlKey || metaKey)) {
            this.eventTrigger('undo')
        } else if (code === 'KeyY' && (ctrlKey || metaKey)) {
            this.eventTrigger('redo')
        } else if (code === 'KeyB' && (ctrlKey || metaKey)) {
            this.eventTrigger('fastStyle', 'bold')
        } else if (code === 'KeyU' && (ctrlKey || metaKey)) {
            this.eventTrigger('fastStyle', 'underline')
        } else if (code === 'KeyI' && (ctrlKey || metaKey)) {
            this.eventTrigger('fastStyle', 'italic')
        } else if (code === 'Escape') {
            this.eventTrigger('clearCopy')
        } else if (code === 'Backspace') {
            this.eventTrigger('clearCell', shiftKey ? 'style' : 'value')
        } else if (code === 'Delete') {
            this.eventTrigger('clearCell', 'cell')
        } else if (this.canInput(evt)) {
            // editor
            editor.reset(this.table, evt.key)
        }
        // else if (code === 'KeyS' && (ctrlKey || metaKey)) {
        //     console.log(this.table)
        //     console.log(this.table.data())
        //     localStorage.setItem('wts', JSON.stringify(this.table.data()))
        // } else if (code === 'KeyL' && (ctrlKey || metaKey)) {
        //     const res = localStorage.getItem('wts')
        //     if (res) {
        //         this.table.data(JSON.parse(res)).render()
        //     }
        // }

        evt.preventDefault()
    }

    contextmenuHandler(evt: MouseEvent & { layerY: number; layerX: number }) {
        this.table._contextMenu.show(evt)
        evt.preventDefault()
    }
}
