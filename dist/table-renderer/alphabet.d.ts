export declare function stringAt(index: number): string;
export declare function indexAt(str: string): number;
/** (B10 => [col, row]) */
export declare function expr2xy(expr: string): [number, number];
/** (col, row) => B10 */
export declare function xy2expr(x: number, y: number): string;
export declare function expr2expr(expr: string, xn: number, yn: number): string;
export declare function validExpr(expr: string): boolean;
declare const _default: {
    stringAt: typeof stringAt;
    indexAt: typeof indexAt;
    expr2xy: typeof expr2xy;
    xy2expr: typeof xy2expr;
    expr2expr: typeof expr2expr;
    validExpr: typeof validExpr;
};
export default _default;
