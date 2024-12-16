import Dropdown from '../dropdown';
import ColorPicker from '../color-picker';
import BaseButtons from '.';
import type Table from '../..';
export default class textColorButton extends BaseButtons {
    table: Table;
    _dropdown: Dropdown;
    _colorPicker: ColorPicker;
    _visible: boolean;
    constructor(table: Table);
    generateButton(icn: string): import("../..").HElement;
    changeColor(color: string): void;
    update(): void;
    render(): void;
}
