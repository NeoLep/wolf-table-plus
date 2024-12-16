import { stringAt, expr2xy, xy2expr, expr2expr } from './alphabet';
import Canvas from './canvas';
import Range, { eachRanges, findRanges } from './range';
import Viewport from './viewport';
import Area from './area';
import type { SupportFormats } from '../data/format';
import { Cell } from './renders';
export type Align = 'left' | 'right' | 'center';
export type VerticalAlign = 'top' | 'bottom' | 'middle';
export type GridlineStyle = 'solid' | 'dashed' | 'dotted';
export type Gridline = {
    width: number;
    color: string;
    style?: GridlineStyle;
};
export type TextLineType = 'underline' | 'strikethrough';
export type BorderType = 'all' | 'inside' | 'horizontal' | 'vertical' | 'outside' | 'left' | 'top' | 'right' | 'bottom';
export type BorderLineStyle = 'thin' | 'medium' | 'thick' | 'dashed' | 'dotted';
export type BorderLine = {
    left?: [BorderLineStyle, string];
    top?: [BorderLineStyle, string];
    right?: [BorderLineStyle, string];
    bottom?: [BorderLineStyle, string];
};
export type BorderArea = string;
export type BorderColor = string;
/** ref, type, style, color */
export type Border = [BorderArea, BorderType, BorderLineStyle, BorderColor];
export type Style = {
    bgcolor?: string;
    color: string;
    align: Align;
    valign: VerticalAlign;
    textwrap: boolean;
    underline: boolean;
    strikethrough: boolean;
    bold: boolean;
    italic: boolean;
    fontSize: number;
    fontFamily: string;
    rotate?: number;
    padding?: [number, number];
};
export type CellGetter = (rowIndex: number, colIndex: number) => Cell;
export type Formatter = (cell: Cell, style: Style, value: string, format?: SupportFormats) => string;
export type Row = {
    height: number;
    hide?: boolean;
    autoFit?: boolean;
    style?: number;
    autoWrapDisabled?: boolean;
};
export type RowGetter = (index: number) => Row | undefined;
export type RowHeightGetter = (index: number) => number;
export type Col = {
    width: number;
    hide?: boolean;
    autoFit?: boolean;
    style?: number;
};
export type ColGetter = (index: number) => Col | undefined;
export type ColWidthGetter = (index: number) => number;
export type RowHeader = {
    width: number;
    cols: number;
    cell: CellGetter;
    cellRenderer?: CellRenderer;
    merges?: string[];
};
export type ColHeader = {
    height: number;
    rows: number;
    cell: CellGetter;
    cellRenderer?: CellRenderer;
    merges?: string[];
};
export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type AreaCell = {
    row: number;
    col: number;
} & Rect;
export type ViewportCell = {
    placement: 'all' | 'row-header' | 'col-header' | 'body';
} & AreaCell;
export type CellRenderer = (canvas: Canvas, rect: Rect, cell: Cell, text: string) => boolean;
/**
 * ----------------------------------------------------------------
 * |            | column header                                   |
 * ----------------------------------------------------------------
 * |            |                                                 |
 * | row header |              body                               |
 * |            |                                                 |
 * ----------------------------------------------------------------
 * row { height, hide, autoFit }
 * col { width, hide, autoFit }
 * cell {
 *   value,
 *   style: {
 *     border, fontSize, fontName,
 *     bold, italic, color, bgcolor,
 *     align, valign, underline, strike,
 *     rotate, textwrap, padding,
 *   },
 *   type: text | button | link | checkbox | radio | list | progress | image | imageButton | date
 * }
 */
export default class TableRenderer {
    _target: HTMLCanvasElement;
    _bgcolor: string;
    _width: number;
    _height: number;
    _scale: number;
    _rows: number;
    _cols: number;
    _rowHeight: number;
    _colWidth: number;
    _startRow: number;
    _startCol: number;
    _scrollRows: number;
    _scrollCols: number;
    /**
     * get row given rowIndex
     * @param {int} rowIndex
     * @returns Row | undefined
     */
    _row: RowGetter;
    /**
     * get col given colIndex
     * @param {int} coIndex
     * @returns Row | undefined
     */
    _col: ColGetter;
    /**
     * get cell given rowIndex, colIndex
     * @param {int} rowIndex
     * @param {int} colIndex
     * @returns Cell | string
     */
    _cell: CellGetter;
    _cellRenderer: CellRenderer;
    _formatter: Formatter;
    _merges: string[];
    _borders: Border[];
    _styles: Partial<Style>[];
    _gridline: Gridline;
    _style: Style;
    _rowHeader: RowHeader;
    _colHeader: ColHeader;
    _headerGridline: Gridline;
    _headerStyle: Style;
    _freeze: [number, number];
    _freezeGridline: Gridline;
    _viewport: Viewport | null;
    _activeRowHeight: Record<number, number[]>;
    constructor(container: string | HTMLCanvasElement, width: number, height: number);
    render(): this;
    bgcolor(value: string): this;
    width(value: number): this;
    height(value: number): this;
    scale(value: number): this;
    rows(value: number): this;
    cols(value: number): this;
    rowHeight(value: number): this;
    colWidth(value: number): this;
    startRow(value: number): this;
    startCol(value: number): this;
    scrollRows(value: number): this;
    scrollCols(value: number): this;
    row(value: RowGetter): this;
    col(value: ColGetter): this;
    cell(value: (rowIndex: number, colIndex: number) => Cell): this;
    cellRenderer(value: CellRenderer): this;
    formatter(value: Formatter): this;
    merges(value: string[]): this;
    styles(value: Partial<Style>[]): this;
    borders(value: Border[]): this;
    gridline(value?: Partial<Gridline>): this;
    style(value?: Partial<Style>): this;
    rowHeader(value?: Partial<RowHeader>): this;
    colHeader(value?: Partial<ColHeader>): this;
    headerGridline(value?: Partial<Gridline>): this;
    headerStyle(value?: Partial<Style>): this;
    freeze(ref?: string): this;
    freezeGridline(value?: Partial<Gridline>): this;
    rowHeightAt(index: number): number;
    colWidthAt(index: number): number;
    get viewport(): Viewport | null;
    static create(container: string | HTMLCanvasElement, width: number, height: number): TableRenderer;
}
export { expr2xy, xy2expr, expr2expr, stringAt, Canvas, Range, Viewport, Area, eachRanges, findRanges, };
declare global {
    interface Window {
        wolf: any;
    }
}
