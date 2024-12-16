import type Table from '../..';
import type HElement from '../../element';
export default class ColorPicker {
    table?: Table;
    _: HElement;
    _fastColorElement: HElement;
    _themeColorElement: HElement;
    fastColor: string;
    onChange: (color: string) => void;
    constructor(container?: HElement, table?: Table);
    themeColors: string[][];
    renderThemeColorElement(): void;
    updateFastColorElement(color?: string): void;
    createColorCube(color: string): HElement;
}
