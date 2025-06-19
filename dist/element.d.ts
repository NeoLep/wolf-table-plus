import type * as CSS from 'csstype';
/**
 * 将驼峰字符转换为中划线字符
 * @param {string} str 需要转换的字符
 * @returns 示例:TButtonTest1 => t-button-test-1
 */
export declare function camelCaseToKebabCase(str: string): string;
export type CSSAttrs = Partial<CSS.Properties>;
export default class HElement {
    _: HTMLElement;
    _data: Map<any, any>;
    constructor(tag: string | Node, className?: string | string[] | object);
    element(): HTMLElement;
    data(key: string): HElement;
    data(key: string, value: unknown): HElement;
    on(eventName: string, handler: (evt: unknown) => void): this;
    focus(): this;
    value(): string;
    value(v: string): HElement;
    textContent(v: string): this;
    html(v: string): this;
    attr(key: string): string | null;
    attr(key: string, value: string): HElement;
    addCss(name: string): void;
    removeCss(name: string): void;
    css(key: string): string;
    css(props: CSSAttrs): HElement;
    css(key: string, value: string, priority?: string): HElement;
    setStyles(props: CSSAttrs): HElement;
    rect(): DOMRect;
    offset(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    computedStyle(): CSSStyleDeclaration;
    isShow(): boolean;
    show(flag?: boolean): this;
    hide(): this;
    scrollx(): number;
    scrollx(value: number): HElement;
    scrolly(): number;
    scrolly(value: number): HElement;
    after(...nodes: (HElement | Node | string)[]): this;
    before(...nodes: (HElement | Node | string)[]): this;
    append(...nodes: (HElement | Node | string)[]): this;
    remove(...nodes: HElement[]): void;
    cloneNode(): Node;
    get firstChild(): HElement | null;
}
export declare function h(tag: string | HTMLElement, className?: string | string[] | object): HElement;
export declare function textWidth(text: string, fontSize: string, fontFamily: string): number;
