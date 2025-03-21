import type Table from '../..';
import type { Rect, Style, CellRenderer, Formatter, ViewportCell } from '..';
import type Canvas from '../canvas';
import { SupportFormats } from '../../data/format';
export type CellType = 'text' | 'image' | string;
export type CellBase = {
    type: CellType;
    style?: number;
    format?: SupportFormats;
    fixed?: number;
    formula?: string;
    value?: string;
};
export type CellText = CellBase & {
    type?: 'text';
    [property: string]: unknown;
};
export type CellSelect = CellBase & {
    type: 'select';
    options: string[];
};
export type CellImages = CellBase & {
    type: 'image';
    valueType: 'url' | 'base64' | 'local';
};
export type CellExtends = CellBase & unknown;
export type Cell = CellText | CellSelect | CellImages | CellExtends | string | number | null | undefined;
export type ToHtmlFuncType = (t: Table, cell: Cell, row: number, col: number, htmlStr: string) => string;
export type CanvasRenderFuncType = (canvas: Canvas, cell: Cell, rect: Rect, style: Style, cellRenderer: CellRenderer | undefined, formatter: Formatter, type: 'body' | 'row-header' | 'col-header', ...args: unknown[]) => {
    contentInfo: {
        width: number;
        height: number;
    };
} | void;
export type FromHtmlFuncType = (t: Table, td: HTMLElement, nstyle: Partial<Style>) => Cell;
export declare const cellTypeGetter: (cell: Cell) => CellType;
export type RenderOptionItem = {
    type: CellType;
    disableAutoFillAction?: boolean;
    toHtml: ToHtmlFuncType;
    fromHtml: FromHtmlFuncType;
    toCanvas: CanvasRenderFuncType;
    editor?: () => unknown;
    clickEvent?: (table: Table, cell: any, vcell: ViewportCell, evt: MouseEvent) => void;
};
export declare const BaseRenders: RenderOptionItem[];
export default class Renders {
    #private;
    static use(): Renders;
    options: Record<CellType, RenderOptionItem>;
    loadBaseRender(): void;
    constructor();
    getRender(type: string): RenderOptionItem;
    registRender(render: RenderOptionItem): void;
    deleteRender(name: string): void;
}
