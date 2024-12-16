import Dropdown from '.';
import type HElement from '../../element';
type StatusType = boolean | (() => boolean) | (() => Promise<boolean>);
export type OptionItemType<T> = {
    label: string;
    value: T;
    hide?: StatusType;
    disabled?: StatusType;
    action: (evt: MouseEvent) => void;
    props?: Record<string, unknown>;
} | 'divider';
export declare const transferStatusToPromise: (status?: StatusType) => Promise<boolean>;
export default class DropdownList<T> {
    disabled: boolean;
    value: T | null;
    options: OptionItemType<T>[];
    _: HElement;
    _dropDownElement: Dropdown;
    customOption: ((option: OptionItemType<T>, li: HElement) => HElement | null) | null;
    constructor(options: OptionItemType<T>[]);
    renderList(): Promise<void>;
    render(): void;
    hide: (evt?: MouseEvent) => Promise<void>;
}
export {};
