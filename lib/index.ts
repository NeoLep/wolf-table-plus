import './style.index.scss'
import { stylePrefix } from './config'
import HElement, { h } from './element'
import Overlayer from './overlayer'
import TableRenderer, { Range, expr2xy, xy2expr } from './table-renderer'
import {
    defaultData,
    row,
    col,
    colsWidth,
    rowsHeight,
    rowHeight,
    colWidth,
    merge,
    unmerge,
    isMerged,
    cellValue,
    Cells,
    addStyle,
    clearStyles,
    addBorder,
    clearBorder,
    clearBorders,
    cellValueString,
    isLastRow,
    isLastCol,
    copy,
} from './data'
import resizer from './index.resizer'
import scrollbar from './index.scrollbar'
import selector from './index.selector'
import { fromHtml, toHtml } from './index.html'
import { getStyle, updateStyle } from './data/style'
import { EventEmitter } from './event'
import TextEditor from './editor/text'
import Events from './events'
import History from './index.history'
import ContextMenu from './context-menu'
import I18n from './i18n'
import HeadMenu from './head-menu'
import { injectFormatters } from './data/format'
import type { CopyData } from './data/copy'
import type { TableData, FormulaParser, DataCell, DataRow, DataCol, DataCellValue } from './data'
import type {
    Style,
    ColHeader,
    RowHeader,
    Rect,
    Border,
    Formatter,
    Gridline,
    ViewportCell,
} from './table-renderer'
import type Editor from './editor'
import type Selector from './selector'
import type Resizer from './resizer'
import type Scrollbar from './scrollbar'
import Renders, { CellText } from './table-renderer/renders'
import Printer from './index.printer'

export type TableRendererOptions = {
    style?: Partial<Style>
    headerStyle?: Partial<Style>
    rowHeader?: Partial<RowHeader>
    colHeader?: Partial<ColHeader>
    gridline?: Partial<Gridline>
    headerGridline?: Partial<Gridline>
    freeGridline?: Partial<Gridline>
}

export type TableDataOptions = {
    rows?: number
    cols?: number
    rowHeight?: number
    colWidth?: number
}

export type TableOptions = {
    minRowHeight?: number
    minColWidth?: number
    hideHeadMenu?: boolean
    scrollable?: boolean
    resizable?: boolean
    selectable?: boolean
    editable?: boolean
    copyable?: boolean
    data?: TableDataOptions
    renderer?: TableRendererOptions
}

export type MoveDirection = 'up' | 'down' | 'left' | 'right' | 'none'

export { HElement, h }

export default class Table {
    // renderer options
    _rendererOptions: TableRendererOptions = {}

    _copyable = false

    _editable = false

    _minRowHeight = 25

    _minColWidth = 60

    _width: () => number

    _height: () => number

    // cache for rect of content
    _contentRect: Rect = { x: 0, y: 0, width: 0, height: 0 }

    _headMenu: HeadMenu | null = null

    _container: HElement
    _Layer: HElement

    _data: TableData

    _renderer: TableRenderer

    _cells = new Cells()

    // scrollbar
    _vScrollbar: Scrollbar | null = null
    _hScrollbar: Scrollbar | null = null

    // resizer
    _rowResizer: Resizer | null = null
    _colResizer: Resizer | null = null

    // editor ? extends Editor
    _editor: Editor | null = null
    _editors = new Map()

    _selector: Selector | null = null
    _overlayer: Overlayer

    _canvas: HElement

    // event emitter
    _emitter = new EventEmitter()

    _events: Events
    _history: History
    _contextMenu: ContextMenu

    _i18n: I18n

    _printer: Printer

    constructor(
        element: HTMLElement | string,
        width: () => number,
        height: () => number,
        options?: TableOptions,
    ) {
        const container: HTMLElement | null =
            typeof element === 'string' ? document.querySelector(element) : element
        if (container === null) throw new Error('first argument error')

        // i18n
        this._i18n = new I18n()

        this._data = defaultData()

        this._Layer = h(container, `${stylePrefix}-layer`).css({
            height: `${height()}px`,
            width: `${width()}px`,
        })

        if (!options?.hideHeadMenu) {
            this._headMenu = new HeadMenu(this)
            this._Layer.append(this._headMenu._headMenuElement)
        }

        this._width = width
        this._height = () => height() - (this._headMenu?.height || 0)

        this._container = h('div', `${stylePrefix}-container`).css({
            height: `${this._height()}px`,
            width: `${width()}px`,
        })
        this._Layer.append(this._container)

        // update default data
        if (options) {
            const { minColWidth, minRowHeight, renderer, data } = options
            if (minColWidth) this._minColWidth = minColWidth
            if (minRowHeight) this._minRowHeight = minRowHeight

            if (renderer) {
                this._rendererOptions = renderer
            }

            if (data) {
                const { cols, rows, rowHeight, colWidth } = data
                const { _data } = this
                if (cols) _data.cols.len = cols
                if (rows) _data.rows.len = rows
                if (rowHeight) _data.rowHeight = rowHeight
                if (colWidth) _data.colWidth = colWidth
            }
        }

        const canvasElement = document.createElement('canvas')
        // tabIndex for trigger keydown event
        this._canvas = h(canvasElement).attr('tabIndex', '1')
        this._container.append(canvasElement)
        this._renderer = new TableRenderer(canvasElement, width(), this._height())
        this._overlayer = new Overlayer(this._container)

        // resize rect of content
        resizeContentRect(this)

        if (options?.selectable) selector.init(this) // selector
        if (options?.scrollable) scrollbar.init(this) // scroll
        if (options?.resizable) resizer.init(this) // resizer
        if (options?.editable) this._editable = true // editable

        this._copyable = options?.copyable || false

        // this._editors.set('text', new TextEditor()) // set editors

        this._events = new Events(this) // init events
        this._history = new History() // history init
        this._contextMenu = new ContextMenu(this) // context menu
        this._printer = new Printer(this) // printer
        injectFormatters(this._cells, (index: number) => this.style(index, false)) // inject formatter
    }

    contentRect() {
        return this._contentRect
    }

    container() {
        return this._container
    }

    resize(conf?: { width?: (() => number) | number; height?: (() => number) | number }) {
        if (conf?.width !== undefined) {
            const width = (
                typeof conf.width === 'function' ? conf.width : () => conf.width
            ) as () => number
            this._width = width
        }
        if (conf?.height !== undefined) {
            const height = (
                typeof conf.height === 'function' ? conf.height : () => conf.height
            ) as () => number

            this._Layer.css({
                width: `${this._width()}px`,
                height: `${this._height()}px`,
            })

            this._height = () => height() - (this._headMenu?.height || 0)
        }

        this._container.css({
            height: `${this._height()}px`,
            width: `${this._width()}px`,
        })
        this._renderer.width(this._width())
        this._renderer.height(this._height())
        this.render()
    }

    freeze(ref?: string) {
        this._data.freeze = ref
        return this
    }

    isMerged(): boolean
    isMerged(ref: string): boolean
    isMerged(ref?: string) {
        if (ref) return isMerged(this._data, ref)
        else {
            const { _selector } = this
            if (_selector) {
                return _selector._ranges.every((it) => isMerged(this._data, it.toString()))
            }
        }
        return false
    }

    merge(): Table
    // ref: A1 | A1:B10
    merge(ref: string): Table
    merge(ref?: string) {
        if (ref) merge(this._data, ref)
        else {
            const { _selector } = this
            if (_selector) {
                _selector._ranges.forEach((it) => merge(this._data, it.toString()))
            }
        }
        return this
    }

    unmerge(): Table
    // ref: A1 | A1:B10
    unmerge(ref: string): Table
    unmerge(ref?: string) {
        if (ref) unmerge(this._data, ref)
        else {
            const { _selector } = this
            if (_selector) {
                _selector._ranges.forEach((it) => unmerge(this._data, it.toString()))
            }
        }
        return this
    }

    row(index: number): DataRow
    row(index: number, value: Partial<DataRow>): Table
    row(index: number, value?: Partial<DataRow>): DataRow | Table {
        if (value) {
            if (value.height) {
                this.rowHeight(index, value.height)
            }
            row(this._data, index, value)
            return this
        }
        return row(this._data, index)
    }

    rowHeight(index: number): number
    rowHeight(index: number, value: number, autoWrap?: boolean): Table
    rowHeight(index: number, value?: number, autoWrap?: boolean): number | Table {
        const oldValue = rowHeight(this._data, index)
        if (value) {
            if (oldValue !== value) {
                rowHeight(this._data, index, value, autoWrap)
                this._contentRect.height += value - oldValue
            }
            return this
        }
        return oldValue
    }

    rowsHeight(min: number, max: number) {
        return rowsHeight(this._data, min, max)
    }

    isLastRow(index: number) {
        return isLastRow(this._data, index)
    }

    col(index: number): DataCol
    col(index: number, value: Partial<DataCol>): Table
    col(index: number, value?: Partial<DataCol>): DataCol | Table {
        if (value) {
            if (value.width) {
                this.colWidth(index, value.width)
            }
            col(this._data, index, value)
            return this
        }
        return col(this._data, index)
    }

    colWidth(index: number): number
    colWidth(index: number, value: number): Table
    colWidth(index: number, value?: number): number | Table {
        const oldValue = colWidth(this._data, index)
        if (value) {
            if (oldValue !== value) {
                colWidth(this._data, index, value)
                this._contentRect.width += value - oldValue
            }
            return this
        }
        return oldValue
    }

    colsWidth(min: number, max: number) {
        return colsWidth(this._data, min, max)
    }

    isLastCol(index: number) {
        return isLastCol(this._data, index)
    }

    formulaParser(v: FormulaParser) {
        this._cells.formulaParser(v)
        return this
    }

    formatter(v: Formatter) {
        this._cells.formatter(v)
        return this
    }

    /**
     * 获取 style 样式 index
     * @param row
     * @param col
     * @returns
     */
    getStyleIndex(row: number, col: number): number {
        const cell = this.cell(row, col)
        if (cell instanceof Object && cell.style !== undefined && cell.style >= 0) {
            return cell.style
        }
        return -1
    }
    getPureStyle(row: number, col: number): Partial<Style> | null {
        const index = this.getStyleIndex(row, col)
        if (index !== -1) return getStyle(this._data, index, false)
        return null
    }
    getStyle(row: number, col: number, withDefault?: boolean): Partial<Style> {
        const index = this.getStyleIndex(row, col)
        if (index !== -1) return getStyle(this._data, index, !!withDefault)
        return this._data.style
    }
    /**
     * 设置 style
     * @param row
     * @param col
     * @param style
     * @param rewrite 为 true 时, 重写要设置的全部样式, 否则只进行合并
     */
    setStyle(row: number, col: number, style: Partial<Style>, rewrite = false) {
        let index = this.getStyleIndex(row, col)
        if (!rewrite && index !== -1) {
            style = Object.assign({}, this.style(index, false) || {}, style)
        }
        if (index !== -1) {
            this.updateStyle(index, style)
        } else {
            index = this.addStyle(style)
            const cell = this.cell(row, col)
            if (cell instanceof Object) {
                cell.style = index
            } else {
                this.cell(row, col, {
                    value: cell || '',
                    style: index,
                } as CellText)
            }
        }

        return this
    }
    style(index: number, withDefault = true) {
        return getStyle(this._data, index, withDefault)
    }
    addStyle(value: Partial<Style>): number {
        return addStyle(this._data, value, this)
    }
    updateStyle(index: number, value: Partial<Style>) {
        return updateStyle(this._data, index, value, this)
    }
    clearStyles() {
        clearStyles(this._data)
        return this
    }

    addBorder(...value: Border) {
        addBorder(this._data, value)
        return this
    }

    clearBorder(value: string) {
        clearBorder(this._data, value)
        return this
    }

    clearBorders() {
        clearBorders(this._data)
        return this
    }

    eachRange(
        cell1: [number, number],
        cell2: [number, number],
        callback: (row: number, col: number) => void,
    ) {
        const [r1, c1] = cell1
        const [r2, c2] = cell2
        for (let i = r1; i <= r2; i++) {
            for (let j = c1; j <= c2; j++) {
                callback(i, j)
            }
        }
    }

    cell(row: number, col: number): DataCell
    cell(row: number, col: number, value: DataCell): Table
    cell(row: number, col: number, value?: DataCell): DataCell | Table {
        const { _cells } = this

        if (value) {
            _cells.set(row, col, value)
            return this
        }

        const v = _cells.get(row, col)
        return v != null ? v[2] : v
    }

    cellValue(row: number, col: number) {
        return cellValue(this.cell(row, col))
    }
    cellValueString(row: number, col: number) {
        return cellValueString(this.cell(row, col))
    }

    render() {
        const { _data, _renderer, _overlayer } = this
        for (const prop in this._rendererOptions) {
            const propValue = this._rendererOptions[prop as keyof typeof this._rendererOptions]
            if (
                propValue &&
                prop in _renderer &&
                typeof _renderer[prop as keyof typeof _renderer] === 'function'
            ) {
                ;(_renderer[prop as keyof typeof _renderer] as Function)(propValue)
            }
        }

        // _data.scroll: [rows, cols, x, y]
        _renderer
            .scrollRows(_data.scroll[0]) // rows
            .scrollCols(_data.scroll[1]) // cols
            .printInfo(
                (() => {
                    const r = this._printer.getCurrentPaperInfo()
                    if (!r) return
                    // console.log(`x scroll: ${_data.scroll[2]}, y scroll: ${_data.scroll[3]}`)
                    return {
                        scrollX: _data.scroll[2],
                        scrollY: _data.scroll[3],
                        width: r.width,
                        height: r.height,
                        direction: r.direction,
                    }
                })(),
            )
            .merges(_data.merges)
            .freeze(_data.freeze || 'A1')
            .styles(_data.styles)
            .borders(_data.borders)
            .rows(_data.rows.len)
            .cols(_data.cols.len)
            .row((index) => row(_data, index))
            .col((index) => col(_data, index))
            .cell((r, c) => this.cell(r, c))
            .formatter(this._cells._formatter)
            .render()

        // viewport
        const { viewport } = _renderer
        if (viewport) {
            viewport.areas.forEach((rect, index) => {
                _overlayer.area(index, rect)
            })
            viewport.headerAreas.forEach((rect, index) => {
                _overlayer.headerArea(index, rect)
            })
            scrollbar.resize(this)
        }

        if (this._renderer._activeRowHeight) {
            for (const index in this._data.rows) {
                if (index !== 'len') {
                    const row = this._data.rows[index]
                    if (
                        !row.autoWrapDisabled &&
                        row.height &&
                        this._renderer._activeRowHeight[index] === undefined
                    ) {
                        delete this._data.rows[index]
                    }
                }
            }
            for (const index in this._renderer._activeRowHeight) {
                this.rowHeight(
                    Number(index),
                    Math.max(...this._renderer._activeRowHeight[index]),
                    true,
                )
            }

            _renderer.render()
            // .row((index) => {
            //   const r = row(_data, index)
            //   if (
            //     this._renderer._activeRowHeight![index] &&
            //     _data.rows[index]?.height === undefined
            //   ) {
            //     r.height = this._renderer._activeRowHeight![index]
            //   }
            //   return r
            // })

            selector.reset(this)
            this._canvas.focus()
        }

        this._headMenu?.render()
        return this
    }

    data(): TableData
    data(data: Partial<TableData>, rewrite?: boolean): Table
    data(data?: Partial<TableData>, rewrite?: boolean): TableData | Table {
        if (data) {
            if (rewrite) {
                this._data = data as TableData
            } else {
                Object.assign(this._data, data)
            }
            this._cells.load(this._data)
            resizeContentRect(this)
            return this
        } else {
            // fix bug can't get cells
            return {
                ...this._data,
                cells: this._cells._,
            }
        }
    }

    /**
     * copy data to ...
     * @param to
     * @param autofill
     */
    copy(to: string | Range | Table | null, autofill = false) {
        if (!to) return this
        const toCopyData = (range: string | Range, t: Table) => {
            return {
                range: typeof range === 'string' ? Range.with(range) : range,
                cells: t._cells,
                data: t._data,
            }
        }
        const toCopyData1 = (t: Table): CopyData | null => {
            const { _selector } = t
            if (!_selector) return null
            const range = _selector.currentRange
            if (range === undefined) return null
            return toCopyData(range, t)
        }

        copy(
            toCopyData1(this),
            to instanceof Table ? toCopyData1(to) : toCopyData(to, this),
            autofill,
        )
        return this
    }

    /**
     * @param html <table><tr><td style="color: white">test</td></tr></table>
     * @param to A1 or B9
     */
    fill(html: string): Table
    fill(html: string, to: string): Table
    fill(arrays: DataCellValue[][]): Table
    fill(arrays: DataCellValue[][], to: string): Table
    fill(data: string | DataCellValue[][], to?: string): Table {
        const { _selector } = this
        let [startRow, startCol] = [0, 0]
        if (to) {
            ;[startCol, startRow] = expr2xy(to)
        } else {
            if (!_selector) return this
            ;[startRow, startCol] = _selector._focus
        }
        let [endRow, endCol] = [0, 0]

        if (Array.isArray(data)) {
            for (const [i, row] of data.entries()) {
                endCol = startCol + row.length - 1
                if (!row[row.length - 1]) endCol--
                for (const [j, element] of row.entries()) {
                    this.cell(startRow + i, startCol + j, element)
                }
            }
            endRow = startRow + data.length - 1
        } else if (typeof data === 'string') {
            ;[endRow, endCol] = fromHtml(this, data, [startRow, startCol])
        }

        if (endRow > 0 || endCol > 0) {
            selector.unionRange(this, endRow, endCol)
            selector.reset(this)
        }
        return this
    }

    /**
     * @param from A1:H12
     */
    toHtml(from: string): string {
        return toHtml(this, from)
    }

    /** () => [col, row] */
    getMaxArea() {
        let maxRow = 0
        let maxCol = 0

        const d = this.data()
        d.borders.forEach((b) => {
            const expr = b[0].split(':').slice(-1)[0]
            const xy2 = expr2xy(expr)
            maxCol = Math.max(maxCol, xy2[0])
            maxRow = Math.max(maxRow, xy2[1])
        })
        d.cells.forEach((item) => {
            if (item) {
                let [row, col] = item
                const expr = xy2expr(col, row)

                const merge2Expr = d.merges.filter((i) => i.includes(expr))
                if (merge2Expr.length > 0) {
                    const xy2 = expr2xy(merge2Expr[0].split(':')[1])
                    col = Math.max(col, xy2[0])
                    row = Math.max(row, xy2[1])
                }

                // console.log(expr)
                maxRow = Math.max(maxRow, row)
                maxCol = Math.max(maxCol, col)
            }
        })
        return [maxCol, maxRow] as const
    }

    toArrays(from: string): DataCellValue[][] {
        const range = Range.with(from)
        const arrays: DataCellValue[][] = []
        range.eachRow((r) => {
            const a: DataCellValue[] = []
            range.eachCol((c) => {
                a.push(this.cellValue(r, c))
            })
            arrays.push(a)
        })
        return arrays
    }

    onClick(handler: (cell: ViewportCell, evt: MouseEvent) => void) {
        this._emitter.on('click', handler)
        return this
    }

    onContextmenu(handler: (cell: ViewportCell, evt: MouseEvent) => void) {
        this._emitter.on('contextmenu', handler)
        return this
    }

    addHistory(type: string) {
        if (this._history) {
            this._history.add({
                type,
                data: this.data(),
            })
        }
    }

    /**
     * @param type keyof cell.type
     * @param editor
     * @returns
     */
    addEditor(type: string, editor: Editor) {
        this._editors.set(type, editor)
        return this
    }

    static create(
        element: HTMLElement | string,
        width: () => number,
        height: () => number,
        options?: TableOptions,
    ): Table {
        return new Table(element, width, height, options)
    }

    changeLang(lang: string) {
        this._i18n.changeLang(lang)
        return this
    }
}

export function resizeContentRect(t: Table) {
    t._contentRect = {
        x: t._renderer._rowHeader.width,
        y: t._renderer._colHeader.height,
        width: colsWidth(t._data),
        height: rowsHeight(t._data),
    }
}

declare global {
    interface Window {
        wolfp: typeof Table
    }
}

if (window) {
    window.wolfp = Table
}

export { Renders }
