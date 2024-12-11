import { cellValueGetter } from '../cell-render'
import { textCanvasRender } from './text'
import type { CanvasRenderFuncType, FromHtmlFuncType, ToHtmlFuncType } from '.'
import type { Cell, CellImages, CellText } from '.'
import Store from '../../store'

export const imageCanvasRender: CanvasRenderFuncType = (
    canvas,
    cell,
    rect,
    style,
    cellRenderer,
    formatter,
) => {
    const text = cellValueGetter(cell, style, formatter)
    if (text) {
        const image = new Image(rect.width, rect.height)
        if ((cell as CellImages).valueType === 'local') {
            image.src = Store.use().getPicture(text)
        } else {
            image.src = text
        }
        image.addEventListener('load', () => {
            canvas.save().beginPath().prop({})
            const tx = rect.x + 60
            const ty = rect.y + 23
            canvas._ctx.drawImage(image, tx, ty, rect.width, rect.height)
            canvas.restore()
        })
        image.addEventListener('error', () => {
            canvas.save().beginPath().prop({})
            canvas._ctx.fillStyle = 'red'
            canvas.fillText(
                'X [PIC Load Error]',
                rect.x + rect.width / 2 + 20,
                rect.y + rect.height / 2 + 30,
            )
            canvas.restore()
        })
    } else {
        textCanvasRender(
            canvas,
            cell,
            rect,
            { ...style, color: 'red', fontSize: 8 },
            cellRenderer,
            formatter,

            'body',
            'X [PIC Not Set]',
        )
    }
}

export const imageToHtml: ToHtmlFuncType = (t, cell, row, col, htmlStr): string => {
    if (cell instanceof Object && cell.type === 'image') {
        let src = cell.value
        if ((cell as CellImages).valueType === 'local') src = Store.use().getPicture(src || '')
        return `> <img src="${src}" md5="${(cell as CellImages).valueType === 'local' ? cell.value : ''}" value-type="${(cell as CellImages).valueType}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" /> </td>`
    } else {
        return `${(cell as CellText)?.value || JSON.stringify(cell)} </td>`
    }
}

export const imageFromHtml: FromHtmlFuncType = (t, td, nstyle) => {
    const imgE = td.querySelector('img')
    const cell: Cell = { type: 'image', valueType: 'url', value: '' }
    if (imgE && imgE.getAttribute('src')) {
        cell.value = imgE.getAttribute('src')!
    }
    if (imgE && imgE.getAttribute('value-type')) {
        cell.valueType = imgE.getAttribute('value-type')! as CellImages['valueType']
        cell.value = imgE.getAttribute('md5') || ''
    }
    return cell
}
