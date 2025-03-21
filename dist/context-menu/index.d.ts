import type Table from '..';
import type HElement from '../element';
import ValidatorSelectDialog from '../validators/select';
type StatusType = boolean | ((table: Table) => boolean) | ((table: Table) => Promise<boolean>);
type BaseOption = {
    id: string;
    label: string;
    shortcut?: string;
    hidden?: StatusType;
    disable?: StatusType;
};
type NormalMenuOption = BaseOption & {
    type?: undefined;
    action: (evt: MouseEvent, table: Table) => void;
    render?: (element: HElement) => void;
};
type TreeMenuOption = BaseOption & {
    type: 'tree';
    action?: (evt: MouseEvent, table: Table) => void;
    children: (TreeMenuOption | NormalMenuOption)[];
};
type DividerLineOption = {
    type: 'div';
    render?: (element: HElement) => void;
};
type OptionsResultType = NormalMenuOption | DividerLineOption | TreeMenuOption;
export default class ContextMenu {
    table: Table;
    _contextElement: HElement;
    hiddenOption: string[] | ((table: Table) => string[]);
    _extendOptions: OptionsResultType[];
    validatorSelectDialogEvents: {
        instance: ValidatorSelectDialog;
        show: Function;
        close: Function;
    };
    constructor(table: Table);
    options: () => OptionsResultType[];
    show(evt: MouseEvent & {
        layerY: number;
        layerX: number;
    }): Promise<void>;
    hide: (evt: MouseEvent) => void;
    appendOption: (option: OptionsResultType) => void;
    removeOption: (id: string) => void;
}
export {};
