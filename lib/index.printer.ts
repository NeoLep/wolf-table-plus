import Dialog from './dialog'
import Table, { h } from '.'
import Button from './button'
import Form, { FormItemInput, FormItemSelect } from './form'
import { isFirefox } from './utils/brower-checker'
import { xy2expr } from './table-renderer'

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
    currentPaper: PaperConf | undefined

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
        return r
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

    // transform move method
    renderPapaer() {
        if (!this.currentPaper) return
        this.dialog.updateConfig({
            title: this.currentPaper?.label || '',
            width: '80vw',
            height: '90vh',
        })

        this.dialog.containerBody.css('height', '100%')

        const formValue = {
            renderMode: 'normal' as 'normal' | 'compat',
            paper: this.currentPaper?.code,
            padding: [10, 10, 10, 10],
            direction: 'portrait' as 'portrait' | 'landscape',
        }
        const initForm = (fValue: typeof formValue) => {
            const form = new Form(
                {
                    fields: [
                        {
                            label: '渲染模式',
                            prop: 'renderMode',
                            component: (() => {
                                const comp = new FormItemSelect('', {
                                    placeholder: '请选择渲染模式',
                                    clearable: true,
                                    options: [
                                        {
                                            label: '基础模式',
                                            value: 'normal',
                                        },
                                        {
                                            label: '兼容模式',
                                            value: 'compat',
                                        },
                                    ],
                                })
                                comp.on('change', (value: (typeof formValue)['renderMode']) => {
                                    formValue.renderMode = value
                                    renderPaperArea()
                                })
                                return comp
                            })(),
                        },
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
                                    this.currentPaper = this.getPaperByCode(value)
                                    renderPaperArea()
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
                                    renderPaperArea()
                                })
                                return comp
                            })(),
                        },
                    ],
                },
                fValue,
            )
            form._.setStyles({
                padding: '10px',
                flex: 1,
            })
            return form
        }
        const form = initForm(formValue)

        const printButton = new Button(this.table._i18n.t('printSheet'), 'primary')
        const cancelButton = new Button(this.table._i18n.t('common.cancel'), 'default')
        cancelButton._.css('margin-right', '10px')
        cancelButton._.on('click', () => {
            this.dialog.close()
        })

        const paperArea = h('div').css({
            height: '100%',
            flex: 1,
            background: '#dadce0',
            overflow: 'auto',
            boxSizing: 'border-box',
        })
        // paper
        const renderPaperArea = () => {
            console.log('render Paper Area')
            paperArea._.innerHTML = ''

            // 获取对应的纸张尺寸
            let paperWidth, paperHeight
            if (formValue.direction === 'portrait') {
                ;[paperWidth, paperHeight] = this.currentPaper!.size
            } else {
                ;[paperHeight, paperWidth] = this.currentPaper!.size
            }
            console.log(
                `paper is: ${formValue.paper}, width: ${paperWidth}, height: ${paperHeight}`,
            )

            const [paddingTop, paddingRight, paddingBottom, paddingLeft] = formValue.padding

            // toHtml
            const parser = new DOMParser()
            const ht = this.table.toHtml(`A1:${xy2expr(...this.table.getMaxArea())}`)
            // console.log(ht)
            const dataHtml = parser.parseFromString(ht, 'text/html')
            const tableElement = dataHtml.body.firstChild as HTMLElement

            const generatePaperDom = (table: HTMLElement) => {
                const paper = h('div', 'paper')
                paper.setStyles({
                    width: `${this.transferMMToPX(paperWidth)}px`,
                    height: `${this.transferMMToPX(paperHeight)}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // paddingTop: `${this.transferMMToPX(paddingTop)}px`,
                    // paddingRight: `${this.transferMMToPX(paddingRight)}px`,
                    // paddingBottom: `${this.transferMMToPX(paddingBottom)}px`,
                    // paddingLeft: `${this.transferMMToPX(paddingLeft)}px`,
                    boxSizing: 'border-box',
                    margin: '20px auto',
                    background: '#fff',
                })

                const paperContent = h('div', 'paper-content')
                paperContent.setStyles({
                    width: `${this.transferMMToPX(paperWidth - paddingLeft - paddingRight)}px`,
                    height: `${this.transferMMToPX(paperHeight - paddingTop - paddingBottom)}px`,
                    // border: '1pt solid red',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    position: 'relative',
                })
                paperContent.append(table)

                paper.append(paperContent)
                return paper
            }

            const innerWidth = this.transferMMToPX(paperWidth - paddingLeft - paddingRight)
            const innerHeight = this.transferMMToPX(paperHeight - paddingTop - paddingBottom)
            const pages: { dom: HTMLElement; colWidths: number[] }[][] = []

            const baseRenderType = () => {
                const tdWidthArr: number[] = []
                tableElement.querySelectorAll('colgroup col').forEach((item: Element) => {
                    const width = Number(item.getAttribute('width'))
                    tdWidthArr.push(!Number.isNaN(width) ? width : 100)
                })
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
                        const tdWidth = tdWidthArr[colIndex]
                        if (reduceWidth < tdWidth) {
                            const p = pages[currentInsertIndex][currentInsertIndex2]
                            const oldTable = p?.dom
                            if (oldTable) {
                                // oldTable.style.width = `${innerWidth - reduceWidth}px`
                                reduceWidth = innerWidth
                            }
                            colOffset = colIndex
                            currentInsertIndex2++
                        }
                        // td.style.width = `${tdWidth}px`
                        let tar = pages[currentInsertIndex][currentInsertIndex2]
                        if (!tar) {
                            const table = document.createElement('table')
                            table.style.borderSpacing = '0'
                            table.style.borderCollapse = 'collapse'
                            pages[currentInsertIndex][currentInsertIndex2] = {
                                colWidths: [],
                                dom: table,
                            }
                            tar = pages[currentInsertIndex][currentInsertIndex2]
                        }
                        const currTable = tar?.dom
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
                        if (!tar.colWidths[colIndex - colOffset]) {
                            tar.colWidths[colIndex - colOffset] = tdWidth
                        }
                        currTr.appendChild(td.cloneNode(true))
                        reduceWidth -= tdWidth
                    })
                    reduceHeight -= trHeight
                })
                pages.flat().forEach((table) => {
                    const colGroupDom = document.createElement('colgroup')
                    table.colWidths.forEach((w) => {
                        const col = document.createElement('col')
                        col.setAttribute('width', `${w}`)
                        colGroupDom.appendChild(col)
                    })
                    table.dom.appendChild(colGroupDom)
                    const paper = generatePaperDom(table.dom)
                    paperArea.append(paper)
                })
            }

            const transformRenderType = () => {
                let tableWidth = 0
                const transformX: { x: number; width: number }[] = [{ x: 0, width: 0 }]
                tableElement.querySelectorAll('colgroup col').forEach((item: Element) => {
                    const lastTransformX = transformX[transformX.length - 1]
                    const attrWidth = Number(item.getAttribute('width'))
                    const width = !Number.isNaN(attrWidth) ? attrWidth : 100
                    tableWidth += width
                    if (innerWidth - lastTransformX.width >= width) {
                        lastTransformX.width += width
                    } else {
                        transformX.push({ x: lastTransformX.x + lastTransformX.width, width })
                    }
                })

                tableElement.style.width = `${tableWidth}px`

                const transformY: { y: number; height: number }[] = [{ y: 0, height: 0 }]
                const trDoms = tableElement.querySelectorAll('tr')
                trDoms.forEach((tr, rowIndex) => {
                    const lastTransformY = transformY[transformY.length - 1]
                    const height = Number(tr.style.height.replaceAll('px', ''))
                    if (innerHeight - lastTransformY.height >= height) {
                        lastTransformY.height += height
                    } else {
                        transformY.push({ y: lastTransformY.y + lastTransformY.height, height })
                    }
                })

                const transformArrs: ((typeof transformX)[0] & (typeof transformY)[0])[] = []
                transformY.forEach((yItem) => {
                    transformX.forEach((xItem) => {
                        transformArrs.push({
                            ...xItem,
                            ...yItem,
                        })
                    })
                })

                transformArrs.forEach((item, index) => {
                    const tableDom = tableElement.cloneNode(true) as HTMLElement
                    tableDom.style.position = 'absolute'
                    tableDom.style.left = `${item.x * -1 + (item.x !== 0 ? 1 : 0)}px`
                    tableDom.style.top = `${item.y * -1}px`
                    const tableContainer = h('div')
                    tableContainer.setStyles({
                        position: 'relative',
                        width: `${item.width + (item.x !== 0 ? +1 : 0)}px`,
                        height: `${item.height + 1}px`,
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                    })
                    tableContainer.append(tableDom)
                    const paper = generatePaperDom(tableContainer._)
                    paperArea.append(paper)
                    // paper.style.position = 'absolute'
                    // paper.style.left = `${item.x}px`
                    // paper.style.top = `${item.y}px`
                    // paper.style.width = `${item.width}px`
                    // paper.style.height = `${item.height}px`
                })
            }

            // debug mode
            if (formValue.renderMode === 'compat') {
                transformRenderType()
            } else {
                baseRenderType()
            }

            // const debugMode = () => {
            //     paperArea._.innerHTML = ''

            //     for (let i = 0; i < 5; i++) {
            //         const d = h('div')
            //         d.setStyles({
            //             width: '100%',
            //             height: '100%',
            //             border: '1px solid red',
            //             boxSizing: 'border-box',
            //             position: 'absolute',
            //             top: 0,
            //             left: 0,
            //         })
            //         d._.innerHTML = `<p style="text-align: center">page ${i + 1}</p>`
            //         const paper = generatePaperDom(d._)
            //         paperArea.append(paper)
            //     }
            // }
            // debugMode()
        }

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
        const container = h('div')
            .css('height', '100%')
            .css('display', 'flex')
            .append(paperArea, confArea)
        this.dialog.containerBody._.innerHTML = ''
        this.dialog.containerBody.append(container)

        printButton._.on('click', () => {
            const pushDoms: HTMLElement = document.createElement('div')
            const list = paperArea._.children
            for (let i = 0; i < list.length; i++) {
                const item = list.item(i)
                if (item?.firstChild) {
                    const n = item.firstChild.cloneNode(true) as HTMLElement
                    console.log(n)
                    pushDoms.appendChild(n)
                }
            }
            this.printDOM(pushDoms, {
                direction: formValue.direction,
                paper: formValue.paper,
            })
        })

        renderPaperArea()
        this.dialog.show()
    }

    printDOM(element: HTMLElement, config: { direction: 'portrait' | 'landscape'; paper: string }) {
        const iframe: any = document.createElement('IFRAME')
        iframe.setAttribute('id', 'print-iframe')

        if (isFirefox()) {
            // for firefox
            iframe.src = 'about:'
        }

        document.body.append(iframe)

        iframe.width = '1600px'
        iframe.height = '800px'
        const doc = iframe.contentDocument
        doc.head.innerHTML = `<style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box !important;
        }
        .paper-content+.paper-content {
            margin-top: 1px;
        }
        @page {
            size: ${config.paper} ${config.direction};
            padding: 0;
        }
</style>`

        const renderDoms: HTMLElement[] = []
        doc.body.appendChild(element.cloneNode(true))

        doc.close()

        iframe.contentWindow.focus()

        if (isFirefox()) {
            setTimeout(() => {
                iframe.contentWindow.print()
            }, 50)
        } else {
            iframe.contentWindow.print()
        }

        setTimeout(() => {
            document.body.removeChild(iframe)
        }, 200)
        // if (navigator.userAgent.indexOf('MSIE') > 0) {
        // }
    }

    print() {
        if (!this.currentPaper) {
            this.currentPaper = this.getPaperByCode('A4')!
        }

        this.renderPapaer()
    }
}
