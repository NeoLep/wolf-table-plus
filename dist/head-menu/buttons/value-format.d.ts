import DropdownList from '../dropdown/dropdown-list';
import BaseButtons from '.';
import type { SupportFormats } from '../../data/format';
import type Table from '../..';
export default class ValueTypeButton extends BaseButtons {
    table: Table;
    _dropdown: DropdownList<SupportFormats>;
    _visible: boolean;
    constructor(table: Table);
    update(): void;
    changeFormat(_evt: MouseEvent, format: SupportFormats): void;
    render(): void;
}
