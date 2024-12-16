import type { HElement } from '../..';
import type Table from '../..';
export default class BaseButtons {
    table: Table;
    _: HElement;
    _tooltip: HElement | null;
    hidden: boolean;
    disabled: boolean;
    constructor(table: Table);
    update(): void;
    action(_evt: MouseEvent): void;
    tooltip(tooltip: {
        title: string;
        shortkey?: string;
        delay?: number;
    } | string): this;
}
