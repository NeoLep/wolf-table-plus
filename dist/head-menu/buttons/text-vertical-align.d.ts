import HElement from '../../element';
import DropdownList from '../dropdown/dropdown-list';
import BaseButtons from '.';
import type { VerticalAlign } from '../../table-renderer';
import type { OptionItemType } from '../dropdown/dropdown-list';
import type Table from '../..';
export default class TextVerticalAlignButton extends BaseButtons {
    table: Table;
    _dropdown: DropdownList<VerticalAlign>;
    _visible: boolean;
    constructor(table: Table);
    generateButton(icn: string): HElement;
    update(): void;
    render: () => void;
    renderOption: (item: OptionItemType<string>, li: HElement) => HElement;
    changeTextAlign: (valign: VerticalAlign) => void;
}
