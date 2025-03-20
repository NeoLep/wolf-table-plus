import { stylePrefix } from '../../config'
import Dialog from '../../dialog'
import Form, { FormItem, FormItemInput } from '../../form'
import HElement, { h } from '../../element'
import Button, { Icon } from '../../button'
import { expr2xy, Range, xy2expr } from '../../table-renderer'
import Table from '../..'
import { validExpr } from '../../table-renderer/alphabet'

export default class ValidatorSelectDialog {
    formInstance: Form | undefined
    formContainer: HElement = h('div')
    footer: HElement = h('div')

    dialog
    cellAreaDialog

    table
    t

    data = {
        cellRange: '',
        options: [] as string[],
    }

    configs: {
        onBeforceCloseCallback?: () => boolean | undefined
        onSubmitCallback?: (value: string) => void
    }

    constructor(table: Table, config: typeof this.configs) {
        this.table = table
        this.t = table._i18n.t
        this.configs = config

        this.cellAreaDialog = new CellAreaSelectDialog(this.table, {
            onBeforceCallback: () => {
                this.dialog.show()
                return true
            },
            onSubmitCallback: (value) => {
                this.formInstance?.setValue({ cellRange: value })
                this.formInstance?.validate('cellRange')
                this.dialog.close()
            },
        })

        this.dialog = new Dialog([this.formContainer, this.footer], {
            title: this.t('validators.dataValidator'),
            width: '480px',
            draggable: true,
            onBeforeClose: () => {
                if (this.configs.onBeforceCloseCallback) {
                    return this.configs.onBeforceCloseCallback()
                }
            },
        })
        // console.log(this.form.getValue())
        // this.form.setValue({ name: 'yy', pp: 'xxx' })
        // console.log(this.form.getValue())
    }

    renderForm() {
        this.formContainer.html('')
        console.log(this.data)

        this.formInstance = new Form(
            {
                labelPosition: 'top',
                fields: [
                    {
                        label: this.t('validators.cellRange'),
                        prop: 'cellRange',
                        component: (() => {
                            const button = new Button(new Icon('border-all')._, 'default', {
                                noneBorder: true,
                                padding: '0',
                                onClick: () => {
                                    this.dialog.close()
                                    this.cellAreaDialog.show('')
                                },
                            })
                            button._.css('height', '100%')
                            const res = new FormItemInput('', {
                                placeholder: this.t('validators.pleaseInputCellRange'),
                                suffix: button._,
                            })
                            return res
                        })(),
                        rules: {
                            required: true,
                            validator: this.cellAreaDialog.validator,
                        },
                    },
                    {
                        label: this.t('validators.validatorType'),
                        prop: 'options',
                        component: new ValueOptionsInput([], {
                            onRender: (instance) => {
                                instance.editInputElement.configs.placeholder = this.table._i18n.t(
                                    'validators.pressEnterCreate',
                                )
                                instance.editInputElement.render()
                            },
                        }),
                        rules: {
                            validator: (value: string[], callback) => {
                                const pushedValues: string[] = []
                                value.forEach((item) => {
                                    if (!item) {
                                        callback(new Error(this.t('validators.emptyOption')))
                                    }
                                    if (pushedValues.includes(item)) {
                                        callback(new Error(this.t('validators.duplicateOption')))
                                    } else {
                                        pushedValues.push(item)
                                    }
                                })
                                callback()
                            },
                        },
                    },
                ],
            },
            this.data,
        )

        this.formContainer.append(this.formInstance._)
    }

    renderFooter() {
        this.footer.html('')
        const foot = h('div')
            .css('display', 'flex')
            .css('flex-direction', 'row-reverse')
            .append(
                (() => {
                    const okBtn = new Button(this.t('common.ok'), 'primary', {
                        onClick: () => {
                            this.formInstance
                                ?.validate()
                                .then(() => {
                                    if (this.configs.onSubmitCallback) {
                                        this.configs.onSubmitCallback(this.formInstance?.getValue())
                                    }
                                    this.dialog.close()
                                })
                                .catch((error) => {
                                    console.error(error)
                                })
                        },
                    })
                    okBtn._.css('margin-left', '10px')
                    return okBtn._
                })(),
                (() => {
                    const cancelBtn = new Button(this.t('common.cancel'), 'default', {
                        onClick: () => {
                            this.dialog.close()
                        },
                    })
                    return cancelBtn._
                })(),
            )
        this.footer.append(foot)
    }

    render() {
        this.dialog.conf.title = this.t('validators.dataValidator')
        this.renderForm()
        this.renderFooter()
        this.dialog.render()
    }

    show(data: typeof this.data) {
        this.data = JSON.parse(JSON.stringify(data))
        this.render()
        this.dialog.show()
    }
    close() {
        this.dialog.close()
    }
}

class CellAreaSelectDialog {
    input
    form = h('div')
    footer = h('div')

    dialog: Dialog
    table: Table

    onBeforceCallback: () => boolean
    onSubmitCallback: undefined | ((value: string) => void)
    constructor(
        table: Table,
        events: {
            onBeforceCallback?: () => boolean
            onSubmitCallback?: (value: string) => void
        },
    ) {
        this.table = table
        this.input = new FormItemInput('', {
            placeholder: this.table._i18n.t('cellRangeDialog.placeholder'),
        })

        this.dialog = new Dialog([this.form, this.footer], {
            title: table._i18n.t('validators.selectCellRange'),
            width: '300px',
            draggable: true,
            disableMask: true,
            onBeforeClose: () => {
                this.table._emitter.off('selectorMove', this.updateValue)
                this.table._emitter.off('updateFocusRange', this.updateValue)
                return this.onBeforceCallback()
            },
        })

        this.onBeforceCallback = events.onBeforceCallback ? events.onBeforceCallback : () => true
        this.onSubmitCallback = events.onSubmitCallback
    }

    render() {
        this.input.configs.placeholder = this.table._i18n.t('cellRangeDialog.placeholder')
        this.input.render()

        this.form.html('')
        const fo = new Form(
            {
                labelPosition: 'top',
                fields: [
                    {
                        label: '',
                        prop: 'cellRange',
                        component: this.input,
                        rules: {
                            validator: this.validator,
                        },
                    },
                ],
            },
            {},
        )
        this.form.append(fo._)

        this.footer.html('')
        this.footer.append(
            h('div')
                .css('display', 'flex')
                .css('flex-direction', 'row-reverse')
                .append(
                    (() => {
                        const okBtn = new Button(this.table._i18n.t('common.ok'), 'primary', {
                            onClick: () => {
                                fo.validate()
                                    .then(() => {
                                        if (this.onSubmitCallback) {
                                            this.onSubmitCallback(this.input.getValue())
                                        }
                                        this.dialog.close()
                                    })
                                    .catch((error) => {
                                        console.error(error)
                                    })
                            },
                        })
                        okBtn._.css('margin-left', '10px')
                        return okBtn._
                    })(),
                    (() => {
                        const cancelBtn = new Button(
                            this.table._i18n.t('common.cancel'),
                            'default',
                            {
                                onClick: () => this.dialog.close(),
                            },
                        )
                        return cancelBtn._
                    })(),
                ),
        )

        this.dialog.conf.title = this.table._i18n.t('validators.selectCellRange')
        this.dialog.render()
    }

    show(area: string) {
        this.render()

        this.input.setValue(area)
        this.table._emitter.on('selectorMove', this.updateValue)
        this.table._emitter.on('updateFocusRange', this.updateValue)
        this.dialog.show()
    }
    updateValue = (value: [number, number] | Range) => {
        if (Array.isArray(value)) {
            const [r, c] = value
            this.input.setValue(xy2expr(c, r))
        } else {
            console.log('update value', value)
            this.input.setValue(
                `${xy2expr(value.startCol, value.startRow)}:${xy2expr(value.endCol, value.endRow)}`,
            )
        }
    }
    validator = (value: string, callback: Function) => {
        if (!value) {
            return callback(new Error(this.table._i18n.t('cellRangeDialog.unselectRange')))
        }
        const areas = value.split(':')
        if (areas.length > 2 || !validExpr(areas[0]) || (areas[1] && !validExpr(areas[1]))) {
            return callback(new Error(this.table._i18n.t('cellRangeDialog.formatError')))
        } else {
            if (areas.length === 2) {
                const a1 = expr2xy(areas[0])
                const a2 = expr2xy(areas[1])
                if (a1[0] > a2[0] || a1[1] > a2[1]) {
                    return callback(new Error(this.table._i18n.t('cellRangeDialog.formatError')))
                }
            }
            callback()
        }
    }
}

type ValueOptionsConfigType = { onRender?: (instance: ValueOptionsInput) => void }
class ValueOptionsInput extends FormItem {
    _: HElement = h('div', [
        `${stylePrefix}-form-item--edit-select-container`,
        'form-item--container',
    ])
    listElement: HElement = h('div', `${stylePrefix}-form-item--edit-select-list`)

    editElement: HElement = h('div', `${stylePrefix}-form-item--edit-select-input`)
    editInputElement = new FormItemInput()

    options: string[] = []

    configs: ValueOptionsConfigType = {}

    constructor(value?: string[], configs: ValueOptionsConfigType = {}) {
        super()

        this.configs = configs

        this.setValue(value || [])
        this.editInputElement.on('keyup', (evt) => {
            const e = evt as KeyboardEvent
            if (e.key === 'Enter') {
                const value = this.editInputElement.getValue()
                if (value) {
                    if (!this.options.includes(value)) {
                        this.options.push(value)
                        this.render()
                    }
                    this.editInputElement.setValue('')
                }
            }
            e.preventDefault()
        })
    }
    getValue(): string[] {
        return this.options
    }
    setValue(value: string[]): void {
        if (!Array.isArray(value)) {
            throw new Error('value must be array')
        }
        this.options = value

        this.editElement.append(this.editInputElement._)
        this._.append(this.listElement, this.editElement)
        this.render()
    }
    render() {
        this.listElement.html('')
        this.options.forEach((value, index) => {
            const optionElement = h('div', `item-option`)
            const inputElement = h('input', `item-option-input`)
            inputElement.value(value)
            const button = h('span', `delete-icon`)
            button.on('click', (e) => {
                ;(e as MouseEvent).preventDefault()
                this.options.splice(index, 1)
                this.render()
            })
            inputElement.on('blur', () => {
                this.options[index] = inputElement.value()
                const ind = this.options.indexOf(inputElement.value())
                if (ind !== -1 && ind !== index) {
                    inputElement.addCss('is-error')
                } else {
                    inputElement.removeCss('is-error')
                }
            })
            optionElement.append(inputElement, button)
            this.listElement.append(optionElement)
        })
        if (this.configs.onRender) {
            this.configs.onRender(this)
        }
    }
}
