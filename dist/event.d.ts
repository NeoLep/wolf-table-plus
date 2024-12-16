export declare function bind(target: HTMLElement, name: string, callback: (evt: unknown) => void): void;
export declare function unbind(target: HTMLElement, name: string, callback: (evt: unknown) => void): void;
export declare function bindMousemoveAndMouseup(target: HTMLElement, move: (evt: unknown) => void, up: (evt: unknown) => void): void;
type Handler = Function;
export declare class EventEmitter {
    _events: Map<string, Function[]>;
    on(type: string, handler: Handler): this;
    off(type: string, handler?: Handler): this;
    emit(type: string, ...args: unknown[]): this;
}
export {};
