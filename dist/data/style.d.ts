import type { Style } from '../table-renderer';
import type { TableData } from '.';
import Table from '..';
export declare function addStyle(data: TableData, value: Partial<Style>, table?: Table): number;
export declare function updateStyle(data: TableData, index: number, style: Partial<Style>, table?: Table): void;
export declare function getStyle(t: TableData, index: number, withDefault?: boolean): Partial<Style>;
export declare function clearStyles(t: TableData): void;
