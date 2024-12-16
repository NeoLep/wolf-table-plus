import BaseButtons from '.';
import type { HElement } from '../..';
import type Table from '../..';
type ButtonType = 'font-bold' | 'font-italic' | 'underline' | 'strike' | 'merge' | 'textwrap' | 'freeze' | 'reduce-dicimal' | 'increase-dicimal';
export default class FastOperateButton extends BaseButtons {
    table: Table;
    buttonType: ButtonType;
    button: HElement;
    constructor(table: Table, type: ButtonType, callback?: Function);
    update(): this | undefined;
    action(_evt: MouseEvent): void;
}
export {};
