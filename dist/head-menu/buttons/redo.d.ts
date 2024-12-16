import BaseButtons from '.';
import type { HElement } from '../..';
import type Table from '../..';
export default class RedoButton extends BaseButtons {
    table: Table;
    button: HElement;
    constructor(table: Table);
    update(): void;
    action(_evt: MouseEvent): void;
}
