import type { SupportFormats } from './format'
import type { Formatter } from '../table-renderer'
import type { IndexDataCell, DataCell, TableData, FormulaParser, DataCellValue } from '.'
import { CellText } from '../table-renderer/renders'

export default class Cells {
    _: IndexDataCell[] = []
    _indexes = new Map()
    _formulas: number[] = []
    _formulaParser: FormulaParser = (v) => v
    _formatter: Formatter = (_c, _s, v) => v
    _releasedIndexs: number[] = []

    constructor() {
        //
    }

    formulaParser(v: FormulaParser) {
        this._formulaParser = v
        return this
    }

    formatter(v: Formatter) {
        this._formatter = v
        return this
    }

    load({ cells }: TableData) {
        if (cells) {
            this._ = cells
            this.resetIndexes()
        }
    }

    get(row: number, col: number): IndexDataCell | null {
        const { _indexes } = this
        if (_indexes.has(row)) {
            const index = _indexes.get(row).get(col)
            if (index !== undefined) {
                return this._[index]
            }
            return null
        }
        return null
    }

    removeValue(row: number, col: number) {
        const { _indexes } = this
        if (_indexes.has(row)) {
            const rowIndexes = _indexes.get(row)
            const index = rowIndexes.get(col)
            if (index !== undefined && this._[index]) {
                if (typeof this._[index]![2] === 'object') {
                    ;(this._[index]![2]! as CellText).value = undefined
                } else {
                    this.remove(row, col)
                }
            }
        }
        return this
    }

    remove(row: number, col: number) {
        const { _indexes } = this
        if (_indexes.has(row)) {
            const rowIndexes = _indexes.get(row)
            const index = rowIndexes.get(col)
            if (index !== undefined) {
                // this._.splice(index, 1);
                this._[index] = null
                if (!this._releasedIndexs.includes(index)) {
                    this._releasedIndexs.push(index)
                }
                rowIndexes.delete(col)
            }
        }
        return this
    }

    set(row: number, col: number, cell: DataCell) {
        const oldData = this.get(row, col)
        if (oldData == null) {
            if (cell !== null && cell !== undefined) {
                const index = this._.push([row, col, cell]) - 1
                this.updateIndex(row, col, index)
                this.addFormula(cell, index)
            }
        } else {
            const old = oldData[2]
            const ovalStr = cellValueString(old)
            const nvalStr = cellValueString(cell)
            // if (nvalStr === '') {
            //     // delete
            //     if (old instanceof Object && Object.keys(old).length > 1) {
            //         delete old.value
            //     } else {
            //         this.remove(row, col)
            //     }
            //     this.resetFormulas()
            // } else {
            // update
            if (old instanceof Object) {
                Object.assign(old, cell instanceof Object ? cell : { value: cell })
            } else {
                oldData[2] = cell
            }
            if (nvalStr !== ovalStr) {
                this.resetFormulas()
            }
            // }
        }
    }

    setFormat(row: number, col: number, format: SupportFormats) {
        const data = this.get(row, col)
        const cell = data ? data[2] : null
        if (cell === null) {
            this.set(row, col, { format } as CellText)
        } else if (typeof cell === 'object') {
            this.set(row, col, { ...cell, format })
        } else {
            this.set(row, col, { value: cell || '', format } as CellText)
        }
    }

    fixed(row: number, col: number): number
    fixed(row: number, col: number, type: 'increase' | 'reduce'): void
    fixed(row: number, col: number, fix: number): void
    fixed(row: number, col: number, arg?: 'increase' | 'reduce' | number) {
        const data = this.get(row, col)
        const cell = data ? data[2] : null
        let fixed = 2
        if ((cell as CellText)?.fixed !== undefined) {
            fixed = (cell as CellText).fixed!
            if (fixed < 0) fixed = 0
        }

        if (!arg) {
            return fixed
        } else {
            if (typeof arg === 'number') {
                if (arg >= 0) {
                    fixed = arg
                } else {
                    console.warn("fixed can't less than zero")
                }
            } else if (typeof arg === 'string') {
                if (arg === 'increase') {
                    fixed++
                } else if (arg === 'reduce') {
                    if (fixed > 0) fixed--
                }
            }
            if (cell === null) {
                this.set(row, col, { fixed } as CellText)
            } else if (typeof cell === 'object') {
                this.set(row, col, { ...cell, fixed })
            } else {
                this.set(row, col, { value: cell || '', fixed } as CellText)
            }
        }
    }

    resetIndexes() {
        const { _ } = this
        this._indexes = new Map() // 针对历史记录进行修复 - 重构 Indexes
        for (const [i, item] of _.entries()) {
            if (item) {
                const [r, c, cell] = item
                this.updateIndex(r, c, i)
                this.addFormula(cell, i)
            }
        }
    }

    private updateIndex(row: number, col: number, index: number) {
        const { _indexes } = this
        if (!_indexes.has(row)) {
            _indexes.set(row, new Map())
        }
        _indexes.get(row).set(col, index)
    }

    private addFormula(cell: DataCell, index: number) {
        if (cell instanceof Object && cell.formula) {
            cell.value = String(this._formulaParser(cell.formula))
            this._formulas.push(index)
        }
    }

    private resetFormulas() {
        this._formulas.forEach((index) => {
            if (this._[index]) {
                const cell = this._[index]![2]
                if (cell instanceof Object && cell.formula) {
                    cell.value = String(this._formulaParser(cell.formula))
                }
            }
        })
    }
}

export function cellValue(cell: DataCell): DataCellValue {
    return (cell instanceof Object ? cell.value : cell) as DataCellValue
}

export function cellValueString(cell: DataCell): string {
    const v = cellValue(cell)
    return `${v !== null && v !== undefined ? v : ''}`
}
