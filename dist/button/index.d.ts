import HElement from '../element';
export default class Button {
    _: HElement;
    configs: {
        disabled?: boolean;
        padding?: string;
        noneBorder?: boolean;
        onClick?: () => void;
    } | undefined;
    baseName: string | HElement;
    constructor(name: string | HElement, type?: 'default' | 'warning' | 'primary' | 'danger' | 'success' | 'info', configs?: typeof this.configs);
    render(): void;
}
export declare class Icon {
    _: HElement;
    constructor(icon: string);
}
