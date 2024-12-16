import type { CanvasRenderFuncType, FromHtmlFuncType, ToHtmlFuncType } from '.';
import type { Align, TextLineType, VerticalAlign } from '..';
import TextEditor from '../../editor/text';
export declare function texty(align: VerticalAlign, height: number, txtHeight: number, fontHeight: number, padding: number): number;
export declare function textLine(type: TextLineType, align: Align, valign: VerticalAlign, x: number, y: number, w: number, h: number): [number, number, number, number];
export declare function textx(align: Align, width: number, padding: number): number;
export declare function fontString(family: string, size: number, italic: boolean, bold: boolean): string | undefined;
export declare const textCanvasRender: CanvasRenderFuncType;
export declare const textToHtml: ToHtmlFuncType;
export declare const textFromHtml: FromHtmlFuncType;
export declare const textEditor: typeof TextEditor;