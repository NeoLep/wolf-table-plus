import dayjs from 'dayjs'
import type { Style } from '../table-renderer'
import type Cells from './cells'
import { Cell, CellText } from '../table-renderer/renders'

export type SupportFormats =
    | 'normal'
    | 'text'
    | 'number'
    | 'scientific'
    | 'percent'
    | 'CNY'
    | 'USD'
    | 'EUR'
    | 'YYYY-MM-DD'
    | 'HH:mm:ss'
    | 'YYYY-MM-DD HH:mm:ss'

function NumberToScientfic(number: number | string, power = 10, fix?: number) {
    if (number && typeof number === 'string') {
        if (number.toString().includes('e')) return number
        const value = Number(number)
        if (value.toString().includes('e')) return value.toString()
        const p = Math.floor(Math.log(Math.abs(value)) / Math.LN10)
        if (Math.abs(p) < power) return value.toString()
        let n: number | string = value * 10 ** -p
        if (fix !== undefined) {
            n = n.toFixed(fix)
        }
        return `${n}E+${p}`
    } else return ''
}

export const injectFormatters = (cells: Cells, _getStyle: (index: number) => Partial<Style>) => {
    cells.formatter((cell: Cell, style: Style, value: string, format?: SupportFormats) => {
        let transfered = false
        if (format === 'normal' || format === 'text' || !format || value === undefined) return value
        else if (format === 'number' && !Number.isNaN(Number(value))) {
            transfered = true
            let fixed = 2
            if ((cell as CellText).fixed !== undefined) {
                fixed = (cell as CellText).fixed!
            }
            value = Number(value).toFixed(fixed)
        } else if (format === 'scientific' && !Number.isNaN(Number(value))) {
            transfered = true
            let fixed = 2
            if ((cell as CellText).fixed !== undefined) {
                fixed = (cell as CellText).fixed!
            }
            value = NumberToScientfic(value, 10, fixed)
        } else if (value !== null && value !== '') {
            if (!Number.isNaN(Number(value))) {
                const formatter = new Intl.NumberFormat()
                if (format === 'percent') {
                    transfered = true
                    value = `${value}%`
                } else if (format === 'CNY') {
                    transfered = true
                    value = `¥${formatter.format(Number(value))}`
                } else if (format === 'EUR') {
                    transfered = true
                    value = `€${formatter.format(Number(value))}`
                } else if (format === 'USD') {
                    transfered = true
                    value = `$${formatter.format(Number(value))}`
                }
            }

            let rv: string | number = value
            if (!Number.isNaN(Number(value))) rv = Number(value)
            else {
                try {
                    rv = JSON.parse(value)
                } catch {
                    //
                }
            }

            if (format === 'YYYY-MM-DD HH:mm:ss') {
                transfered = true
                rv = dayjs(rv).format(format)
            } else if (format === 'YYYY-MM-DD') {
                transfered = true
                rv = dayjs(rv).format(format)
            } else if (format === 'HH:mm:ss') {
                transfered = true
                rv = dayjs(rv).format(format)
            }
            if (rv !== 'Invalid Date') {
                value = String(rv)
            }
        }

        /** like excel - auto set align to right [not support now] */
        // if (transfered) {
        //   if (
        //     (cell instanceof Object && cell.style === undefined) ||
        //     !(cell instanceof Object)
        //   ) {
        //     style.align = 'right'
        //   } else {
        //     if (!getStyle(cell.style!).align) {
        //       style.align = 'right'
        //     }
        //   }
        // }
        return value
    })
}
