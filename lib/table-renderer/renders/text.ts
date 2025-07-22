import { cellValueGetter } from '../cell-render'
import type {
    CanvasRenderFuncType,
    Cell,
    CellBase,
    CellText,
    FromHtmlFuncType,
    ToHtmlFuncType,
} from '.'
import type { Align, TextLineType, VerticalAlign } from '..'
import Editor from '../../editor'
import TextEditor from '../../editor/text'
import { pt2px } from '../../helper'

// align: top | middle | bottom
// height: the height of cell
// txtHeight: the height of text
// padding: the padding of cell
export function texty(
    align: VerticalAlign,
    height: number,
    txtHeight: number,
    fontHeight: number,
    padding: number,
) {
    switch (align) {
        case 'top':
            return padding
        case 'middle': {
            const y = height / 2 - txtHeight / 2
            const minHeight = fontHeight / 2 + padding
            return y < minHeight ? minHeight : y
        }
        case 'bottom':
            return height - padding - txtHeight
        default:
            return 0
    }
}

// type: underline | strike
// align: left | center | right
// valign: top | middle | bottom
export function textLine(
    type: TextLineType,
    align: Align,
    valign: VerticalAlign,
    x: number,
    y: number,
    w: number,
    h: number,
): [number, number, number, number] {
    // y
    let ty = 0
    if (type === 'underline') {
        if (valign === 'top') {
            ty = -h
        } else if (valign === 'middle') {
            ty = -h / 2
        }
    } else if (type === 'strikethrough') {
        if (valign === 'top') {
            ty = -h / 2
        } else if (valign === 'bottom') {
            ty = h / 2
        }
    }
    // x
    let tx = 0
    if (align === 'center') {
        tx = w / 2
    } else if (align === 'right') {
        tx = w
    }
    return [x - tx, y - ty, x - tx + w, y - ty]
}

// align: left | center | right
// width: the width of cell
// padding: the padding of cell
export function textx(align: Align, width: number, padding: number) {
    switch (align) {
        case 'left':
            return padding
        case 'center':
            return width / 2
        case 'right':
            return width - padding
        default:
            return 0
    }
}

export function fontString(family: string, size: number, italic: boolean, bold: boolean) {
    if (family && size) {
        let font = ''
        if (italic) font += 'italic '
        if (bold) font += 'bold '
        return `${font} ${size}pt ${family}`
    }
    return undefined
}

export const textCanvasRender: CanvasRenderFuncType = (
    canvas,
    cell,
    rect,
    style,
    cellRenderer,
    formatter,
    type,
    text?: unknown,
) => {
    if (!text) {
        text = cellValueGetter(cell, style, formatter)
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

    const fontHeight = pt2px(fontSize) // pt => px
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
        lineTypes.forEach((type) => {
            canvas._ctx.strokeStyle = color
            canvas.line(...textLine(type, align, valign, tx, ty, txtWidth, fontSize))
        })
        ty += fontHeight
    })
    canvas.restore()
    return {
        contentInfo: {
            width: Math.ceil(contentWidth),
            height: Math.ceil(contentHeight + 10),
        },
    }
}

export const textToHtml: ToHtmlFuncType = (t, _cell, row, col, _htmlStr) => {
    return `>${t.cellValueString(row, col)}</td>`
}

export const textFromHtml: FromHtmlFuncType = (t, td, nstyle) => {
    const text = td.innerHTML
        .replace(/<br(\/){0,1}>/gi, '\n')
        .replace(/(<([^>]+)>|)/gi, '')
        .replace('&nbsp;', ' ')
    // console.log('text: ', td.innerHTML);
    const cell = {} as Cell
    if (Object.keys(nstyle).length > 0) {
        ;(cell! as CellBase).style = t.addStyle(nstyle)
    }
    if (text !== null && !/^\s*$/.test(text)) {
        ;(cell! as CellText).value = text
    }
    return cell
}

export const textEditor = TextEditor
