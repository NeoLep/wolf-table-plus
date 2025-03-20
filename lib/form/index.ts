import { stylePrefix } from '../config'
import HElement, { h } from '../element'

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

    constructor(configs: typeof this.configs, form: any) {
        this.configs = configs
        this.form = form

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
    _: HElement = h('div')
    onRender: (instance: FormItem) => void = (instance: FormItem) => {}
    constructor(onRender?: typeof this.onRender) {
        this.onRender = onRender || this.onRender
    }
    setValue(value: unknown) {
        this._.value(String(value))
    }
    getValue(): unknown {
        return this._.value()
    }
    on(ename: string, callback: (evt: unknown) => void) {
        this._.on(ename, callback)
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
    input: HElement = h('input', `${stylePrefix}-form-item--input`)
    constructor(value?: string | number, configs?: FormItemInputConfigs) {
        super()
        this.configs = configs || {}
        this._ = h('div', [`${stylePrefix}-form-item--input_wrapper`, 'form-item--container'])
        this._.append(this.input)

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
    getValue(): string {
        return this.input.value()
    }
    setValue(value: string | number) {
        this.input.value(String(value))
    }

    on(ename: string, callback: (evt: unknown) => void) {
        this.input.on(ename, callback)
    }

    render = () => {
        if (this.configs.placeholder) {
            this.input.attr('placeholder', this.configs.placeholder)
        }
        if (this.configs.onRender) {
            this.configs.onRender(this)
        }
    }
}
