import Renders, { Cell, cellTypeGetter } from './renders'
import type { SupportFormats } from '../data/format'
import type Canvas from './canvas'
import type { Style, Rect, BorderLineStyle, Formatter, CellRenderer, BorderLine } from '.'

export function cellBorderRender(
    canvas: Canvas,
    rect: Rect,
    borderLine: BorderLine | [BorderLineStyle, string],
    autoAlign = false,
) {
    let top, right, bottom, left
    if (Array.isArray(borderLine)) {
        top = right = bottom = left = borderLine
    } else {
        ;({ top, right, bottom, left } = borderLine)
    }

    canvas.save().beginPath().translate(rect.x, rect.y)
    const lineRects = (index: number, offset: number): [number, number, number, number] => {
        const array: [number, number, number, number][] = [
            [0 - offset, 0, rect.width + offset, 0],
            [rect.width, 0, rect.width, rect.height],
            [0 - offset, rect.height, rect.width + offset, rect.height],
            [0, 0, 0, rect.height],
        ]
        return array[index]
    }

    ;[top, right, bottom, left].forEach((it, index) => {
        if (it) {
            let lineDash: number[] = []
            let lineWidth = 1
            if (it[0] === 'thick') {
                lineWidth = 3
            } else if (it[0] === 'medium') {
                lineWidth = 2
            } else if (it[0] === 'dotted') {
                lineDash = [1, 1]
            } else if (it[0] === 'dashed') {
                lineDash = [2, 2]
            }
            let offset = 0
            if (autoAlign) {
                offset = lineWidth / 2
            }

            let lineRectsArr: [number, number, number, number]
            if (lineWidth === 1) {
                lineRectsArr = lineRects(index, offset).map(
                    (n) => (n += 0.5),
                ) as typeof lineRectsArr
            } else {
                lineRectsArr = lineRects(index, offset)
            }
            canvas
                .prop({ strokeStyle: it[1], lineWidth })
                .setLineDash(lineDash)
                .line(...lineRectsArr)
        }
    })
    canvas.restore()
}

export function cellValueGetter(cell: Cell, style: Style, formatter: Formatter): string {
    let text = ''
    const cellType = cellTypeGetter(cell)
    if (cell) {
        if (cellType === 'text') {
            if (cell instanceof Object) {
                text = formatter(
                    cell,
                    style,
                    `${(cell as any)?.value || ''}`,
                    cell?.format as SupportFormats | undefined,
                )
            } else {
                text = formatter(cell, style, `${cell || ''}`)
            }
        } else {
            if (cell instanceof Object) {
                text = cell.value ? String(cell.value) : ''
            }
        }
    }
    return text
}

// canvas: Canvas2d
// style:
export function cellRender(
    canvas: Canvas,
    cell: Cell,
    rect: Rect,
    style: Style,
    cellRenderer: CellRenderer | undefined,
    formatter: Formatter,
    type: 'body' | 'row-header' | 'col-header',
) {
    const cellType = cellTypeGetter(cell)

    canvas.save().beginPath().translate(rect.x, rect.y) // at first move to (left, top)
    canvas.rect(0, 0, rect.width, rect.height).clip() // clip

    if (style.bgcolor) canvas.prop('fillStyle', style.bgcolor).fill() // fill bg
    if (style.rotate && style.rotate > 0) {
        canvas.rotate(style.rotate * (Math.PI / 180)) // rotate
    }
    if (cellRenderer !== undefined) {
        canvas.save()
        if (!cellRenderer(canvas, rect, cell, cellValueGetter(cell, style, formatter))) {
            canvas.restore()
            return
        }
        canvas.restore()
    }

    // active render to canvas
    const res = Renders.use()
        .getRender(cellType)
        .toCanvas(canvas, cell, rect, style, cellRenderer, formatter, type)

    canvas.restore()

    return res
}

export default {}
