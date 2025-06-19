import HElement from '../element';
export declare class EventController {
    events: Record<string, Function[]>;
    constructor();
    add(name: string, callback: Function): void;
    remove(name: string, callback: Function): void;
    emit(name: string, args?: any[]): void;
}
export type FormItemType = {
    label: string;
    prop: string;
    component: FormItem;
    rules?: {
        required?: boolean;
        validator: (value: any, callback: (error?: Error) => void) => void;
    };
};
export default class Form {
    _: HElement;
    configs: {
        labelPosition?: 'top' | 'left' | 'right';
        fields: FormItemType[];
        t?: (word: string) => string;
    };
    form: any;
    fieldsDict: Record<string, {
        labelElement: HElement;
        contentElement: FormItem;
        validator?: () => Promise<void>;
    }>;
    constructor(configs: typeof this.configs, form?: any);
    render(): void;
    getValue(key?: string): any;
    setValue(obj: Record<string, any>): void;
    validate(prop?: string | string[]): Promise<void[]>;
}
export declare class FormItem {
    carrier: HElement | undefined;
    _: HElement;
    onRender: (instance: FormItem) => void;
    constructor(onRender?: typeof this.onRender);
    setValue(value: unknown): void;
    getValue(): unknown;
    on(ename: string, callback: (evt: unknown) => void): void;
    render(): void;
}
type FormItemInputConfigs = {
    placeholder?: string;
    suffix?: HElement;
    onRender?: (instance: FormItemInput) => void;
};
export declare class FormItemInput extends FormItem {
    configs: FormItemInputConfigs;
    carrier: HElement;
    constructor(value?: string | number, configs?: FormItemInputConfigs);
    render: () => void;
}
type FormItemSelectConfigs = {
    placeholder?: string;
    clearable?: boolean;
    options: {
        label: string;
        value: string;
    }[];
    onRender?: (instance: FormItemSelect) => void;
};
export declare class FormItemSelect extends FormItem {
    configs: FormItemSelectConfigs;
    carrier: HElement;
    optionContainer: HElement;
    suffixContainer: HElement;
    clearIconVisible: boolean;
    value: string | number | boolean | undefined;
    events: EventController;
    constructor(value?: string | number, configs?: FormItemSelectConfigs);
    setValue(value?: string | number | boolean): void;
    getValue(): string | number | boolean | undefined;
    renderSuffixIcon(type?: 'clearbtn'): void;
    renderValue(): void;
    on(ename: string, callback: Function): void;
    render: () => void;
    changeOptionVisibility: (visible?: boolean) => void;
}
export {};
