import type { TableData } from './data';
export type HistoryRecordItemType = {
    type: string;
    data: TableData;
};
export default class History {
    undoItems: string[];
    redoItems: string[];
    maxSize: number;
    constructor();
    add(data: HistoryRecordItemType): void;
    canUndo(): boolean;
    canRedo(): boolean;
    undo(currentd: HistoryRecordItemType, cb: (data: HistoryRecordItemType) => void): void;
    redo(currentd: HistoryRecordItemType, cb: (data: HistoryRecordItemType) => void): void;
}
