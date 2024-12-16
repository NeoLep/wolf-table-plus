import type BaseButtons from './buttons';
import type HElement from '../element';
import type Table from '..';
export default class HeadMenu {
    table: Table;
    _headMenuElement: HElement;
    height: number;
    options: BaseButtons[];
    constructor(table: Table);
    init(): Promise<void>;
    updateStatus(): void;
    render(): void;
}
