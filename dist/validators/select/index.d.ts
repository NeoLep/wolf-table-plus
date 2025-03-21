import Dialog from '../../dialog';
import Form, { FormItemInput } from '../../form';
import HElement from '../../element';
import { Range } from '../../table-renderer';
import Table from '../..';
export default class ValidatorSelectDialog {
    formInstance: Form | undefined;
    formContainer: HElement;
    footer: HElement;
    dialog: Dialog;
    cellAreaDialog: CellAreaSelectDialog;
    table: Table;
    t: (code: string) => string;
    data: {
        cellRange: string;
        options: string[];
    };
    configs: {
        onBeforceCloseCallback?: () => boolean | undefined;
        onSubmitCallback?: (value: {
            cellRange: string;
            options: string[];
        }) => void;
    };
    constructor(table: Table, config: typeof this.configs);
    renderForm(): void;
    renderFooter(): void;
    render(): void;
    show(data: typeof this.data): void;
    close(): void;
}
declare class CellAreaSelectDialog {
    input: FormItemInput;
    form: HElement;
    footer: HElement;
    dialog: Dialog;
    table: Table;
    onBeforceCallback: () => boolean;
    onSubmitCallback: undefined | ((value: string) => void);
    constructor(table: Table, events: {
        onBeforceCallback?: () => boolean;
        onSubmitCallback?: (value: string) => void;
    });
    render(): void;
    show(area: string): void;
    updateValue: (value: [number, number] | Range) => void;
    validator: (value: string, callback: Function) => any;
}
export {};
