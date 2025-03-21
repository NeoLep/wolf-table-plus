import HElement from '../element';
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
    constructor(configs: typeof this.configs, form: any);
    render(): void;
    getValue(key?: string): any;
    setValue(obj: Record<string, any>): void;
    validate(prop?: string | string[]): Promise<void[]>;
}
export declare class FormItem {
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
    input: HElement;
    constructor(value?: string | number, configs?: FormItemInputConfigs);
    getValue(): string;
    setValue(value: string | number): void;
    on(ename: string, callback: (evt: unknown) => void): void;
    render: () => void;
}
export {};
