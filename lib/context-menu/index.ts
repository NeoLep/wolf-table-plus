import { h } from '../element'
import { stylePrefix } from '../config'
import selector from '../index.selector'
import Store from '../store'
import { uploadPicture } from '../utils/upload-file'
import type Table from '..'
import type HElement from '../element'

type StatusType = boolean | ((table: Table) => boolean) | ((table: Table) => Promise<boolean>)

type BaseOption = {
    id: string
    label: string
    shortcut?: string
    hidden?: StatusType
    disable?: StatusType
}
type NormalMenuOption = BaseOption & {
    type?: undefined
    action: (evt: MouseEvent, table: Table) => void
    render?: (element: HElement) => void
}
type TreeMenuOption = BaseOption & {
    type: 'tree'
    action?: (evt: MouseEvent, table: Table) => void
    children: (TreeMenuOption | NormalMenuOption)[]
}
type DividerLineOption = {
    type: 'div'
    render?: (element: HElement) => void
}
type OptionsResultType = NormalMenuOption | DividerLineOption | TreeMenuOption

export default class ContextMenu {
    table: Table
    _contextElement: HElement

    hiddenOption: string[] | ((table: Table) => string[]) = []
    _extendOptions: OptionsResultType[] = []

    constructor(table: Table) {
        this.table = table

        this._contextElement = h('ul', `${stylePrefix}-context-menu`)
        this._contextElement.hide()

        this.table._container.append(this._contextElement)
        // this.table.append(this._text, this._textMeasure)
    }

    options = (): OptionsResultType[] => [
        {
            id: 'undo',
            label: this.table._i18n.t('undo'),
            shortcut: 'Ctrl + Z',
            disable: () => !this.table._history.canUndo(),
            action: () => {
                this.table._events.eventTrigger('undo')
            },
        },
        {
            id: 'redo',
            label: this.table._i18n.t('redo'),
            shortcut: 'Ctrl + Y',
            disable: () => !this.table._history.canRedo(),
            action: () => {
                this.table._events.eventTrigger('redo')
            },
        },
        {
            type: 'div',
        },
        {
            id: 'cut',
            label: this.table._i18n.t('cut'),
            shortcut: 'Ctrl + X',
            action: () => {
                this.table._events.eventTrigger('cut')
            },
        },
        {
            id: 'copy',
            label: this.table._i18n.t('copy'),
            shortcut: 'Ctrl + C',
            action: () => {
                this.table._events.eventTrigger('copy')
            },
        },
        {
            id: 'paste',
            label: this.table._i18n.t('paste'),
            shortcut: 'Ctrl + V',
            action: () => {
                this.table._events.eventTrigger('paste')
            },
        },
        {
            id: 'pasteValue',
            label: this.table._i18n.t('onlyPasteValue'),
            shortcut: 'Ctrl + Shift + V',
            action: () => {
                this.table._events.eventTrigger('paste', true)
            },
        },
        {
            type: 'div',
        },
        {
            id: 'pasteValue',
            label: this.table._i18n.t('insertRow'),
            action: () => {
                this.table._events.eventTrigger('insertRow')
            },
        },
        {
            id: 'insertCol',
            label: this.table._i18n.t('insertCol'),
            action: () => {
                this.table._events.eventTrigger('insertCol')
            },
        },
        {
            type: 'tree',
            id: 'insertMore',
            label: '插入其他',
            children: [
                {
                    id: 'insertPicture',
                    label: '插入图片',
                    action: async (evt, table) => {
                        try {
                            const base64 = await uploadPicture('image/*')
                            const md5 = Store.use().savePicture(base64)
                            selector.setCellValue(table, {
                                type: 'image',
                                valueType: 'local',
                                value: md5,
                            })
                            table.render()
                        } catch {
                            //
                        }
                        // console.log('insert picture')
                    },
                },
                {
                    id: 'insertChart',
                    label: '插入图表',
                    action: (evt, table) => {
                        console.log('insert chart')
                    },
                },
            ],
        },
        {
            type: 'div',
        },
        {
            id: 'deleteRow',
            label: this.table._i18n.t('deleteRow'),
            action: () => {
                this.table._events.eventTrigger('deleteRow')
            },
        },
        {
            id: 'deleteCol',
            label: this.table._i18n.t('deleteCol'),
            action: () => {
                this.table._events.eventTrigger('deleteCol')
            },
        },
        {
            id: 'deleteValue',
            label: this.table._i18n.t('deleteValue'),
            shortcut: 'Backspace',
            action: () => {
                this.table._events.eventTrigger('clearCell', 'value')
            },
        },
        {
            id: 'deleteStyle',
            label: this.table._i18n.t('deleteStyle'),
            shortcut: 'Shift + Backspace',
            action: () => {
                this.table._events.eventTrigger('clearCell', 'style')
            },
        },
        {
            id: 'deleteCell',
            label: this.table._i18n.t('deleteCell'),
            shortcut: 'Delete',
            action: () => {
                this.table._events.eventTrigger('clearCell', 'cell')
            },
        },
    ]

    async show(evt: MouseEvent) {
        this._contextElement.css('top', `${evt.layerY + 5}px`)
        this._contextElement.css('left', `${evt.layerX + 5}px`)

        const transferStatusToPromise = (status?: StatusType): Promise<boolean> => {
            if (status === undefined) return new Promise((resolve) => resolve(false))
            if (typeof status === 'boolean') return new Promise((resolve) => resolve(status))
            else if (typeof status === 'function') {
                const funcRes = status(this.table)
                if (Object.prototype.toString.call(funcRes) === '[object Promise]') {
                    return funcRes as Promise<boolean>
                } else {
                    return new Promise((resolve) => resolve(funcRes as boolean))
                }
            }

            return new Promise((resolve) => resolve(false))
        }

        let hiddenOptionList: string[]
        if (typeof this.hiddenOption === 'function') {
            hiddenOptionList = this.hiddenOption(this.table)
        } else {
            hiddenOptionList = this.hiddenOption
        }

        this._contextElement.html('')
        let count = 0

        const options = [...this.options(), ...this._extendOptions]

        const renderItem = async (item: NormalMenuOption | TreeMenuOption) => {
            const cssItems = ['context-item']
            const itemDisabled = await transferStatusToPromise(item.disable)

            if (item.type === 'tree') cssItems.push('context-item-tree')
            if (itemDisabled) cssItems.push('context-item--disabled')
            const itemEle = h('li', cssItems)
            if (item.type === 'tree') {
                const label = h('div', 'label-container').html(
                    `<span class="label">${item.label}</span> <span class="arrow"><span class="icon arrow-right"></span> </span>`,
                )
                const content = h('div', ['tree-list', `${stylePrefix}-context-menu`])
                for (const children of item.children) {
                    content.append(await renderItem(children))
                }
                let interval: number | null = null
                itemEle.on('mouseenter', () => {
                    if (interval !== null) {
                        clearInterval(interval)
                    }
                    content.css('display', 'block')
                    const rec = itemEle._.getBoundingClientRect()
                    const resWidth = document.body.clientWidth - rec.right
                    if (resWidth < content._.clientWidth) {
                        content.css('left', 'calc(-100%)')
                        content.css('margin-left', '-5px')
                    }
                })
                itemEle.on('mouseleave', () => {
                    interval = setTimeout(() => {
                        content.css('display', 'none')
                    }, 100)
                })
                itemEle.append(label, content)
            } else {
                const htmlText = `<span class="label">${item.label}</span> <span class="shortcut">${item.shortcut || ''}</span>`
                itemEle.html(htmlText)
            }

            if (!itemDisabled && item.action) {
                itemEle.on('click', (evt) =>
                    (item as NormalMenuOption).action(evt as MouseEvent, this.table),
                )
            }
            return itemEle
        }
        for (const item of options) {
            if (item.type === 'div') {
                if (count > 0) {
                    this._contextElement.append(h('div', `divider`))
                    count = 0
                }
            } else {
                if (
                    !(await transferStatusToPromise((item as NormalMenuOption).hidden)) &&
                    !hiddenOptionList.includes(item.id)
                ) {
                    this._contextElement.append(await renderItem(item))
                    count++
                }
            }
        }

        // const diffHeight = this.table
        this._contextElement.show()

        const tableWidth = this.table._width()
        const tableHeight = this.table._height()
        const off = this._contextElement.offset()
        if (evt.layerY + off.height > tableHeight) {
            this._contextElement.css('top', `${tableHeight - off.height - 20}px`)
        }
        if (evt.layerX + off.width > tableWidth) {
            this._contextElement.css(
                'left',
                `${tableWidth - off.width - (tableWidth - evt.layerX)}px`,
            )
        }
        window.addEventListener('click', this.hide)
    }

    hide = (evt: MouseEvent) => {
        if (
            (evt.srcElement as HTMLElement).className.includes('context-item--disabled') ||
            (evt.srcElement as HTMLElement).className.includes('context-item-tree') ||
            (evt.srcElement as HTMLElement).className.includes('divider')
        ) {
            return
        }

        setTimeout(() => {
            this._contextElement.css('display', 'none')
            window.removeEventListener('click', this.hide)
        }, 0)
    }

    appendOption = (option: OptionsResultType) => {
        this._extendOptions.push(option)
    }
    removeOption = (id: string) => {
        const index = this._extendOptions.findIndex((item) => !item.type && item.id === id)
        if (index !== -1) {
            this._extendOptions.splice(index, 1)
        }
    }
}
