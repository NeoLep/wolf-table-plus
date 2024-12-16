import type Table from '.';
declare function move(t: Table): void;
declare function reset(t: Table, text?: string | number): void;
declare const _default: {
    move: typeof move;
    reset: typeof reset;
};
export default _default;
