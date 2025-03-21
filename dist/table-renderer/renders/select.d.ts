import { CanvasRenderFuncType, CellSelect, FromHtmlFuncType, ToHtmlFuncType } from '.';
import { ViewportCell } from '..';
import Table from '../..';
export declare const selectToHtml: ToHtmlFuncType;
export declare const selectFromHtml: FromHtmlFuncType;
export declare const selectCanvasRender: CanvasRenderFuncType;
export declare const selectClickEvent: (table: Table, cell: CellSelect, vcell: ViewportCell, evt: MouseEvent) => void;
