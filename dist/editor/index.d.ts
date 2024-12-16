import type HElement from '../element';
import type { Rect } from '../table-renderer';
import type { DataCell } from '../data';
type MoveDirection = 'up' | 'down' | 'left' | 'right' | 'none';
type MoveChanger = (direction: MoveDirection) => void;
type Changer = (value: DataCell) => void;
/**
 * new -> cellIndex -> rect -> target -> hide
 */
export default class Editor {
    _: HElement;
    _target: HElement | null;
    _rect: Rect | null;
    _oldValue: string;
    _value: DataCell;
    _visible: boolean;
    _moveChanger: MoveChanger;
    _changer: Changer;
    storeHistory: () => number;
    constructor(cssClass: string);
    get visible(): boolean;
    target(target: HElement): this;
    cellIndex(r: number, c: number): this;
    value(v?: DataCell): this;
    changed(): void;
    rect(rect: Rect | null): this;
    show(text?: string | number): this;
    hide(): this;
    moveChanger(value: MoveChanger): this;
    cancel(): void;
    changer(value: Changer): this;
}
export {};
