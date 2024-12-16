import { Cell } from './renders';
import type Canvas from './canvas';
import type { Style, Rect, BorderLineStyle, Formatter, CellRenderer, BorderLine } from '.';
export declare function cellBorderRender(canvas: Canvas, rect: Rect, borderLine: BorderLine | [BorderLineStyle, string], autoAlign?: boolean): void;
export declare function cellValueGetter(cell: Cell, style: Style, formatter: Formatter): string;
export declare function cellRender(canvas: Canvas, cell: Cell, rect: Rect, style: Style, cellRenderer: CellRenderer | undefined, formatter: Formatter, type: 'body' | 'row-header' | 'col-header'): void | {
    contentInfo: {
        width: number;
        height: number;
    };
};
declare const _default: {};
export default _default;
