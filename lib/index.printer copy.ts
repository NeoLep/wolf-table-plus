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

    // MmPx: number = this.getPXEveryMM() // 每毫米的对应的像素值
    dpi = this.getDeviceDPI()

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
            sizePx: [this.transferMMToPX(r!.size[0]), this.transferMMToPX(r!.size[1])],
        } as typeof this.currentPaper
    }
    getDeviceDPI() {
        const tempDiv = document.createElement('div')
        tempDiv.style.width = '1in'
        tempDiv.style.visibility = 'hidden'
        document.body.appendChild(tempDiv)
        const dpi = tempDiv.offsetWidth
        document.body.removeChild(tempDiv)
        return dpi
    }
    transferMMToPX(mm: number) {
        return Math.ceil((mm * this.dpi) / 25.4)
    }
    transferPXToMM(px: number) {
        return (px * 25.4) / this.dpi
    }
    renderPapaer() {
        this.dialog.updateConfig({
            title: this.currentPaper?.label || '',
            width: '80vw',
            height: '90vh',
        })
        this.dialog.containerBody.css('height', '100%')

        const formValue = {
            paper: this.currentPaper?.code,
            padding: 10,
            direction: 'portrait' as 'portrait' | 'landscape',
        }
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
                                content = renderAreaFunc(value)
                            })
                            return comp
                        })(),
                    },
                    {
                        label: '方向',
                        prop: 'direction',
                        component: (() => {
                            const comp = new FormItemSelect('', {
                                placeholder: '请选择方向',
                                clearable: true,
                                options: [
                                    {
                                        label: '纵向',
                                        value: 'portrait',
                                    },
                                    {
                                        label: '横向',
                                        value: 'landscape',
                                    },
                                ],
                            })

                            comp.on('change', (value: 'portrait' | 'landscape') => {
                                formValue.direction = value
                                content = renderAreaFunc()
                            })
                            return comp
                        })(),
                    },
                ],
            },
            formValue,
        )
        form._.setStyles({
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
            console.log(this.currentPaper)
            if (!this.currentPaper) return

            renderArea._.innerHTML = ''

            let paperWidthPx, paperHeightPx
            if (formValue.direction === 'landscape') {
                ;[paperHeightPx, paperWidthPx] = this.currentPaper.sizePx
            } else {
                ;[paperWidthPx, paperHeightPx] = this.currentPaper.sizePx
            }

            const padding = this.transferMMToPX(form.getValue().padding ?? 10) // mm => px

            console.log([paperWidthPx, paperHeightPx])

            const paperDom = h('div').setStyles({
                width: `${paperWidthPx}px`,
                height: `${paperHeightPx}px`,
                background: '#fff',
                margin: '0 auto 20px',
                padding: `${padding}px`,
                overflow: 'hidden',
            })

            const getContent = () => {
                // paper
                const innerWidth = Number(paperWidthPx.toFixed(2))
                const innerHeight = Number(paperHeightPx.toFixed(2))

                const parser = new DOMParser()
                const doc = parser.parseFromString(this.table.toHtml('A1:J50'), 'text/html')
                const tableElement = doc.body.firstChild as HTMLElement

                // iterater table

                const colWidths: number[][] = []
                const pages: HTMLElement[][] = []
                // get every col width
                const tdWidthArr: number[] = []
                tableElement.querySelectorAll('colgroup col').forEach((item: Element) => {
                    const width = Number(item.getAttribute('width'))
                    tdWidthArr.push(!Number.isNaN(width) ? width : 100)
                })

                // each tr
                const trDoms = tableElement.querySelectorAll('tr')
                let currentInsertIndex = 0

                let reduceHeight = innerHeight
                let rowOffset = 0
                trDoms.forEach((tr, rowIndex) => {
                    let currentInsertIndex2 = 0
                    const trHeight = Number(tr.style.height.replaceAll('px', ''))
                    if (reduceHeight < trHeight) {
                        rowOffset = rowIndex
                        currentInsertIndex++
                        reduceHeight = innerHeight
                    }

                    if (!pages[currentInsertIndex]) pages[currentInsertIndex] = []

                    const tdDoms = tr.querySelectorAll('td')
                    let reduceWidth = innerWidth
                    let colOffset = 0
                    tdDoms.forEach((td, colIndex) => {
                        console.log(colIndex, colOffset)
                        const tdWidth = tdWidthArr[colIndex]
                        if (!colWidths[currentInsertIndex])
                            if (reduceWidth < tdWidth) {
                                const oldTable = pages[currentInsertIndex][currentInsertIndex2]
                                if (oldTable) {
                                    oldTable.style.width = `${innerWidth - reduceWidth}px`
                                    reduceWidth = innerWidth
                                }
                                colOffset = colIndex
                                currentInsertIndex2++
                            }

                        // td.style.width = `${tdWidth}px`

                        let currTable = pages[currentInsertIndex][currentInsertIndex2]
                        if (!currTable) {
                            currTable = document.createElement('table')
                            currTable.style.borderSpacing = '0'
                            currTable.style.borderCollapse = 'collapse'
                            pages[currentInsertIndex][currentInsertIndex2] = currTable
                        }

                        if (colIndex === tdDoms.length - 1) {
                            currTable.style.width = `${innerWidth - reduceWidth}px`
                        }

                        let tbody = currTable.querySelector('tbody')
                        if (!tbody) {
                            tbody = document.createElement('tbody')
                            currTable.appendChild(tbody)
                        }

                        let currTr = tbody.querySelectorAll('tr')[rowIndex - rowOffset]
                        if (!currTr) {
                            currTr = tr.cloneNode() as HTMLTableRowElement
                            tbody.appendChild(currTr)
                        }

                        currTr.appendChild(td.cloneNode(true))
                        reduceWidth -= tdWidth
                    })

                    reduceHeight -= trHeight
                })

                const allPages = document.createElement('div')
                pages.flat().forEach((table) => {
                    const paper = paperDom.cloneNode() as HTMLElement
                    paper.className = 'paper'
                    paper.style.position = 'relative'
                    const paperContainer = document.createElement('div')
                    paperContainer.style.overflow = 'hidden'
                    paperContainer.style.height = '100%'
                    paper.appendChild(paperContainer)
                    paperContainer.appendChild(table)
                    allPages.appendChild(paper)
                })

                return {
                    page: allPages,
                }
            }

            const contentInfo = getContent()
            renderArea.append(contentInfo.page)

            return contentInfo
        }

        let content = renderAreaFunc()

        cancelButton._.on('click', () => {
            this.dialog.close()
        })
        printButton._.on('click', () => {
            let paperWidthPx, paperHeightPx
            if (formValue.direction === 'landscape') {
                ;[paperHeightPx, paperWidthPx] = this.currentPaper!.sizePx
            } else {
                ;[paperWidthPx, paperHeightPx] = this.currentPaper!.sizePx
            }

            const innerWidth = Number(paperWidthPx.toFixed(2))
            const innerHeight = Number(paperHeightPx.toFixed(2))
            console.log(innerWidth, innerHeight)

            const iframe: any = document.createElement('IFRAME')
            iframe.setAttribute('id', 'print-iframe')
            document.body.append(iframe)

            const doc = iframe.contentWindow.document
            doc.head.innerHTML = `
                <style>
                * {
                    padding: 0;
                    margin: 0;
                }
                .paper {
                    padding: 0 !important;
                }
                @page {
                    size: ${formValue.direction};
                    padding: 0;
                }
                </style>
            `

            const renderDoms: HTMLElement[] = []
            content?.page.querySelectorAll('.paper').forEach((p) => {
                if (p.firstChild) {
                    const copyDom = p.firstChild.cloneNode(true) as HTMLElement
                    copyDom.style.border = '1px solid red'
                    copyDom.style.width = (p as HTMLElement).clientWidth + 'px'
                    copyDom.style.height = (p as HTMLElement).clientHeight + 'px'

                    renderDoms.push(copyDom)
                }
            })

            doc.body.append(...renderDoms)
            doc.close()

            iframe.contentWindow.focus()
            iframe.contentWindow.print()
            setTimeout(() => {
                document.body.removeChild(iframe)
            }, 50)
            // if (navigator.userAgent.indexOf('MSIE') > 0) {
            // }
        })

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
