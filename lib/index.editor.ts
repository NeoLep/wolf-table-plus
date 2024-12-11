import selector from './index.selector'
import Renders, { cellTypeGetter } from './table-renderer/renders'
import type { DataCell } from './data'
import type Editor from './editor'
import type Table from '.'

// implement editor
function get(t: Table, cell: DataCell) {
    const type = cellTypeGetter(cell)
    const { _editors } = t
    let editor: Editor = _editors.get(type)
    if (!editor) {
        const renders = Renders.use()
        if (renders.options[type] && renders.options[type].editor) {
            const editorGenerator = renders.options[type].editor
            _editors.set(type, editorGenerator()) // set editors
            editor = _editors.get(type)
        }
    }

    t._emitter.emit('getChanger', type, cell)
    editor?.changer((value) => {
        if (value !== undefined) {
            t.addHistory('edit')
            // 修复当插件渲染后会清空所有值的bug
            if (typeof value === 'number') {
                selector.setCellValue(t, value)
            } else if (value) {
                selector.setCellValue(t, value)
            } else {
                selector.clearCellValue(t)
            }
        }
    })
    editor?.moveChanger((direction) => {
        const { _selector } = t
        if (_selector) {
            if (direction !== 'none') {
                selector.move(t, true, direction, 1)
            }
            t._canvas.focus()
        }
    })
    return editor
}

function move(t: Table) {
    const { _editor, _selector, _renderer } = t
    // console.log('_editor move', _editor, _selector)
    if (_editor && _selector) {
        const { _focusArea, _focus } = _selector
        if (_editor.visible && _focusArea) {
            const { _rect, _target } = _focusArea
            const { viewport } = _renderer
            if (_rect && _target && viewport && viewport.inAreas(..._focus)) {
                _editor.rect(_rect).target(_target).show()
            } else {
                _editor.rect({ x: -100, y: -100, width: 0, height: 0 }).hide()
            }
        }
    }
}

function reset(t: Table, text?: string | number) {
    const { _selector } = t
    if (_selector) {
        const { _focusRange, _focusArea } = _selector
        if (_focusRange && _focusArea) {
            const { _rect, _target } = _focusArea
            const { startRow, startCol } = _focusRange
            const cell = t.cell(startRow, startCol)
            const editor = get(t, cell)
            t._editor = editor
            if (editor && _rect && _target) {
                // console.log('row:', startRow, ', col:', startCol, ', rect:', _rect);
                if (cell) {
                    editor.value(cell)
                }
                editor.cellIndex(startRow, startCol).rect(_rect).target(_target).show(text)
            }
        }
    }
}

export default {
    move,
    reset,
}
