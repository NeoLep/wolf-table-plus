import Dropdown from '../dropdown';
import ColorPicker from '../color-picker';
import DropdownList from '../dropdown/dropdown-list';
import BaseButtons from '.';
import type { BorderLineStyle, BorderType } from '../../table-renderer';
import type { HElement } from '../..';
import type Table from '../..';
export default class BorderButton extends BaseButtons {
    table: Table;
    _dropdown: Dropdown;
    _ctx: ContextButton;
    _line: LineButton;
    _visible: boolean;
    constructor(table: Table);
    generateContent(): HElement;
    setBorderStyle(type: BorderType | 'none'): void;
    update(): void;
    render(): void;
}
declare class ContextButton {
    table: Table;
    _: HElement;
    _dropdown: Dropdown;
    _colorPicker: ColorPicker;
    _btn: HElement;
    constructor(table: Table);
    updateButton(): void;
    getValue(): string;
}
declare class LineButton {
    table: Table;
    _: HElement;
    _dropdown: DropdownList<BorderLineStyle>;
    _btn: HElement;
    lines: BorderLineStyle[];
    constructor(table: Table);
    drawLine(type: BorderLineStyle): "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"1\" style=\"user-select: none;\"><line x1=\"0\" y1=\"0.5\" x2=\"50\" y2=\"0.5\" stroke-width=\"1\" stroke=\"black\" style=\"user-select: none;\"></line></svg>" | "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"2\" style=\"user-select: none;\"><line x1=\"0\" y1=\"1.0\" x2=\"50\" y2=\"1.0\" stroke-width=\"2\" stroke=\"black\" style=\"user-select: none;\"></line></svg>" | "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"3\" style=\"user-select: none;\"><line x1=\"0\" y1=\"1.5\" x2=\"50\" y2=\"1.5\" stroke-width=\"3\" stroke=\"black\" style=\"user-select: none;\"></line></svg>" | "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"1\" style=\"user-select: none;\"><line x1=\"0\" y1=\"0.5\" x2=\"50\" y2=\"0.5\" stroke-width=\"1\" stroke=\"black\" stroke-dasharray=\"2\" style=\"user-select: none;\"></line></svg>" | "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"1\" style=\"user-select: none;\"><line x1=\"0\" y1=\"0.5\" x2=\"50\" y2=\"0.5\" stroke-width=\"1\" stroke=\"black\" stroke-dasharray=\"1\" style=\"user-select: none;\"></line></svg>" | undefined;
    updateButton(line: BorderLineStyle): void;
    getValue(): BorderLineStyle | null;
}
export {};
