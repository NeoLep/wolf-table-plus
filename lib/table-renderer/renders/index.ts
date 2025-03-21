import { imageCanvasRender, imageToHtml, imageFromHtml } from './image'
import { textToHtml, textCanvasRender, textFromHtml, textEditor } from './text'
import type Table from '../..'
import type { Rect, Style, CellRenderer, Formatter, ViewportCell } from '..'
import type Canvas from '../canvas'
import { SupportFormats } from '../../data/format'
import Editor from '../../editor'
import SelectEditor from '../../editor/select'
import { selectCanvasRender, selectClickEvent, selectFromHtml, selectToHtml } from './select'

export type CellType = 'text' | 'image' | string
export type CellBase = {
    type: CellType
    style?: number
    format?: SupportFormats
    fixed?: number
    formula?: string
    value?: string
}
export type CellText = CellBase & {
    type?: 'text'
    [property: string]: unknown
}
export type CellSelect = CellBase & {
    type: 'select'
    options: string[]
}
export type CellImages = CellBase & {
    type: 'image'
    valueType: 'url' | 'base64' | 'local'
}
export type CellExtends = CellBase & unknown

export type Cell =
    | CellText
    | CellSelect
    | CellImages
    | CellExtends
    | string
    | number
    | null
    | undefined

export type ToHtmlFuncType = (
    t: Table,
    cell: Cell,
    row: number,
    col: number,
    htmlStr: string,
) => string

export type CanvasRenderFuncType = (
    canvas: Canvas,
    cell: Cell,
    rect: Rect,
    style: Style,
    cellRenderer: CellRenderer | undefined,
    formatter: Formatter,
    type: 'body' | 'row-header' | 'col-header',
    ...args: unknown[]
) => { contentInfo: { width: number; height: number } } | void

export type FromHtmlFuncType = (t: Table, td: HTMLElement, nstyle: Partial<Style>) => Cell

export const cellTypeGetter = (cell: Cell): CellType => {
    if (cell instanceof Object && cell.type) {
        if (cell.type in Renders.use().options) {
            return cell.type
        }
        return 'text'
    } else {
        return 'text'
    }
}

export type RenderOptionItem = {
    type: CellType
    disableAutoFillAction?: boolean
    toHtml: ToHtmlFuncType
    fromHtml: FromHtmlFuncType
    toCanvas: CanvasRenderFuncType
    editor?: () => unknown
    clickEvent?: (table: Table, cell: any, vcell: ViewportCell, evt: MouseEvent) => void
}

export const BaseRenders: RenderOptionItem[] = [
    {
        type: 'text',
        toHtml: textToHtml,
        fromHtml: textFromHtml,
        toCanvas: textCanvasRender,
        editor: () => new textEditor(),
    },
    {
        type: 'select',
        toHtml: selectToHtml,
        fromHtml: selectFromHtml,
        toCanvas: selectCanvasRender,
        editor: () => new SelectEditor(),
        clickEvent: selectClickEvent,
    },
    {
        type: 'image',
        disableAutoFillAction: true,
        toHtml: imageToHtml,
        toCanvas: imageCanvasRender,
        fromHtml: imageFromHtml,
    },
]
export default class Renders {
    static #instance: Renders
    static use() {
        if (!this.#instance) this.#instance = new Renders()
        return this.#instance
    }

    options: Record<CellType, RenderOptionItem> = {}
    loadBaseRender() {
        BaseRenders.forEach((option) => {
            this.options[option.type] = option
        })
    }

    constructor() {
        this.loadBaseRender()
    }

    getRender(type: string) {
        if (!this.options[type]) {
            type = 'text'
            console.error('not support this type: ' + type)
        }
        return this.options[type]
    }
    registRender(render: RenderOptionItem) {
        this.options[render.type] = render
    }
    deleteRender(name: string) {
        if (this.options[name]) {
            delete this.options[name]
        }
    }
}
