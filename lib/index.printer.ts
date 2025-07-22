import Dialog from './dialog'
import Table, { h, HElement } from '.'
import Button from './button'
import { stylePrefix } from './config'
import Form, { EventController, FormItem, FormItemSelect } from './form'
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

const defaultPadding = (): [number, number, number, number] => {
    if (isFirefox()) {
        return [12, 12, 12, 12]
    } else {
        return [10, 10, 10, 10]
    }
}
class PaddingComponent extends FormItem {
    configs = {}
    carrier: HElement = h('div', [`${stylePrefix}-form-item--input`])

    value = defaultPadding()

    events = new EventController()

    constructor(value?: [number, number, number, number]) {
        super()
        this._ = h('div', ['form-item--container', `${stylePrefix}-custom-input-number`])
        this._.setStyles({
            position: 'relative',
            padding: '30px 60px',
        })

        const paperDom = h('div', ['paper-card', 'border-darker'])
        paperDom._.innerHTML = '<span class="color-info" style="text-align: center">Page</span>'
        paperDom.setStyles({
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
        })

        this._.append(paperDom)

        for (let i = 0; i < 4; i++) {
            const input = h('input', [`${stylePrefix}-form-item--input`])
            input.setStyles({
                position: 'absolute',
                width: '40px',
                textAlign: 'center',
            })
            input._.setAttribute('type', 'number')
            input.value(this.value[i].toString())
            input.on('blur', () => {
                this.value[i] = Number(input.value())
                if (this.value[i] < 0) {
                    input.value('0')
                    this.value[i] = 0
                }
                this.events.emit('change', [this.value, i])
            })
            if (i === 0) {
                input.setStyles({
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                })
                input.attr('placeholder', 'top')
            } else if (i === 1) {
                input.setStyles({
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                })
                input.attr('placeholder', 'right')
            } else if (i === 2) {
                input.setStyles({
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                })
                input.attr('placeholder', 'bottom')
            } else if (i === 3) {
                input.setStyles({
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                })
                input.attr('placeholder', 'left')
            }
            this._.append(input)
        }

        this._.addCss(`${stylePrefix}-form-item--input_wrapper--suffix`)
        this._.append(this.carrier)

        if (value) {
            this.setValue(value)
        }
        this.render()
    }

    setValue(value: typeof this.value): void {
        this.value = value
    }
    getValue() {
        return this.value
    }

    on(ename: string, callback: Function) {
        this.events.add(ename, callback)
    }

    render = () => {}
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

    formValue = {
        renderMode: 'normal' as 'normal' | 'compat',
        paper: 'A4',
        padding: defaultPadding(),
        direction: 'portrait' as 'portrait' | 'landscape',
    }

    constructor(table: Table) {
        this.table = table

        this.dialog = new Dialog([], {
            width: 'fit-content',
            draggable: true,
            onBeforeClose: () => {
                this.table.render()
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

    getCurrentPaperInfo() {
        if (!this.currentPaper) return undefined
        else {
            // 获取对应的纸张尺寸
            let paperWidth, paperHeight
            if (this.formValue.direction === 'portrait') {
                ;[paperWidth, paperHeight] = this.currentPaper!.size
            } else {
                ;[paperHeight, paperWidth] = this.currentPaper!.size
            }
            const [paddingTop, paddingRight, paddingBottom, paddingLeft] = this.formValue.padding
            const innerWidth = this.transferMMToPX(paperWidth - paddingLeft - paddingRight)
            const innerHeight = this.transferMMToPX(paperHeight - paddingTop - paddingBottom)

            return {
                direction: this.formValue.direction,
                width: innerWidth,
                height: innerHeight,
            }
        }
    }

    // paper
    renderPaperArea() {
        // 获取对应的纸张尺寸
        let paperWidth, paperHeight
        if (this.formValue.direction === 'portrait') {
            ;[paperWidth, paperHeight] = this.currentPaper!.size
        } else {
            ;[paperHeight, paperWidth] = this.currentPaper!.size
        }
        console.log(
            `paper is: ${this.currentPaper?.code}, direction: ${this.formValue.direction}, width: ${paperWidth}, height: ${paperHeight}`,
        )

        const [paddingTop, paddingRight, paddingBottom, paddingLeft] = this.formValue.padding

        // toHtml
        const parser = new DOMParser()
        const ht = this.table.toHtml(`A1:${xy2expr(...this.table.getMaxArea())}`)
        const dataHtml = parser.parseFromString(ht, 'text/html')
        const tableElement = dataHtml.body.firstChild as HTMLElement

        const generatePaperDom = (table: HTMLElement) => {
            const paper = h('div', 'paper')
            paper.setStyles({
                width: `${this.transferMMToPX(paperWidth)}px`,
                height: `${this.transferMMToPX(paperHeight)}px`,
                paddingTop: `${this.transferMMToPX(paddingTop)}px`,
                paddingRight: `${this.transferMMToPX(paddingRight)}px`,
                paddingBottom: `${this.transferMMToPX(paddingBottom)}px`,
                paddingLeft: `${this.transferMMToPX(paddingLeft)}px`,
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

        const transformRenderType = () => {
            let tableWidth = 0
            const tdWidthArr = [] as number[]
            const transformX: { x: number; width: number }[] = [{ x: 0, width: 0 }]
            tableElement.querySelectorAll('colgroup col').forEach((item: Element) => {
                const lastTransformX = transformX[transformX.length - 1]
                const attrWidth = Number(item.getAttribute('width'))
                const width = !Number.isNaN(attrWidth) ? attrWidth : 100
                tdWidthArr.push(width)
                tableWidth += width
                if (innerWidth - lastTransformX.width >= width) {
                    lastTransformX.width += width
                } else {
                    transformX.push({ x: lastTransformX.x + lastTransformX.width, width })
                }
            })

            tableElement.style.width = `${tdWidthArr.reduce((s, v) => s + v, 0)}px`

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
                const tdDoms = tr.querySelectorAll('td')
                tdDoms.forEach((td, colIndex) => {
                    td.style.fontSize = '13px'
                })
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

            return transformArrs.map((item, index) => {
                const tableDom = tableElement.cloneNode(true) as HTMLElement
                tableDom.style.position = 'absolute'
                tableDom.style.left = `${item.x * -1}px`
                tableDom.style.top = `${item.y * -1}px`
                const tableContainer = h('div')
                tableContainer.setStyles({
                    position: 'relative',
                    width: `${item.width + 1}px`,
                    height: `${item.height + 1}px`,
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                })
                tableContainer.append(tableDom)
                const paper = generatePaperDom(tableContainer._)
                // paper.style.position = 'absolute'
                // paper.style.left = `${item.x}px`
                // paper.style.top = `${item.y}px`
                // paper.style.width = `${item.width}px`
                // paper.style.height = `${item.height}px`

                return paper
            })
        }
        return transformRenderType()
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

        this.formValue.paper = this.currentPaper.code

        const initForm = (fValue: typeof this.formValue) => {
            const form = new Form(
                {
                    fields: [
                        // {
                        //     label: '渲染模式',
                        //     prop: 'renderMode',
                        //     component: (() => {
                        //         const comp = new FormItemSelect('', {
                        //             placeholder: '请选择渲染模式',
                        //             clearable: true,
                        //             options: [
                        //                 {
                        //                     label: '基础模式',
                        //                     value: 'normal',
                        //                 },
                        //                 {
                        //                     label: '兼容模式',
                        //                     value: 'compat',
                        //                 },
                        //             ],
                        //         })
                        //         comp.on(
                        //             'change',
                        //             (value: (typeof this.formValue)['renderMode']) => {
                        //                 this.formValue.renderMode = value
                        //                 renderPaperArea()
                        //             },
                        //         )
                        //         return comp
                        //     })(),
                        // },
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
                                    this.formValue.paper = value
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
                                    this.formValue.direction = value
                                    renderPaperArea()
                                })
                                return comp
                            })(),
                        },
                        {
                            label: '边距 (mm)',
                            prop: 'padding',
                            component: (() => {
                                const pcomp = new PaddingComponent()
                                pcomp.on(
                                    'change',
                                    (value: [number, number, number, number], index: number) => {
                                        this.formValue.padding = value
                                        renderPaperArea()
                                    },
                                )
                                return pcomp
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
        const form = initForm(this.formValue)

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
                    pushDoms.appendChild(n)
                }
            }
            this.printDOM(pushDoms, {
                direction: this.formValue.direction,
                paper: this.formValue.paper,
            })
        })

        const renderPaperArea = () => {
            paperArea._.innerHTML = ''
            paperArea.append(...this.renderPaperArea())
        }

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
