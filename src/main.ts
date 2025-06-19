import './style.css'
import WolfTablePlus, { Renders } from '../lib'
import { Cell, CellBase, CellText } from '../lib/table-renderer/renders'
import { cellValueGetter } from '../lib/table-renderer/cell-render'
import { fontString, textLine, textx, texty } from '../lib/table-renderer/renders/text'
import { TextLineType } from '../lib/table-renderer'
import hotkeys from 'hotkeys-js'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="width: 100%; height: 100%" id="container">
  </div>
`

const dict: Record<string, string> = {
    CHN: '中国',
    USA: '美国',
    GER: '德国',
    FR: '法国',
}

Renders.use().registRender({
    type: 'datasource',
    toHtml: (t, cell, row, col, htmlStr) => {
        return `>${t.cellValueString(row, col)}</td>`
    },
    fromHtml: (t, td, nstyle) => {
        const text = td.innerHTML
            .replace(/<br(\/){0,1}>/gi, '\n')
            .replace(/(<([^>]+)>|)/gi, '')
            .replace('&nbsp;', ' ')
        // console.log('text: ', td.innerHTML);
        const cell = { type: 'datasource' } as Cell
        if (Object.keys(nstyle).length > 0) {
            ;(cell! as CellBase).style = t.addStyle(nstyle)
        }
        if (text !== null && !/^\s*$/.test(text)) {
            ;(cell! as CellText).value = text
        }
        return cell
    },
    toCanvas: (canvas, cell, rect, style, cellRenderer, formatter, type) => {
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

        const value = cellValueGetter(cell, style, formatter)
        const text = dict[value] || value
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
            lineTypes.forEach((type) => {
                canvas._ctx.strokeStyle = color
                canvas.line(...textLine(type, align, valign, tx, ty, txtWidth, fontSize))
            })
            ty += fontHeight
        })

        /** draw identify line */
        canvas.beginPath()
        canvas.lineTo(rect.width, rect.height - 6)
        canvas.lineTo(rect.width, rect.height)
        canvas.lineTo(rect.width - 6, rect.height)
        canvas.closePath()
        canvas._ctx.fillStyle = '#409eff'
        canvas._ctx.fill()
        // canvas.line(rect.x + rect.width, rect.y, rect.x + rect.width, rect.y + rect.height)
        /** draw done */

        canvas.restore()
        return {
            contentInfo: {
                width: contentWidth,
                height: contentHeight + 10,
            },
        }
    },
})

const container = document.querySelector('#container') as HTMLElement

const init = () => {
    if (!container) return
    const wt = WolfTablePlus.create(
        container,
        () => container.clientWidth,
        () => container.clientHeight,
        {
            scrollable: true,
            resizable: true,
            selectable: true,
            editable: true,
            copyable: true,
            data: {
                // cols: 30,
                // rows: 103,
            },
        },
    )
        .changeLang('zh')
        .render()

    // 动态控制隐藏的右键菜单选项
    // wt._contextMenu.hiddenOption = ['undo', 'redo']
    wt._contextMenu.appendOption({ type: 'div' })
    wt._contextMenu.appendOption({
        id: 'EXTRA',
        label: '补充菜单项',
        action: (evt, table) => {
            console.log('set extra zone')
        },
    })

    wt._emitter.on('selectorMove', ([row, col]: [number, number]) => {
        const cell = wt.cell(row, col)
    })

    // const si = wt.addStyle({
    //     bold: true,
    //     italic: true,
    //     underline: true,
    //     color: 'red',
    // })

    const d = localStorage.getItem('wtData')
    if (d) {
        wt.data(JSON.parse(d)).render()
    }

    // wt.cell(0, 0, 'A1')
    // wt.cell(9, 4, 'E10')
    //     .cell(2, 2, { type: 'select', value: 'CHN', options: ['CHN', 'USA"', 'BRA'] })
    //     .cell(2, 3, { type: 'select', value: 'CHN', options: ['A', 'B', 'C'] })
    //     .render()
    //     .cell(2, 3, { type: 'datasource', value: 'USA' })
    //     .render()

    hotkeys('ctrl+s', () => {
        localStorage.setItem('wtData', JSON.stringify(wt.data()))
    })
}

init()
