import HElement from '../element';
export default class Dialog {
    content: HElement;
    mask: HElement;
    container: HElement;
    closeIcon: HElement;
    containerHeader: HElement;
    containerBody: HElement;
    containerFooter: HElement;
    hasInserted: boolean;
    visible: boolean;
    conf: {
        to?: HTMLElement;
        delayGenerate?: boolean;
        title?: string;
        width?: string;
        height?: string;
        disableMask?: boolean;
        maskColor?: string;
        closeOnClickMask?: boolean;
        draggable?: boolean;
        onBeforeClose?: () => boolean | undefined | void;
    };
    constructor(content: HElement | HElement[], config?: typeof this.conf);
    initContiner(): void;
    insertContent(): void;
    updateConfig(nConf: typeof this.conf): void;
    render(): void;
    show(): void;
    close(): void;
}
