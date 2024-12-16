import type { SupportFormats } from './format';
import type { Formatter } from '../table-renderer';
import type { IndexDataCell, DataCell, TableData, FormulaParser, DataCellValue } from '.';
export default class Cells {
    _: IndexDataCell[];
    _indexes: Map<any, any>;
    _formulas: number[];
    _formulaParser: FormulaParser;
    _formatter: Formatter;
    _releasedIndexs: number[];
    constructor();
    formulaParser(v: FormulaParser): this;
    formatter(v: Formatter): this;
    load({ cells }: TableData): void;
    get(row: number, col: number): IndexDataCell | null;
    removeValue(row: number, col: number): this;
    remove(row: number, col: number): this;
    set(row: number, col: number, cell: DataCell): void;
    setFormat(row: number, col: number, format: SupportFormats): void;
    fixed(row: number, col: number): number;
    fixed(row: number, col: number, type: 'increase' | 'reduce'): void;
    fixed(row: number, col: number, fix: number): void;
    resetIndexes(): void;
    private updateIndex;
    private addFormula;
    private resetFormulas;
}
export declare function cellValue(cell: DataCell): DataCellValue;
export declare function cellValueString(cell: DataCell): string;
