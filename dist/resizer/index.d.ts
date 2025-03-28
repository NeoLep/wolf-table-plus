import { AreaCell } from '../table-renderer';
import HElement from '../element';
export type ResizerType = 'row' | 'col';
export default class Resizer {
    _: HElement;
    _hover: HElement;
    _line: HElement;
    _type: ResizerType;
    _minValue: number;
    _lineLength: () => number;
    _cell: AreaCell | null;
    _change: (value: number, cell: AreaCell) => void;
    constructor(type: ResizerType, target: HElement, minValue: number, lineLength: () => number, change?: (value: number, cell: AreaCell) => void);
    show(cell: AreaCell): void;
    hide(): void;
}
