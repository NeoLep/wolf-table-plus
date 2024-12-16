import type { Range } from '../table-renderer';
import type { Cells, TableData } from '.';
export type CopyData = {
    range: Range;
    cells: Cells;
    data: TableData;
};
export type CopyCells = {
    range: Range;
    cells: Cells;
    data: TableData;
};
export declare function copy(from: CopyCells | null, to: CopyCells | null, autofill?: boolean): void;
