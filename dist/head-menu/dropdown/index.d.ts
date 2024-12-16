import type HElement from '../../element';
export declare const isMouseInnerElementArea: (element: HTMLElement, evt: MouseEvent) => boolean;
export default class Dropdown {
    _visible: boolean;
    disabled: boolean;
    _: HElement;
    _labelElement: HElement;
    _contentElement: HElement;
    beforeShow: ((evt?: MouseEvent) => void) | ((evt?: MouseEvent) => Promise<void>) | null;
    onShow: ((evt?: MouseEvent) => void) | null;
    beforeHide: ((evt?: MouseEvent) => void) | ((evt?: MouseEvent) => Promise<void>) | null;
    onHide: ((evt?: MouseEvent) => void) | null;
    constructor(labelElement: HElement, contentElement: HElement);
    show(evt?: MouseEvent): Promise<void>;
    hide: (evt?: MouseEvent) => Promise<void>;
}
