import { sum } from '../helper'
import type { DataRow, TableData } from '.'

export function row(data: TableData, index: number): DataRow
export function row(data: TableData, index: number, value: Partial<DataRow>): DataRow
export function row(data: TableData, index: number, value?: Partial<DataRow>): DataRow {
    const oldValue = data.rows[index] || { height: data.rowHeight }
    if (value) {
        return (data.rows[index] = Object.assign(oldValue, value))
    } else {
        return oldValue
    }
}

export function rowHeight(data: TableData, index: number): number
export function rowHeight(data: TableData, index: number, value: number, autoWrap?: boolean): void
export function rowHeight(data: TableData, index: number, value?: number, autoWrap?: boolean) {
    if (value) {
        const { rows } = data
        let autoWrapDisabled = false
        if (value !== data.rowHeight && !autoWrap) {
            autoWrapDisabled = true
        }

        if (rows[index]) {
            if (rows[index].autoWrapDisabled && autoWrap) {
                return
            }
            rows[index].height = value
            rows[index].autoWrapDisabled = autoWrapDisabled
        } else {
            rows[index] = { height: value, autoWrapDisabled }
        }
    } else {
        const r = row(data, index)
        return r.hide ? 0 : r.height
    }
}

export function rowsHeight(data: TableData): number
export function rowsHeight(data: TableData, min: number, max: number): number
export function rowsHeight(data: TableData, min?: number, max?: number) {
    const { rows } = data
    if (arguments.length === 1) {
        let total = rows.len * data.rowHeight
        for (const key in rows) {
            if (key !== 'len') {
                const h = rowHeight(data, Number.parseInt(key, 10))
                if (h > 0) {
                    total += h
                    total -= data.rowHeight
                }
            }
        }
        return total
    }
    return sum(min !== undefined ? min : 0, max !== undefined ? max : rows.len, (i) =>
        rowHeight(data, i),
    )
}

export function isLastRow(data: TableData, index: number) {
    return data.rows.len - 1 === index
}

export function stepRowIndex(data: TableData, index: number, step: number) {
    for (;;) {
        const r = row(data, index)
        if (r.hide) index += step
        else return index
    }
}

export function getMaxRowIndexHasValue(data: TableData) {
    let maxRow = 0
    data.cells.forEach((it) => {
        if (it && it[0] > maxRow) {
            maxRow = it[0]
        }
    })
    return maxRow
}
