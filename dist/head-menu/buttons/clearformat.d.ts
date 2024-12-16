import BaseButtons from '.';
import type Table from '../..';
export default class ClearformatButton extends BaseButtons {
    table: Table;
    constructor(table: Table);
    update(): void;
    action(_evt: MouseEvent): void;
}
