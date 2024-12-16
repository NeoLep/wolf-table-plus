import Editor from '..';
import type HElement from '../../element';
import type { Rect } from '../../table-renderer';
import type { DataCell } from '../../data';
export default class TextEditor extends Editor {
    _text: HElement;
    _textMeasure: HElement;
    _editing: boolean;
    constructor();
    value(v: DataCell): this;
    rect(rect: Rect | null): this;
    hide(): this;
}
