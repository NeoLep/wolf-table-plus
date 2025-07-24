import { equals } from '../helper'
import type Table from '..'
import type { Style } from '../table-renderer'
import type { TableData } from '.'

export function addStyle(data: TableData, value: Partial<Style>, table?: Table): number {
    if (!data.styles) data.styles = []
    const usedStyleIndexes: Record<number, boolean> = {}
    if (table) {
        for (const item of data.cells) {
            if (item) {
                const cell = item[2]
                if (cell instanceof Object && cell.style !== undefined) {
                    const style = data.styles[cell.style]
                    if (equals(style, value)) {
                        return cell.style
                    }
                    usedStyleIndexes[cell.style] = true
                }
            }
        }
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
    let indexCount = 0
    const oStyle = JSON.parse(JSON.stringify(data.styles[index]))
    const newStyle = { ...oStyle, ...style }

    for (const style of data.styles) {
        if (equals(style, newStyle)) {
            return data.styles.indexOf(style)
        }
    }

    for (const item of data.cells) {
        if (!item) continue
        const cell = item[2]
        if (cell instanceof Object && cell.style === index) {
            indexCount++
            if (indexCount > 1) {
                break
            }
        }
    }

    // 当一个样式有多个相同引用时，需要拷贝出新的样式覆盖
    if (indexCount > 1) {
        // console.log('add Style')
        return addStyle(data, newStyle, table)
    } else {
        // 当只有一个引用时，直接覆盖
        // console.log('update Style')
        data.styles[index] = style
        return index
    }
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
