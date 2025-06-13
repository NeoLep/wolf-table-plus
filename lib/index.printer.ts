import printjs from 'print-js'
import Dialog from './dialog'
import Table, { h } from '.'
import Button from './button'
import Form, { FormItemInput, FormItemSelect } from './form'

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
        this.dialog.containerHeader.hide()
        this.dialog.containerFooter.hide()
        this.dialog.container.css('padding', '0')
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

    renderPapaer() {
        this.dialog.updateConfig({
            title: this.currentPaper?.label || '',
            width: '80vw',
            height: '90vh',
        })
        this.dialog.containerBody.css('height', '100%')

        const form = new Form(
            {
                fields: [
                    {
                        label: '纸张尺寸',
                        prop: 'paper',
                        component: (() => {
                            const comp = new FormItemSelect('', {
                                placeholder: '请选择纸张尺寸',
                                clearable: true,
                                options: this.papers.map((paper) => ({
                                    label: this.table._i18n.t(paper.label) || paper.code,
                                    value: paper.code,
                                })),
                            })

                            comp.on('change', (value: string) => {
                                renderAreaFunc(value)
                            })
                            return comp
                        })(),
                    },
                ],
            },
            { paper: this.currentPaper?.code },
        )._.setStyles({
            padding: '10px',
            flex: 1,
        })
        const printButton = new Button(this.table._i18n.t('printSheet'), 'primary')
        const cancelButton = new Button(this.table._i18n.t('common.cancel'), 'default')
        cancelButton._.css('margin-right', '10px')
        const confArea = h('div')
            .setStyles({
                width: '250px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            })
            .append(
                form._,
                h('div')
                    .setStyles({ display: 'flex', flexDirection: 'row-reverse', padding: '10px' })
                    .append(printButton._, cancelButton._),
            )

        const renderArea = h('div').css({
            height: '100%',
            flex: 1,
            background: '#dadce0',
            overflow: 'auto',
            paddingTop: '20px',
            boxSizing: 'border-box',
        })
        const renderAreaFunc = (paper?: string) => {
            const r = paper ? this.getPaperByCode(paper) : undefined
            if (r) {
                this.currentPaper = r
            }
            if (!this.currentPaper) return

            renderArea._.innerHTML = ''

            const [paperWidthPx, paperHeightPx] = this.currentPaper.sizePx
            console.log([paperWidthPx, paperHeightPx])
            const paperDom = h('div').setStyles({
                width: `${paperWidthPx}px`,
                height: `${paperHeightPx}px`,
                background: '#fff',
                margin: '0 auto 20px',
                padding: '20px',
                boxSizing: 'border-box',
            })
            paperDom._.innerHTML = this.table.toHtml('A1:J40')
            renderArea.append(paperDom)
        }

        renderAreaFunc()

        const container = h('div')
            .css('height', '100%')
            .css('display', 'flex')
            .append(renderArea, confArea)
        this.dialog.containerBody._.innerHTML = ''
        this.dialog.containerBody.append(container)

        this.dialog.show()
    }

    print() {
        if (!this.currentPaper) {
            this.currentPaper = this.getPaperByCode('A4')!
        }

        this.renderPapaer()

        // console.log(this.currentPaper)

        // const area = 'A1:J40'
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
        // const iframe: any = document.createElement('IFRAME')
        // iframe.setAttribute('id', 'print-iframe')
        // this.dialog.container._.innerHTML = ''
        // this.dialog.container.append(iframe)
        // this.dialog.show()
        // const doc = iframe.contentWindow.document
        // doc.write(this.table.toHtml(area))
        // const r = doc.querySelector('table')
        // doc.close()
        // iframe.contentWindow.focus()
        // iframe.contentWindow.print()
        // if (navigator.userAgent.indexOf('MSIE') > 0) {
        //     document.body.removeChild(iframe)
        // }

        // TEST
        // const shadow = document.createElement('div')
        // shadow.innerHTML = this.table.toHtml(area)
        // document.body.appendChild(shadow)
        // 获取当前屏幕中 1mm 对应的像素值

        // console.log(this.table._i18n.currentLang(), this.papers)
    }
}
