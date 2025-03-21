import { CanvasRenderFuncType, CellSelect, FromHtmlFuncType, ToHtmlFuncType } from '.'
import { TextLineType, ViewportCell } from '..'
import Table from '../..'
import editor from '../../index.editor'
import { cellValueGetter } from '../cell-render'
import { fontString, textx, texty, textLine } from './text'

export const selectToHtml: ToHtmlFuncType = (t, c, row, col, _htmlStr) => {
    const cell = c as CellSelect
    return `options=${JSON.stringify(cell.options)} >${t.cellValueString(row, col)}</td>`
}

export const selectFromHtml: FromHtmlFuncType = (t, td, nstyle) => {
    let options = [] as string[]
    const go = td.getAttribute('options')
    if (go) {
        try {
            options = JSON.parse(go)
        } catch (e) {
            console.error(e)
        }
    }

    return { type: 'select', value: td.innerText, options }
}

export const selectCanvasRender: CanvasRenderFuncType = (
    canvas,
    c,
    rect,
    style,
    cellRenderer,
    formatter,
    type,
    text?: unknown,
) => {
    const cell = c as CellSelect

    if (!text) {
        text = cellValueGetter(cell, style, formatter)
    }

    const textValidator = () => {
        if (!text) return true
        return (cell.options || []).findIndex((it) => it === text) !== -1
    }

    const {
        fontSize,
        fontFamily,
        bold,
        italic,
        color,
        align,
        valign,
        underline,
        strikethrough,
        textwrap,
        padding,
    } = style

    canvas
        .save()
        .beginPath()
        .prop({
            textAlign: align,
            textBaseline: valign,
            font: fontString(fontFamily, fontSize, italic, bold),
            fillStyle: color,
        })

    const trangleLength = 8

    const [xp, yp] = padding || [5, 5]
    const tx = textx(align, rect.width, xp)
    const txts = (text as string).split('\n')
    const innerWidth = rect.width - xp * 2
    const ntxts: string[] = []
    txts.forEach((it) => {
        const txtWidth = canvas.measureTextWidth(it)
        if (textwrap && txtWidth > innerWidth) {
            let txtLine = { w: 0, len: 0, start: 0 }
            for (let i = 0; i < it.length; i += 1) {
                if (txtLine.w > innerWidth) {
                    ntxts.push(it.slice(txtLine.start, i))
                    txtLine = { w: 0, len: 0, start: i }
                }
                txtLine.len++
                txtLine.w += canvas.measureTextWidth(it[i]) + 1
            }
            if (txtLine.len > 0) {
                ntxts.push(it.slice(txtLine.start))
            }
        } else {
            ntxts.push(it)
        }
    })

    const fontHeight = fontSize / 0.75 // pt => px
    const txtHeight = (ntxts.length - 1) * fontHeight
    const lineTypes: TextLineType[] = []
    if (underline) lineTypes.push('underline')
    if (strikethrough) lineTypes.push('strikethrough')
    let ty = texty(valign, rect.height, txtHeight, fontHeight, yp)
    let contentWidth = 0
    const contentHeight = (ntxts.length > 0 ? ntxts.length : 1) * fontHeight

    ntxts.forEach((it) => {
        const txtWidth = canvas.measureTextWidth(it)
        contentWidth = Math.max(contentWidth, txtWidth)

        canvas.fillText(it, tx, ty)

        // draw trangle
        canvas.beginPath()
        computeTriganlePoint({ x: innerWidth, y: ty }, trangleLength, true).forEach(
            (point, index) => {
                if (index === 0) {
                    canvas.moveTo(point.x, point.y)
                } else {
                    canvas.lineTo(point.x, point.y)
                }
            },
        )
        canvas.closePath()
        if (textValidator()) {
            canvas._ctx.fillStyle = '#939495'
        } else {
            canvas._ctx.fillStyle = 'red'
        }
        canvas.fill()
        // canvas._ctx.lineWidth = 1
        // canvas.stroke()

        lineTypes.forEach((type) => {
            canvas._ctx.strokeStyle = color
            canvas.line(...textLine(type, align, valign, tx, ty, txtWidth, fontSize))
        })
        ty += fontHeight
    })

    canvas.restore()
    return {
        contentInfo: {
            width: contentWidth,
            height: contentHeight + 10,
        },
    }
}

/**
 * 根据中心和三角形边长计算 三角形顶点坐标
 * @param {*} centerPoint 三角形中心点
 * @param {*} sideLength 三角形的边长
 */
const computeTriganlePoint = (
    centerPoint: { x: number; y: number },
    sideLength = 10,
    reverse: boolean = false,
) => {
    // 计算三角形的顶点
    const angle = (2 * Math.PI) / 6 // 60度角的弧度值
    const point1 = {
        x: centerPoint.x,
        y: !reverse ? centerPoint.y - sideLength / 2 : centerPoint.y + sideLength / 2,
    }
    const point2 = {
        x: centerPoint.x - (sideLength * Math.sin(angle)) / 2,
        y: !reverse
            ? centerPoint.y + (sideLength * Math.cos(angle)) / 2
            : centerPoint.y - (sideLength * Math.cos(angle)) / 2,
    }
    const point3 = {
        x: centerPoint.x + (sideLength * Math.sin(angle)) / 2,
        y: !reverse
            ? centerPoint.y + (sideLength * Math.cos(angle)) / 2
            : centerPoint.y - (sideLength * Math.cos(angle)) / 2,
    }
    return [point1, point2, point3]
}

export const selectClickEvent = (
    table: Table,
    cell: CellSelect,
    vcell: ViewportCell,
    evt: MouseEvent,
) => {
    if (evt.clientX > vcell.x + (vcell.width - 15)) {
        setTimeout(() => {
            editor.reset(table)
        }, 0)
    }
}
