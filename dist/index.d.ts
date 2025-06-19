import './style.index.scss';
import HElement, { h } from './element';
import Overlayer from './overlayer';
import TableRenderer, { Range } from './table-renderer';
import { Cells } from './data';
import { EventEmitter } from './event';
import Events from './events';
import History from './index.history';
import ContextMenu from './context-menu';
import I18n from './i18n';
import HeadMenu from './head-menu';
import type { TableData, FormulaParser, DataCell, DataRow, DataCol, DataCellValue } from './data';
import type { Style, ColHeader, RowHeader, Rect, Border, Formatter, Gridline, ViewportCell } from './table-renderer';
import type Editor from './editor';
import type Selector from './selector';
import type Resizer from './resizer';
import type Scrollbar from './scrollbar';
import Renders from './table-renderer/renders';
import Printer from './index.printer';
export type TableRendererOptions = {
    style?: Partial<Style>;
    headerStyle?: Partial<Style>;
    rowHeader?: Partial<RowHeader>;
    colHeader?: Partial<ColHeader>;
    gridline?: Partial<Gridline>;
    headerGridline?: Partial<Gridline>;
    freeGridline?: Partial<Gridline>;
};
export type TableDataOptions = {
    rows?: number;
    cols?: number;
    rowHeight?: number;
    colWidth?: number;
};
export type TableOptions = {
    minRowHeight?: number;
    minColWidth?: number;
    hideHeadMenu?: boolean;
    scrollable?: boolean;
    resizable?: boolean;
    selectable?: boolean;
    editable?: boolean;
    copyable?: boolean;
    data?: TableDataOptions;
    renderer?: TableRendererOptions;
};
export type MoveDirection = 'up' | 'down' | 'left' | 'right' | 'none';
export { HElement, h };
export default class Table {
    _rendererOptions: TableRendererOptions;
    _copyable: boolean;
    _editable: boolean;
    _minRowHeight: number;
    _minColWidth: number;
    _width: () => number;
    _height: () => number;
    _contentRect: Rect;
    _headMenu: HeadMenu | null;
    _container: HElement;
    _Layer: HElement;
    _data: TableData;
    _renderer: TableRenderer;
    _cells: Cells;
    _vScrollbar: Scrollbar | null;
    _hScrollbar: Scrollbar | null;
    _rowResizer: Resizer | null;
    _colResizer: Resizer | null;
    _editor: Editor | null;
    _editors: Map<any, any>;
    _selector: Selector | null;
    _overlayer: Overlayer;
    _canvas: HElement;
    _emitter: EventEmitter;
    _events: Events;
    _history: History;
    _contextMenu: ContextMenu;
    _i18n: I18n;
    _printer: Printer;
    constructor(element: HTMLElement | string, width: () => number, height: () => number, options?: TableOptions);
    contentRect(): Rect;
    container(): HElement;
    resize(): void;
    freeze(ref?: string): this;
    isMerged(): boolean;
    isMerged(ref: string): boolean;
    merge(): Table;
    merge(ref: string): Table;
    unmerge(): Table;
    unmerge(ref: string): Table;
    row(index: number): DataRow;
    row(index: number, value: Partial<DataRow>): Table;
    rowHeight(index: number): number;
    rowHeight(index: number, value: number, autoWrap?: boolean): Table;
    rowsHeight(min: number, max: number): number;
    isLastRow(index: number): boolean;
    col(index: number): DataCol;
    col(index: number, value: Partial<DataCol>): Table;
    colWidth(index: number): number;
    colWidth(index: number, value: number): Table;
    colsWidth(min: number, max: number): number;
    isLastCol(index: number): boolean;
    formulaParser(v: FormulaParser): this;
    formatter(v: Formatter): this;
    /**
     * 获取 style 样式 index
     * @param row
     * @param col
     * @returns
     */
    getStyleIndex(row: number, col: number): number;
    getPureStyle(row: number, col: number): Partial<Style> | null;
    getStyle(row: number, col: number, withDefault?: boolean): Partial<Style>;
    /**
     * 设置 style
     * @param row
     * @param col
     * @param style
     * @param rewrite 为 true 时, 重写要设置的全部样式, 否则只进行合并
     */
    setStyle(row: number, col: number, style: Partial<Style>, rewrite?: boolean): this;
    style(index: number, withDefault?: boolean): Partial<Style>;
    addStyle(value: Partial<Style>): number;
    updateStyle(index: number, value: Partial<Style>): void;
    clearStyles(): this;
    addBorder(...value: Border): this;
    clearBorder(value: string): this;
    clearBorders(): this;
    eachRange(cell1: [number, number], cell2: [number, number], callback: (row: number, col: number) => void): void;
    cell(row: number, col: number): DataCell;
    cell(row: number, col: number, value: DataCell): Table;
    cellValue(row: number, col: number): DataCellValue;
    cellValueString(row: number, col: number): string;
    render(): this;
    data(): TableData;
    data(data: Partial<TableData>, rewrite?: boolean): Table;
    /**
     * copy data to ...
     * @param to
     * @param autofill
     */
    copy(to: string | Range | Table | null, autofill?: boolean): this;
    /**
     * @param html <table><tr><td style="color: white">test</td></tr></table>
     * @param to A1 or B9
     */
    fill(html: string): Table;
    fill(html: string, to: string): Table;
    fill(arrays: DataCellValue[][]): Table;
    fill(arrays: DataCellValue[][], to: string): Table;
    /**
     * @param from A1:H12
     */
    toHtml(from: string): string;
    /** () => [col, row] */
    getMaxArea(): readonly [number, number];
    toArrays(from: string): DataCellValue[][];
    onClick(handler: (cell: ViewportCell, evt: MouseEvent) => void): this;
    onContextmenu(handler: (cell: ViewportCell, evt: MouseEvent) => void): this;
    addHistory(type: string): void;
    /**
     * @param type keyof cell.type
     * @param editor
     * @returns
     */
    addEditor(type: string, editor: Editor): this;
    static create(element: HTMLElement | string, width: () => number, height: () => number, options?: TableOptions): Table;
    changeLang(lang: string): this;
}
export declare function resizeContentRect(t: Table): void;
declare global {
    interface Window {
        wolfp: typeof Table;
    }
}
export { Renders };
