import type { Border, Style } from '../table-renderer';
import type { SupportFormats } from '../data/format';
import type { MoveDirection } from '..';
import type Table from '..';
/**
 * @description 事件管理
 */
export default class Events {
    table: Table;
    setCutted: boolean;
    constructor(table: Table);
    initSelectorShadowInput(): void;
    mousedownHandler(evt: MouseEvent): void;
    mouseUpHandler(evt: MouseEvent): void;
    mousemoveHandler(evt: MouseEvent): void;
    wheelHandler(evt: WheelEvent): void;
    canInput(evt: KeyboardEvent): boolean;
    eventTrigger(action: 'copy' | 'cut' | 'undo' | 'redo' | 'clearCopy' | 'insertRow' | 'insertCol' | 'deleteRow' | 'deleteCol' | 'clearBorder' | 'merge' | 'freeze' | 'paintFormat'): void;
    eventTrigger(action: 'paste', onlyCopyText?: boolean): void;
    eventTrigger(action: 'setStyle', style: Partial<Style>): void;
    eventTrigger(action: 'fastStyle', type: 'bold' | 'underline' | 'italic' | 'strikethrough' | 'textwrap'): void;
    eventTrigger(action: 'fastFormat', format: SupportFormats): void;
    eventTrigger(action: 'fastFixed', type: 'increase' | 'reduce'): void;
    eventTrigger(action: 'move', direction: MoveDirection, step?: number, reselect?: boolean): void;
    eventTrigger(action: 'clearCell', type: 'cell' | 'value' | 'style' | 'format'): void;
    eventTrigger(action: 'setBorder', type: Border[1], lineStyle: Border[2], color: Border[3]): void;
    keydownHandler(evt: KeyboardEvent): void;
    contextmenuHandler(evt: MouseEvent & {
        layerY: number;
        layerX: number;
    }): void;
}
