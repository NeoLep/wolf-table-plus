import { Range } from '../table-renderer'
import type { Border } from '../table-renderer'
import type { TableData } from '.'

export function addBorder(t: TableData, value: Border) {
    if (!t.borders) t.borders = []
    const borderRange = Range.with(value[0])
    const { borders } = t
    for (let i = 0; i < borders.length; i += 1) {
        const [it, ...others] = borders[i]
        const itRange = Range.with(it)
        // console.log(
        //   'value:',
        //   value,
        //   'it',
        //   it,
        //   'borders',
        //   t.borders,
        //   'new area in it',
        //   itRange.within(borderRange),
        //   'intersects',
        //   itRange.intersects(borderRange)
        // )
        if (itRange.intersects(borderRange)) {
            if (!itRange.within(borderRange)) {
                borders.push(value)
                itRange.difference(borderRange).forEach((r1) => {
                    borders.push([r1.toString(), ...others])
                })
            } else {
                // bug fix
                borders.push(value)
            }
            borders.splice(i, 1)
            return
        } else if (
            others.every((it, index: number) => it === value[index + 1]) &&
            itRange.touches(borderRange)
        ) {
            borders[i][0] = itRange.union(borderRange).toString()
            return
        }
    }
    borders.push(value)
}

export function clearBorder(t: TableData, ref: string) {
    const { borders } = t
    if (borders) {
        const addBorders: Border[] = []
        const target = Range.with(ref)
        for (let i = 0; i < borders.length; i += 1) {
            const [it, ...others] = borders[i]
            const itRange = Range.with(it)
            if (itRange.intersects(target)) {
                if (!itRange.within(target)) {
                    // merge
                    itRange.difference(target).forEach((r1) => {
                        addBorders.push([r1.toString(), ...others])
                    })
                }
                borders.splice(i, 1)
                i -= 1
            }
        }
        borders.push(...addBorders)
    }
}

export function clearBorders(t: TableData) {
    t.borders.length = 0
}
