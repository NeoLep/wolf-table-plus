import Button, { Icon } from '../button'
import { stylePrefix } from '../config'
import HElement, { h } from '../element'

class EventController {
    events: Record<string, Function[]> = {}
    constructor() {}
    add(name: string, callback: Function) {
        if (!this.events[name]) {
            this.events[name] = []
        }
        this.events[name].push(callback)
    }
    remove(name: string, callback: Function) {
        if (this.events[name]) {
            const index = this.events[name].findIndex((item) => callback)
            if (index !== -1) {
                this.events[name].splice(index, 1)
            }
        }
    }
    emit(name: string, args: any[] = []) {
        if (this.events[name]) {
            this.events[name].forEach((func) => {
                try {
                    func(...args)
                } catch (error) {
                    console.error(error)
                }
            })
        }
    }
}

export type FormItemType = {
    label: string
    prop: string
    component: FormItem
    rules?: {
        required?: boolean
        validator: (value: any, callback: (error?: Error) => void) => void
    }
}
export default class Form {
    _: HElement
    configs: {
        labelPosition?: 'top' | 'left' | 'right'
        fields: FormItemType[]
        t?: (word: string) => string
    } = {
        labelPosition: 'top',
        fields: [],
    }

    form: any = {}

    fieldsDict: Record<
        string,
        {
            labelElement: HElement
            contentElement: FormItem
            validator?: () => Promise<void>
        }
    > = {}

    constructor(configs: typeof this.configs, form?: any) {
        Object.assign(this.configs, configs)

        if (form) {
            this.form = form
        }

        if (!this.configs.t) {
            this.configs.t = (word) => word
        }

        this._ = h('form', `${stylePrefix}-form`)
        this.render()
    }

    render() {
        this._.html('')
        this.fieldsDict = {}
        this.configs.fields.forEach((field) => {
            let validator: (() => Promise<void>) | undefined = undefined
            const formItem = h('div', `${stylePrefix}-form-item`)
            if (this.configs.labelPosition === 'left') {
                formItem.addCss(`${stylePrefix}-form-item--left`)
            } else if (this.configs.labelPosition === 'right') {
                formItem.addCss(`${stylePrefix}-form-item--right`)
            } else if (this.configs.labelPosition === 'top') {
                formItem.addCss(`${stylePrefix}-form-item--top`)
            }
            const formLabel = h('label', `${stylePrefix}-form-item__label`).html(
                this.configs.t!(field.label),
            )
            const formContent = h('div', `${stylePrefix}-form-item__content`)
            const formError = h('div', `${stylePrefix}-form-item__error`)
            if (field.component?._) {
                field.component.setValue(this.form[field.prop])
                field.component.on('change', (value: any) => {
                    this.form[field.prop] = value
                })
                formContent.append(field.component!._)
                field.component.render()
                if (field.rules) {
                    validator = () => {
                        return new Promise<void>((resolve, reject) => {
                            // console.log(field.component.getValue())
                            field.rules!.validator(field.component.getValue(), (error?) => {
                                if (error) {
                                    console.log(error.message, this.configs.t!(error.message))
                                    formContent.addCss(`${stylePrefix}-form-item__content--error`)
                                    formError.html(this.configs.t!(error.message))
                                    reject({ prop: field.prop, message: error.message })
                                    throw new Error(error.message)
                                } else {
                                    formContent.removeCss(
                                        `${stylePrefix}-form-item__content--error`,
                                    )
                                    formError.textContent('')
                                    resolve()
                                }
                            })
                        })
                    }

                    if (field.rules.required) {
                        formLabel.addCss(`${stylePrefix}-form-item__label--required`)
                    }
                    field.component.on('blur', () => {
                        validator!()
                        // console.log(
                        //     field.prop,
                        //     'value: ',
                        //     field.component.getValue(),
                        // )
                    })
                }
            }

            formItem.append(formLabel, formContent, formError)
            this._.append(formItem)
            this.fieldsDict[field.prop] = {
                labelElement: formLabel,
                contentElement: field.component,
                validator,
            }
        })
    }

    getValue(key?: string) {
        for (const prop in this.fieldsDict) {
            const item = this.fieldsDict[prop]
            if (item.contentElement) {
                this.form[prop] = item.contentElement.getValue()
            }
        }
        if (key) {
            return this.form[key]
        } else {
            return this.form
        }
    }
    setValue(obj: Record<string, any>) {
        for (const prop in obj) {
            this.form[prop] = obj[prop]
            if (this.fieldsDict[prop]) {
                const item = this.fieldsDict[prop]
                if (item.contentElement) {
                    item.contentElement.setValue(obj[prop])
                }
            }
        }
    }

    validate(prop?: string | string[]) {
        const promList: Promise<void>[] = []
        let fields: FormItemType[] = []
        if (prop) {
            if (typeof prop === 'string') {
                prop = [prop]
            }
            fields = this.configs.fields.filter((field) => prop?.includes(field.prop))
        } else {
            fields = this.configs.fields
        }

        fields.forEach((field) => {
            if (this.fieldsDict[field.prop] && this.fieldsDict[field.prop].validator) {
                promList.push(this.fieldsDict[field.prop].validator!())
            }
        })
        return Promise.all(promList)
    }
}

export class FormItem {
    carrier: HElement | undefined
    _: HElement = h('div')
    onRender: (instance: FormItem) => void = (instance: FormItem) => {}
    constructor(onRender?: typeof this.onRender) {
        this.onRender = onRender || this.onRender
    }
    setValue(value: unknown) {
        if (typeof value !== 'number' && !value) {
            value = ''
        }
        this.carrier?.value(String(value))
    }
    getValue(): unknown {
        return this.carrier?.value()
    }
    on(ename: string, callback: (evt: unknown) => void) {
        this.carrier?.on(ename, callback)
    }
    render() {
        this.onRender(this)
    }
}

type FormItemInputConfigs = {
    placeholder?: string
    suffix?: HElement
    onRender?: (instance: FormItemInput) => void
}
export class FormItemInput extends FormItem {
    configs: FormItemInputConfigs = {}
    carrier = h('input', `${stylePrefix}-form-item--input`)
    constructor(value?: string | number, configs?: FormItemInputConfigs) {
        super()
        this.configs = configs || {}
        this._ = h('div', [`${stylePrefix}-form-item--input_wrapper`, 'form-item--container'])
        this._.append(this.carrier)

        if (this.configs.suffix) {
            this._.addCss(`${stylePrefix}-form-item--input_wrapper--suffix`)
            this._.append(
                h('div', `${stylePrefix}-form-item--input_wrapper--suffix-container`).append(
                    this.configs.suffix,
                ),
            )
        }
        if (value) {
            this.setValue(value)
        }
        this.render()
    }

    render = () => {
        if (this.configs.placeholder) {
            this.carrier.attr('placeholder', this.configs.placeholder)
        }
        if (this.configs.onRender) {
            this.configs.onRender(this)
        }
    }
}

type FormItemSelectConfigs = {
    placeholder?: string
    clearable?: boolean
    options: { label: string; value: string }[]
    onRender?: (instance: FormItemSelect) => void
}
export class FormItemSelect extends FormItem {
    configs: FormItemSelectConfigs = {
        options: [],
    }
    carrier: HElement = h('div', [
        `${stylePrefix}-form-item--input`,
        `${stylePrefix}-form-item--select`,
    ])
    optionContainer = h('div', 'option-container')

    suffixContainer = h(
        'div',
        `${stylePrefix}-form-item--input_wrapper--suffix-container`,
    ).setStyles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '18px',
    })

    clearIconVisible: boolean = false
    value: string | number | boolean | undefined = ''

    events = new EventController()

    constructor(value?: string | number, configs?: FormItemSelectConfigs) {
        super()
        if (configs) {
            this.configs = configs
        }

        this._ = h('div', [
            `${stylePrefix}-form-item--input_wrapper`,
            `${stylePrefix}-form-item--select_wrapper`,
            'form-item--container',
        ])

        this._.addCss(`${stylePrefix}-form-item--input_wrapper--suffix`)
        this._.append(this.carrier, this.suffixContainer, this.optionContainer)

        this._.on('click', () => {
            const clickHook = () => {
                setTimeout(() => {
                    this.changeOptionVisibility()
                    document.removeEventListener('click', clickHook)
                }, 0)
            }

            if (this.optionContainer.isShow()) {
                // window.removeEventListener('click', clickHook)
                // this.changeOptionVisibility()
                this.suffixContainer.css('transform', 'rotate(0)')
            } else {
                this.changeOptionVisibility(true)
                if (!this.clearIconVisible) {
                    this.suffixContainer.css('transform', 'rotate(180deg)')
                }
                setTimeout(() => {
                    document.addEventListener('click', clickHook)
                }, 0)
            }
        })

        this.renderSuffixIcon()
        this.setValue(value)
        this.render()
    }

    setValue(value?: string | number | boolean): void {
        this.value = value
    }
    getValue() {
        return this.value
    }

    renderSuffixIcon(type?: 'clearbtn') {
        this.clearIconVisible = false
        this.suffixContainer._.innerHTML = ''
        const chevronIcon = new Icon(type === 'clearbtn' ? 'close' : 'chevron-down')

        if (type === 'clearbtn') {
            this.clearIconVisible = true
            chevronIcon._.on('click', (e) => {
                this.renderSuffixIcon()
                this.setValue()
                this.renderValue()
                this.events.emit('change')
                this.events.emit('clear')
                ;(e as MouseEvent).stopPropagation()
                if (this.optionContainer.isShow()) {
                    this.optionContainer.hide()
                }
            })
        }
        // suffix icon
        this.suffixContainer.append(chevronIcon._)
    }
    renderValue() {
        if (this.value === undefined || this.value === '' || this.value === null) {
            this.carrier._.innerText = this.configs.placeholder || ''
            this.carrier.addCss('is-placeholder')
        } else {
            const item = this.configs.options.find((item) => item.value === this.value)
            if (item) {
                this.carrier._.innerText = item.label
            } else {
                this.carrier._.innerText = String(this.value)
            }
            if (this.configs.clearable) {
                this.renderSuffixIcon('clearbtn')
            }
            this.carrier.removeCss('is-placeholder')
        }
    }

    on(ename: string, callback: Function) {
        this.events.add(ename, callback)
    }

    render = () => {
        this.optionContainer._.innerHTML = ``
        this.optionContainer.append(
            ...(() => {
                return this.configs.options.map((item) => {
                    const hitem = h('div', 'option-item')
                    hitem.on('click', () => {
                        this.setValue(item.value)
                        this.events.emit('change', [item.value])
                        this.renderValue()
                    })
                    hitem._.setAttribute('value', item.value)
                    hitem.append(item.label)
                    return hitem
                })
            })(),
        )
        this.optionContainer.hide()
        this.renderValue()

        if (this.configs.onRender) {
            this.configs.onRender(this)
        }
    }

    changeOptionVisibility = (visible?: boolean) => {
        if (visible) {
            this.events.emit('show')
            this.optionContainer.show()
        } else {
            this.events.emit('hide')
            this.optionContainer.hide()
        }
    }
}
