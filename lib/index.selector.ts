import { borderWidth } from './config'
import { expr2xy, Range, xy2expr } from './table-renderer'
import { rangeUnoinMerges, stepColIndex, stepRowIndex } from './data'
import { unmerge } from './data/merge'
import Selector from './selector'
import scrollbar from './index.scrollbar'
import { bindMousemoveAndMouseup } from './event'
import { getMaxRowIndexHasValue } from './data/row'
import { getMaxColIndexHasValue } from './data/col'
import { resizeContentRect, type MoveDirection } from '.'
import type { SupportFormats } from './data/format'
import type { DataCell, DataCellValue } from './data'
import type { Rect, Area, Style, Border } from './table-renderer'
import type Table from '.'
import { Cell, CellText } from './table-renderer/renders'

function init(t: Table) {
    t._selector = new Selector(!!t._editable).autofillTrigger(
        (_evt: MouseEvent | KeyboardEvent) => {
            const { _selector } = t
            if (_selector) {
                bindMousemove(
                    t,
                    (row, col) => {
                        const { currentRange } = _selector
                        if (currentRange) {
                            const nRange = currentRange.clone()
                            if (!nRange.contains(row, col)) {
                                const d = [
                                    nRange.startRow - row,
                                    row - nRange.endRow,
                                    nRange.startCol - col,
                                    col - nRange.endCol,
                                ]
                                const index = d.indexOf(Math.max.apply(null, d))
                                if (index === 1) {
                                    nRange.startRow = nRange.endRow + 1
                                    nRange.endRow = row
                                } else if (index === 0) {
                                    nRange.endRow = nRange.startRow - 1
                                    nRange.startRow = row
                                } else if (index === 3) {
                                    nRange.startCol = nRange.endCol + 1
                                    nRange.endCol = col
                                } else if (index === 2) {
                                    nRange.endCol = nRange.startCol - 1
                                    nRange.startCol = col
                                }
                                _selector.autofillRange(nRange)
                            } else {
                                _selector.autofillRange(null)
                            }
                        }
                    },
                    (s) => s._autofillRange,
                    (s) => {
                        t.addHistory('auto fill')
                        t.copy(s._autofillRange, true).render()
                        _selector.autofillRange(null)
                        reset(t)
                    },
                )
            }
        },
    )
}

function setCellValue(t: Table, value: DataCell) {
    const { _selector } = t
    if (_selector) {
        t.addHistory('set cell value')
        _selector.clearCopy()
        const { _ranges } = _selector
        // console.log('ranges:', _ranges, value);
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => {
                    t.cell(r, c, value)
                })
            }
        })
        t.render()
    }
}

function clearCellValue(t: Table) {
    if (t._selector) {
        t.addHistory('clear selection value')
        const { _ranges } = t._selector
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => {
                    t._cells.removeValue(r, c)
                })
            }
        })
        t.render()
        t._canvas.focus()
    }
}

function clearCell(t: Table) {
    if (t._selector) {
        t.addHistory('clear selection cell')
        const { _ranges } = t._selector
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => {
                    t._cells.remove(r, c)
                })
            }
        })
        t.render()
        t._canvas.focus()
    }
}

/** r,c is in the selected region */
function isInRange(t: Table, r: number, c: number): boolean {
    if (t._selector) {
        const { currentRange } = t._selector
        if (
            currentRange &&
            currentRange.startRow !== undefined &&
            currentRange.startCol !== undefined &&
            currentRange.endRow !== undefined &&
            currentRange.endCol !== undefined &&
            r >= currentRange.startRow &&
            r <= currentRange.endRow &&
            c >= currentRange.startCol &&
            c <= currentRange.endCol
        ) {
            return true
        }
    }
    return false
}

function addRange(t: Table, r: number, c: number, clear: boolean) {
    const { _selector, _data } = t
    const range = Range.create(r, c)
    const mergedRange = rangeUnoinMerges(_data, range)
    if (_selector) {
        _selector
            .focus(r, c, mergedRange)
            .addRange(_selector._placement === 'body' ? mergedRange : range, clear)
        t._emitter.emit('selectorMove', [r, c])
    }
}

function unionRange(t: Table, r: number, c: number) {
    const { _selector, _data } = t
    if (_selector) {
        _selector.move(r, c).updateLastRange((focusRange) => {
            const res = rangeUnoinMerges(_data, focusRange.union(Range.create(r, c)))
            t._emitter.emit('updateFocusRange', res)
            return res
        })
    }
}

function reset(t: Table) {
    const { _selector, _overlayer } = t
    const { _rowHeader, _colHeader, viewport } = t._renderer
    if (_selector && viewport) {
        const { _placement } = _selector
        _selector.clear()

        const x = _rowHeader.width
        const y = _colHeader.height

        const rangeInBody = (old: Range, range: Range) => {
            const newRange = old.clone()
            if (_placement === 'all' || _placement === 'row-header') {
                newRange.endCol = range.endCol
                if (old.startCol < range.startCol) {
                    newRange.startCol = range.startCol
                }
            }
            if (_placement === 'all' || _placement === 'col-header') {
                newRange.endRow = range.endRow
                if (old.startRow < range.startRow) {
                    newRange.startRow = range.startRow
                }
            }
            return newRange
        }

        const getIntersects = ({ range }: Area, it: Range): boolean => {
            if (_placement === 'body') {
                return range.intersects(it)
            } else if (_placement === 'col-header') {
                return range.intersectsCol(it.startCol, it.endCol)
            } else if (_placement === 'row-header') {
                return range.intersectsRow(it.startRow, it.endRow)
            }
            return true
        }

        const getRect = (area: Area, it: Range, index: number): Rect => {
            let rect = area.rect(it)
            if (_placement === 'col-header') {
                rect = area.rectCol(it.startCol, it.endCol)
                // hide overlap border
                rect.height += borderWidth
                if (index === 2 || index === 3) rect.y -= borderWidth
            } else if (_placement === 'row-header') {
                rect = area.rectRow(it.startRow, it.endRow)
                // hide overlap border
                rect.width += borderWidth
                if (index === 0 || index === 3) rect.x -= borderWidth
            }
            return rect
        }

        // 进行可视区域元素遍历
        viewport.areas.forEach((area, index: number) => {
            const target = _overlayer._areas[index]
            const { _ranges, _focusRange, _copyRange, _autofillRange } = _selector
            // _ranges: 选中区域的坐标 { endCol: 0, endRow: 0, startCol: 0, startRow: 0 }
            _ranges.forEach((it, i) => {
                let intersects = getIntersects(area, it) // 判断是否位于可视区域
                const rect = getRect(area, it, index) // 获取绘制区域
                if (intersects) {
                    // 如果位于可视区域进行渲染
                    if (i === _ranges.length - 1) {
                        if (_placement !== 'all' || area.range.intersects(it)) {
                            _selector.addAreaOutline(rect, target) // 渲染外边框
                        }
                        if (_focusRange) {
                            if (area.range.intersects(_focusRange)) {
                                // 进行聚焦绘制 - important
                                _selector.setFocusArea(area.rect(_focusRange), target)
                            }
                            const nit = rangeInBody(it, area.range) // position
                            const dRanges = nit.difference(_focusRange)
                            if (dRanges.length > 0) {
                                dRanges.forEach((it1) => {
                                    intersects = getIntersects(area, it1)
                                    if (intersects) {
                                        _selector.addArea(area.rect(it1), target)
                                    }
                                })
                            } else if (_placement !== 'body' || !it.equals(_focusRange)) {
                                _selector.addArea(getRect(area, nit, index), target)
                            }
                        }
                    } else {
                        _selector.addArea(rect, target)
                    }
                }
            })
            if (_copyRange && area.range.intersects(_copyRange)) {
                _selector.addCopyArea(area.rect(_copyRange), target)
            }
            if (_autofillRange && area.range.intersects(_autofillRange)) {
                _selector.addAutofillArea(area.rect(_autofillRange), target)
            }
        })

        // header-areas
        viewport.headerAreas.forEach((area, index) => {
            const target = _overlayer._headerAreas[index]
            const { width, height } = area
            if (index <= 1) {
                // col-header
                if (_placement === 'row-header' || _placement === 'all') {
                    _selector.addColHeaderArea({ x: 0, y: 0, width, height: y }, target)
                } else {
                    _selector._colHeaderRanges.forEach((it) => {
                        if (area.range.intersectsCol(it.startCol, it.endCol)) {
                            _selector.addColHeaderArea(area.rectCol(it.startCol, it.endCol), target)
                        }
                    })
                }
            } else {
                // row-header
                if (_placement === 'col-header' || _placement === 'all') {
                    _selector.addRowHeaderArea({ x: 0, y: 0, width: x, height }, target)
                } else {
                    _selector._rowHeaderRanges.forEach((it) => {
                        if (area.range.intersectsRow(it.startRow, it.endRow)) {
                            _selector.addRowHeaderArea(area.rectRow(it.startRow, it.endRow), target)
                        }
                    })
                }
            }
        })
    }
}

function moveAutofill(t: Table, direction: MoveDirection) {
    const { _selector, _data } = t
    if (_selector) {
        const range = _selector._autofillRange
        if (range) {
            if (direction === 'up') {
                range.startRow = stepRowIndex(_data, range.startRow - 1, -1)
            } else if (direction === 'down') {
                range.endRow = stepRowIndex(_data, range.endRow + 1, 1)
            } else if (direction === 'left') {
                range.startCol = stepColIndex(_data, range.startCol - 1, -1)
            } else if (direction === 'right') {
                range.endCol = stepColIndex(_data, range.endCol + 1, 1)
            }
            scrollbar.autoMove(t, range)

            reset(t)
            return true
        }
    }
    return false
}

function move(t: Table, reselect: boolean, direction: MoveDirection, step?: number) {
    if (moveAutofill(t, direction)) return
    t._editor?.hide()

    const { _selector, _data } = t
    const { viewport } = t._renderer
    if (_selector && viewport) {
        const { _focusRange } = _selector
        if (_focusRange) {
            let { startRow, startCol, endRow, endCol } = _focusRange
            const { rows, cols } = _data

            let [r, c] = _selector._move
            if (!reselect) {
                startRow = endRow = r
                startCol = endCol = c
            }

            const oldCurrentRange = _selector.currentRange?.clone()

            if (step) {
                if (direction === 'up') {
                    r = stepRowIndex(_data, startRow - step, -1)
                } else if (direction === 'down') {
                    r = stepRowIndex(_data, endRow + step, 1)
                } else if (direction === 'left') {
                    c = stepColIndex(_data, startCol - step, -1)
                } else if (direction === 'right') {
                    c = stepColIndex(_data, endCol + step, 1)
                }
            } else {
                if (direction === 'up') {
                    r = 0
                } else if (direction === 'down') {
                    r = rows.len - 1
                } else if (direction === 'left') {
                    c = 0
                } else if (direction === 'right') {
                    c = cols.len - 1
                }
            }
            if (r >= 0 && r <= rows.len - 1 && c >= 0 && c <= cols.len - 1) {
                if (reselect) {
                    addRange(t, r, c, true)
                } else {
                    unionRange(t, r, c)
                    _selector._move = [r, c]
                }
            }

            _selector.placement('body')
            scrollbar.autoMove(t, _selector.currentRange, reselect ? undefined : oldCurrentRange)

            t._selector?._shadowInputFocus()
            reset(t)
        }
    }
}

// bind mouse select
function bindMousemove(
    t: Table,
    moveChange: (row: number, col: number) => void,
    changedRange: (s: Selector) => Range | null | undefined,
    upAfter = (s: Selector) => {
        //
    },
) {
    const { _selector, _renderer } = t
    if (!_selector) return
    const { _placement } = _selector
    const cache = { row: 0, col: 0 }
    if (_placement !== 'all') {
        const { left, top } = t._canvas.rect()
        let cachexy = [0, 0]
        let timer: number | null = null
        const clearTimer = () => {
            if (timer !== null) {
                clearInterval(timer)
                timer = null
            }
        }
        const moveHandler = (e: MouseEvent) => {
            let [x1, y1] = [0, 0]
            if (e.x > 0) x1 = e.x - left
            if (e.y > 0) y1 = e.y - top
            if (_placement === 'row-header') x1 = 1
            if (_placement === 'col-header') y1 = 1

            const oldCurrentRange = _selector.currentRange?.clone()

            const { target } = e
            if ((target as HTMLElement)?.tagName === 'CANVAS') {
                const c1 = _renderer.viewport?.cellAt(x1, y1)
                if (c1) {
                    const { row, col } = c1
                    if (row != cache.row || col !== cache.col) {
                        moveChange(row, col)
                        if (_placement === 'body') {
                            scrollbar.autoMove(t, changedRange(_selector), oldCurrentRange)
                        }
                        reset(t)
                        cache.row = row
                        cache.col = col
                    }
                }
                clearTimer()
            } else {
                if (timer === null) {
                    const deltax = e.x - cachexy[0]
                    const deltay = e.y - cachexy[1]
                    if (deltax >= 0 && deltay >= 0) {
                        timer = setInterval(() => {
                            const cRange = changedRange(_selector)
                            if (cRange) {
                                const { endRow, endCol } = cRange
                                if (deltax > deltay) {
                                    move(t, false, 'right', 1)
                                    if (t.isLastRow(endRow)) {
                                        clearTimer()
                                    }
                                } else {
                                    move(t, false, 'down', 1)
                                    if (t.isLastCol(endCol)) {
                                        clearTimer()
                                    }
                                }
                            }
                        }, 120)
                    }
                }
            }
            cachexy = [e.x, e.y]
        }
        bindMousemoveAndMouseup(
            document.body,
            (e) => moveHandler(e as MouseEvent),
            () => {
                clearTimer()
                upAfter(_selector)
            },
        )
    }
}

function showCopy(t: Table) {
    if (t._selector) {
        t._selector.showCopy()
        reset(t)
    }
}

function clearCopy(t: Table) {
    if (t._selector) {
        navigator.clipboard
            .write([
                new ClipboardItem({
                    'text/plain': new Blob([''], { type: 'text/plain' }),
                }),
            ])
            .then()
        t._selector.clearCopy()
        reset(t)
    }
}

// copy / paste
function toClipboardTextFrom(t: Table, from: string) {
    const fromRange = Range.with(from)
    let text = ''
    fromRange.eachRow((r) => {
        fromRange.eachCol((c) => {
            let vstr = t.cellValueString(r, c)
            if (vstr.includes('\n')) vstr = `"${vstr}"`
            text += `${vstr}\t`
        })
        text += '\n'
    })
    return text
}

function toArraysFromClipboardText(text: string) {
    const arrays: DataCellValue[][] = []
    let [rIndex, cIndex] = [0, 0]
    let str = ''
    let doubleQuotedTimesInStr = 0

    const addStr = () => {
        arrays[rIndex] ||= []
        arrays[rIndex][cIndex] = str
        str = ''
    }

    for (const char of text) {
        // console.log('char:', char);
        if (char === '\t') {
            addStr()
            cIndex += 1
            doubleQuotedTimesInStr = 0
            continue
        }
        if (char === '\n' && doubleQuotedTimesInStr !== 1) {
            addStr()
            rIndex += 1
            cIndex = 0
            continue
        }
        if (char !== '"') {
            if (char !== '\r') str += char
        } else {
            doubleQuotedTimesInStr += 1
        }
    }
    if (cIndex > 0) {
        addStr()
    }
    if (arrays.length <= 0) arrays.push([text])
    return arrays
}

function getClipboardText(
    item: ClipboardItem,
    type: string,
    cb = (text: string) => {
        //
    },
) {
    if (item.types.includes(type)) {
        item.getType(type).then((blob) => {
            blob.text().then((text) => {
                // console.log(`[${type}]: ${text}`);
                cb(text)
            })
        })
        return true
    }
    return false
}

function copyValue(table: Table) {
    const { _selector } = table
    if (table._copyable && _selector) {
        const items: Record<string, Blob> = {}
        const range = _selector.currentRange
        if (range) {
            showCopy(table)
            ;['text/plain', 'text/html'].forEach((type) => {
                const from = range.toString()
                const text =
                    type === 'text/html' ? table.toHtml(from) : toClipboardTextFrom(table, from)
                items[type] = new Blob([text], { type })
            })
            navigator.clipboard.write([new ClipboardItem(items)]).then()
            // () => console.log('clipboard has writed success'),
            // (e) => console.log('clipboard has wirted failure:', e)
        }
    }
}

function pasteValue(table: Table, onlyCopyText?: boolean, isCutted?: boolean) {
    navigator.clipboard.read().then((clipboardItems) => {
        if (clipboardItems.length > 0) {
            table.addHistory('paste value')

            const item = clipboardItems[0]
            if (!onlyCopyText) {
                onlyCopyText = !getClipboardText(item, 'text/html', (text) => {
                    table.fill(text).render()
                })
            }
            if (onlyCopyText) {
                getClipboardText(item, 'text/plain', (text) => {
                    table.fill(toArraysFromClipboardText(text)).render()
                })
            }

            // 剪切模式记得清空复制区域与剪切板内容
            if (isCutted) {
                if (table._selector?._copyRange) {
                    // 删除内容
                    table._selector?._copyRange?.each((r, c) => {
                        table._cells.remove(r, c)
                    })
                    // 取消合并
                    unmerge(table._data, table._selector?._copyRange?.toString())
                }
                // 清除复制
                clearCopy(table)
            }
        }
    })
}

function fastSetCellFormat(table: Table, format?: SupportFormats) {
    if (table._selector) {
        table.addHistory('set cell format fast')
        const { _ranges } = table._selector
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => {
                    table._cells.setFormat(r, c, format || 'normal')
                })
            }
        })
        table.render()
        table._canvas.focus()
    }
}

function fastSetCellFixed(table: Table, type: 'increase' | 'reduce') {
    if (!type) return
    if (table._selector) {
        table.addHistory('set cell fixed fast')
        const { _ranges } = table._selector
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => {
                    table._cells.fixed(r, c, type)
                })
            }
        })
        table.render()
        table._canvas.focus()
    }
}

function setCellStyle(table: Table, style: Partial<Style>) {
    if (table._selector) {
        table.addHistory('set cell style')
        const { _ranges } = table._selector
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => table.setStyle(r, c, style))
            }
        })
        table.render()
        table._canvas.focus()
    }
}

function fastSetCellStyle(
    table: Table,
    type: 'bold' | 'underline' | 'italic' | 'strikethrough' | 'textwrap',
) {
    if (table._selector) {
        table.addHistory('set cell style fast')
        const { _ranges } = table._selector
        let injectStyles: Partial<Style>
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => {
                    const styleIndex = table.getStyleIndex(r, c)
                    let style: Partial<Style> = {}
                    if (styleIndex !== -1) {
                        style = table.style(styleIndex)
                    }
                    if (!injectStyles) {
                        injectStyles = {}
                        injectStyles = {
                            [type]: !style[type],
                        }
                    }
                    table.setStyle(r, c, injectStyles)
                })
            }
        })
        table.render()
        table._canvas.focus()
    }
}

function fastClearCellStyle(table: Table) {
    if (table._selector) {
        table.addHistory('clear cell style fast')
        const { _ranges } = table._selector
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => {
                    const cell = table.cell(r, c)
                    if (cell instanceof Object && cell.style !== undefined) {
                        delete cell.style
                    }
                })
            }
        })
        table.render()
        table._canvas.focus()
    }
}

function fastClearCellFormat(table: Table) {
    if (table._selector) {
        table.addHistory('clear cell format fast')
        const { _ranges } = table._selector
        _ranges.forEach((it) => {
            if (it) {
                it.each((r, c) => {
                    const cell = table.cell(r, c)
                    if (cell instanceof Object) {
                        delete cell.format
                        delete cell.fixed
                        delete cell.formula
                    }
                })
            }
        })
        table.render()
        table._canvas.focus()
    }
}

function insertRowOrCol(table: Table, type: 'row' | 'col') {
    if (table._selector) {
        table.addHistory(`insert ${type}`)

        if (type === 'row') {
            table._data.rows.len++
        } else {
            table._data.cols.len++
        }

        // 手动触发一次重绘, 要不然无法更新显示出 最新行/列
        resizeContentRect(table)
        table.resize()

        // curr row/col
        const { _ranges } = table._selector
        const { startRow, startCol } = _ranges[0]

        // 获取 max row/col
        const maxRow = getMaxRowIndexHasValue(table.data())
        const maxCol = getMaxColIndexHasValue(table.data())

        // 获取合并进行 +1
        table._data.merges = table._data.merges.map((item) => {
            const refs = item.split(':')
            let [col, row] = expr2xy(refs[0])
            let [col2, row2] = expr2xy(refs[1])
            if (type === 'row') {
                if (row >= startRow) row++
                if (row2 >= startRow) row2++
            } else {
                if (col >= startCol) col++
                if (col2 >= startCol) col2++
            }
            const res = `${xy2expr(col, row)}:${xy2expr(col2, row2)}`
            return res
        })

        if (type === 'row') {
            if (startRow <= maxRow) {
                // 选中
                table._cells._.forEach((cellItem) => {
                    if (cellItem) {
                        const [row, col, cell] = cellItem
                        if (row >= startRow) {
                            cellItem[0]++
                        }
                    }
                })
            }
        } else {
            if (startCol <= maxCol) {
                // 选中
                table._cells._.forEach((cellItem) => {
                    if (cellItem) {
                        const [row, col, cell] = cellItem
                        if (col >= startCol) {
                            cellItem[1]++
                        }
                    }
                })
            }
        }

        table._cells.resetIndexes()
        table.render()
    }
}

function deleteRowOrCol(table: Table, type: 'row' | 'col') {
    if (table._selector) {
        table.addHistory(`delete ${type}`)

        // curr row/col
        const { _ranges } = table._selector
        const { startRow, startCol, endRow, endCol } = _ranges[0]
        const offsetRow = endRow - startRow + 1
        const offsetCol = endCol - startCol + 1

        // 获取 max row/col
        const maxRow = getMaxRowIndexHasValue(table.data())
        const maxCol = getMaxColIndexHasValue(table.data())

        const targetIndex: Record<string, boolean> = {}
        // 获取合并进行 - 1
        table._data.merges = table._data.merges
            .map((item) => {
                const refs = item.split(':')
                let [col, row] = expr2xy(refs[0])
                let [col2, row2] = expr2xy(refs[1])
                if (type === 'row') {
                    if (row >= startRow && row2 <= endRow) return null
                    targetIndex[`${row}-${col}`] = true
                    if (row > startRow) row -= offsetRow
                    if (row2 > startRow) row2 -= offsetRow
                } else {
                    if (col >= startCol && col2 <= endCol) return null
                    targetIndex[`${row}-${col}`] = true
                    if (col > startRow) col -= offsetCol
                    if (col2 > startRow) col2 -= offsetCol
                }
                const res = `${xy2expr(col, row)}:${xy2expr(col2, row2)}`
                return res
            })
            .filter((item) => !!item) as string[]

        if (type === 'row') {
            if (startRow <= maxRow) {
                table._cells._.forEach((cellItem, index) => {
                    if (cellItem) {
                        const [row, col, cell] = cellItem
                        if (row >= startRow && row <= endRow) {
                            if (!targetIndex[`${row}-${col}`]) {
                                table._cells._[index] = null
                            }
                        } else if (row > startRow) {
                            cellItem[0] -= offsetRow
                        }
                    }
                })
                table._cells._ = table._cells._.filter((item) => !!item)
            }
        } else {
            if (startCol <= maxCol) {
                table._cells._.forEach((cellItem, index) => {
                    if (cellItem) {
                        const [row, col, cell] = cellItem
                        if (col >= startCol && col <= endCol) {
                            if (!targetIndex[`${row}-${col}`]) {
                                table._cells._[index] = null
                            }
                        } else if (row > startCol) {
                            cellItem[1] -= offsetCol
                        }
                    }
                })
                table._cells._ = table._cells._.filter((item) => !!item)
            }
        }

        // 与增加不同, 需要最后再进行删除操作
        if (type === 'row') {
            table._data.rows.len -= offsetRow
        } else {
            table._data.cols.len -= offsetCol
        }

        // 手动触发一次重绘, 要不然无法更新显示出 最新行/列
        resizeContentRect(table)
        table.resize()

        table._cells.resetIndexes()
        table.render()
    }
}

function setBorder(
    table: Table,
    config: { type: Border[1]; lineStyle: Border[2]; color: Border[3] },
) {
    const ranges: string[] = []
    if (!table._selector) return
    table.addHistory('set border')

    const { _ranges } = table._selector
    if (_ranges) {
        _ranges.forEach((it) => {
            ranges.push(`${xy2expr(it.startCol, it.startRow)}:${xy2expr(it.endCol, it.endRow)}`)
        })
    }

    ranges.forEach((range) => {
        table.addBorder(range, config.type, config.lineStyle, config.color)
    })

    table.render()
}

function clearBorder(table: Table) {
    const ranges: string[] = []
    if (!table._selector) return
    table.addHistory('clear border')

    const { _ranges } = table._selector
    if (_ranges) {
        _ranges.forEach((it) => {
            ranges.push(`${xy2expr(it.startCol, it.startRow)}:${xy2expr(it.endCol, it.endRow)}`)
        })
    }

    ranges.forEach((range) => {
        table.clearBorder(range)
    })

    table.render()
}

function mergeGrid(table: Table) {
    if (table.isMerged()) {
        table.unmerge()
    } else {
        table.merge()
    }
    table.render()
}

function freezeGrid(table: Table) {
    if (table._data.freeze) {
        table.freeze()
    } else {
        if (table._selector) {
            const { _ranges } = table._selector
            if (_ranges.length > 0) {
                table.freeze(xy2expr(_ranges[0].startCol, _ranges[0].startRow))
            }
        }
    }
    table.render()
}

function paintFormat(table: Table) {
    if (table._selector) {
        table.addHistory('set paintFormat')
        const sourceRange = table._selector.paintFormatArea
        if (sourceRange) {
            const { startCol, startRow, endCol, endRow } = sourceRange
            const ColLength = endCol - startCol + 1
            const RowLength = endRow - startRow + 1
            const styleDict: Record<string, Partial<Style> | null> = {}
            const cellDict: Record<string, Cell> = {}
            sourceRange.each((r, c) => {
                const cell = table.cell(r, c)
                const style = table.getPureStyle(r, c)
                styleDict[`${r - startRow}-${c - startCol}`] = { ...style }
                if (typeof cell === 'object') {
                    cellDict[`${r - startRow}-${c - startCol}`] = cell
                }
            })

            for (const it of table._selector!._ranges) {
                const { startCol, startRow, endCol, endRow } = it
                it.each((r, c) => {
                    const key = `${(r - startRow) % RowLength}-${(c - startCol) % ColLength}`
                    const currCell = table.cell(r, c)
                    if (cellDict[key]) {
                        const target: CellText = JSON.parse(JSON.stringify(cellDict[key]))
                        target.style = undefined
                        if (currCell instanceof Object) {
                            target.value = currCell?.value || ''
                        } else {
                            target.value = currCell as string
                        }
                        table.cell(r, c, target)
                        table.setStyle(r, c, { ...styleDict[key] }, true)
                    }
                })
            }
        }

        table._selector?.clearCopy()
        table._selector.paintFormatArea = null
        table.render()
    }
}

export default {
    init,
    setCellStyle,
    fastSetCellStyle,
    fastClearCellStyle,
    fastClearCellFormat,
    fastSetCellFormat,
    fastSetCellFixed,
    setCellValue,
    clearCellValue,
    clearCell,
    addRange,
    unionRange,
    reset,
    move,
    bindMousemove,
    showCopy,
    clearCopy,
    copyValue,
    pasteValue,
    insertRowOrCol,
    deleteRowOrCol,
    isInRange,
    setBorder,
    clearBorder,
    mergeGrid,
    freezeGrid,
    paintFormat,
}
