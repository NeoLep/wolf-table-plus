import DropdownList from '../dropdown/dropdown-list';
import BaseButtons from '.';
import type { SupportFonts } from '../../data/fonts';
import type Table from '../..';
export default class FontButton extends BaseButtons {
    table: Table;
    _dropdown: DropdownList<SupportFonts>;
    _visible: boolean;
    constructor(table: Table);
    update(): void;
    changeFonts(_evt: MouseEvent, font: SupportFonts): void;
    render(): void;
}
