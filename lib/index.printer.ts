import printjs from 'print-js'
import Dialog from './dialog'
import Table, { h } from '.'

export type PaperConf = {
    label?: string
    code: string
    size: [number, number] // mm
}
export const Papers: PaperConf[] = [
    { size: [215.9, 279.4], label: 'print.letter', code: 'letter' },
    { size: [279.4, 431.8], code: 'tabloid' },
    { size: [215.9, 355.6], label: 'print.legal', code: 'legal' },
    { size: [139.7, 215.9], code: 'statement' },
    { size: [184.1, 266.7], code: 'executive' },
    { size: [297, 420], code: 'A3' },
    { size: [210, 297], code: 'A4' },
    { size: [148, 210], code: 'A5' },
    { size: [257, 364], label: 'B4 (JIS)', code: 'B4' },
    { size: [182, 257], label: 'B5 (JIS)', code: 'B5' },
]

const firstWordToUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export default class Printer {
    papers = Papers.map((paper) => {
        return {
            ...paper,
            label: paper.label || firstWordToUpper(paper.code),
        }
    })
    currentPaper: (PaperConf & { sizePx: [number, number] }) | undefined

    MmPx: number = this.getPXEveryMM() // 每毫米的对应的像素值

    table: Table
    dialog: Dialog

    constructor(table: Table) {
        this.table = table

        this.dialog = new Dialog([], {
            width: 'fit-content',
            draggable: true,
            onBeforeClose: () => {
                console.log('onBeforeClose')
            },
        })
    }
    getPaperByCode(code: string) {
        let r = this.papers.find((paper) => paper.code === code)
        if (!r) {
            r = this.papers.find((paper) => paper.code === 'A4')
            console.error(`Paper ${code} not found`)
        }
        return {
            ...r,
            sizePx: [Math.floor(r!.size[0] * this.MmPx), Math.floor(r!.size[1] * this.MmPx)],
        } as typeof this.currentPaper
    }

    getPXEveryMM() {
        // 缓存每毫米的像素值
        const div = document.createElement('div')
        div.style.width = '1mm'
        document.body.appendChild(div)

        const { width } = div.getBoundingClientRect()
        const mm1 = Math.floor(width * 100) / 100 // 保留两位小数先向下取整
        div.remove()
        return mm1
    }

    print() {
        if (!this.currentPaper) {
            this.currentPaper = this.getPaperByCode('A4')!
        }

        // console.log(this.currentPaper)

        const area = 'A1:J40'
        // PDFJS
        // const container = document.createElement('div')
        // container.setAttribute('id', 'wp-print-container')
        // container.innerHTML = this.table.toHtml(area)
        // this.dialog.container._.innerHTML = ''
        // this.dialog.container.append(container)
        // this.dialog.show()
        // printjs({
        //     printable: 'wp-print-container',
        //     type: 'html',
        //     header: 'PrintJS - Form Element Selection',
        // })

        // NATIVE
        const iframe: any = document.createElement('IFRAME')
        iframe.setAttribute('id', 'print-iframe')
        this.dialog.container._.innerHTML = ''
        this.dialog.container.append(iframe)
        this.dialog.show()
        const doc = iframe.contentWindow.document
        doc.write(this.table.toHtml(area))
        const r = doc.querySelector('table')
        r.style.width = '1000px'
        doc.close()
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
        if (navigator.userAgent.indexOf('MSIE') > 0) {
            document.body.removeChild(iframe)
        }

        // TEST
        // const shadow = document.createElement('div')
        // shadow.innerHTML = this.table.toHtml(area)
        // document.body.appendChild(shadow)
        // 获取当前屏幕中 1mm 对应的像素值

        // console.log(this.table._i18n.currentLang(), this.papers)
    }
}
