import { equals } from '../helper'
import type { Style } from '../table-renderer'
import type { TableData } from '.'
import Table from '..'

export function addStyle(data: TableData, value: Partial<Style>, table?: Table): number {
    if (!data.styles) data.styles = []

    const usedStyleIndexes: Record<number, boolean> = {}
    if (table) {
        table._cells._.forEach((item) => {
            if (item) {
                const cell = item[2]
                if (cell instanceof Object && cell.style !== undefined) {
                    usedStyleIndexes[cell.style] = true
                }
            }
        })
    }

    // unused styles
    for (let i = 0; i < data.styles.length; i++) {
        if (!usedStyleIndexes[i]) {
            data.styles[i] = value
            return i
        }
    }
    // pushed
    return data.styles.push(value) - 1
}

export function updateStyle(data: TableData, index: number, style: Partial<Style>, table?: Table) {
    data.styles[index] = style
}

export function getStyle(t: TableData, index: number, withDefault = true): Partial<Style> {
    const style = t.styles[index]
    if (withDefault) {
        return Object.assign({}, t.style, t.styles[index] || {})
    }
    return style
}

export function clearStyles(t: TableData) {
    t.styles.length = 0
}
