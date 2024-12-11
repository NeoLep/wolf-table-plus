import en from './en'
import zh from './zh'

export default class I18n {
    static messages = {
        en,
        zh,
    }

    _currentLang = 'en'
    changeCallbacks: (Function | null)[] = []

    constructor() {
        return this
    }

    _deepValue(prop: string, lang: string) {
        const propArr = prop.split('.')

        let curr = (I18n.messages as Record<string, unknown>)[lang]
        for (const key of propArr) {
            if ((curr as Record<string, unknown>)[key] !== undefined) {
                curr = (curr as Record<string, unknown>)[key]
            } else {
                if (lang !== 'en') {
                    curr = this._deepValue(prop, 'en')
                } else {
                    curr = prop
                }
                break
            }
        }

        return curr
    }
    changeLang(lang: string) {
        this._currentLang = lang

        this.changeCallbacks.forEach((func) => {
            if (func) {
                func()
            }
        })
    }
    currentLang() {
        return this._currentLang
    }

    onChange(callback: () => void) {
        this.changeCallbacks.push(callback)
        return this.changeCallbacks.length - 1
    }
    clearOnChange(index: number) {
        if (this.changeCallbacks[index]) {
            this.changeCallbacks[index] = null
        }
    }

    t = (code: string): string => {
        let usedLang = this._currentLang as keyof typeof I18n.messages
        if (!I18n.messages[usedLang]) {
            console.error(`fail to use lang: ${this._currentLang}, auto use english`)
            usedLang = 'en'
        }

        return this._deepValue(code, usedLang) as string
    }
}
