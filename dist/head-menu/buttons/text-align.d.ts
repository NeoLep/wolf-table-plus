import HElement from '../../element';
import DropdownList from '../dropdown/dropdown-list';
import BaseButtons from '.';
import type { Align } from '../../table-renderer';
import type { OptionItemType } from '../dropdown/dropdown-list';
import type Table from '../..';
export default class TextAlignButton extends BaseButtons {
    table: Table;
    _dropdown: DropdownList<Align>;
    _visible: boolean;
    constructor(table: Table);
    generateButton(icn: string): HElement;
    update(): void;
    render: () => void;
    renderOption: (item: OptionItemType<string>, li: HElement) => HElement;
    changeTextAlign: (align: Align) => void;
}
