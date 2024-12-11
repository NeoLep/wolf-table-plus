// import helper from '../helper';
import type { TableData } from './data'

export type HistoryRecordItemType = { type: string; data: TableData }
export default class History {
    undoItems: string[]
    redoItems: string[]
    maxSize = 50

    constructor() {
        this.undoItems = []
        this.redoItems = []
    }

    add(data: HistoryRecordItemType) {
        if (this.undoItems.length > this.maxSize) {
            this.undoItems.shift()
        }
        this.undoItems.push(JSON.stringify(data))
        this.redoItems = []
    }

    canUndo() {
        return this.undoItems.length > 0
    }

    canRedo() {
        return this.redoItems.length > 0
    }

    undo(currentd: HistoryRecordItemType, cb: (data: HistoryRecordItemType) => void) {
        const { undoItems, redoItems } = this
        if (this.canUndo()) {
            redoItems.push(JSON.stringify(currentd))
            cb(JSON.parse(undoItems.pop()!))
        }
    }

    redo(currentd: HistoryRecordItemType, cb: (data: HistoryRecordItemType) => void) {
        const { undoItems, redoItems } = this
        if (this.canRedo()) {
            undoItems.push(JSON.stringify(currentd))
            cb(JSON.parse(redoItems.pop()!))
        }
    }
}
