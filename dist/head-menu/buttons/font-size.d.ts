import DropdownList from '../dropdown/dropdown-list';
import BaseButtons from '.';
import type Table from '../..';
export default class FontSizeButton extends BaseButtons {
    table: Table;
    _dropdown: DropdownList<number>;
    _visible: boolean;
    constructor(table: Table);
    update(): void;
    changeFontSize(_evt: MouseEvent, size: number): void;
    render(): void;
}
