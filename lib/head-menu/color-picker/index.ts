import { h } from '../../element'
import { stylePrefix } from '../../config'
import type Table from '../..'
import type HElement from '../../element'

export default class ColorPicker {
    table?: Table
    _: HElement
    _fastColorElement: HElement
    _themeColorElement: HElement
    fastColor = '#000'
    onChange: (color: string) => void = () => null

    constructor(container?: HElement, table?: Table) {
        this.table = table

        this._ = h('div')
        this._.addCss(`${stylePrefix}-color-picker`)
        this._fastColorElement = h('div')
        this._fastColorElement.addCss('fast-color')
        this._fastColorElement.on('click', () => {
            this.onChange(this.fastColor)
        })
        this._.append(this._fastColorElement)
        this._themeColorElement = h('div')
        this._themeColorElement.addCss('theme-color')
        this._.append(this._themeColorElement)

        this.renderThemeColorElement()
        this.updateFastColorElement()

        if (container) {
            container.append(this._)
        }
    }

    themeColors = [
        ['#ffffff', '#f2f2f2', '#d8d8d8', '#bfbfbf', '#a5a5a5', '#939393'],
        ['#000000', '#7f7f7f', '#595959', '#3f3f3f', '#262626', '#0d0d0d'],
        ['#485368', '#f3f5f7', '#c5cad3', '#808b9e', '#353b45', '#24272e'],
        ['#2972f4', '#e5efff', '#c7dcff', '#99beff', '#1450b8', '#0c306e'],
        ['#00a3f5', '#e5f6ff', '#c7ecff', '#99ddff', '#1274a5', '#0a415c'],
        ['#319b62', '#eafaf1', '#c3ead5', '#98d7b6', '#277c4f', '#184e32'],
        ['#de3c36', '#ffe9e8', '#ffc9c7', '#ff9c99', '#9e1e1a', '#58110e'],
        ['#f88825', '#fff3eb', '#ffdcc4', '#ffba84', '#b86014', '#5c300a'],
        ['#f5c400', '#fff9e3', '#ffeead', '#ffe270', '#a38200', '#665200'],
        ['#9a38d7', '#fdebff', '#f2c7ff', '#d58eff', '#5e2281', '#3b1551'],
    ]

    renderThemeColorElement() {
        this._themeColorElement.html(``)
        const title = h('div')
        title.addCss('title')
        title.html(`${this.table?._i18n.t('theme_color') || 'Theme Colors'}`)
        title.css('font-weight', 'bold')
        this._themeColorElement.append(title)

        const body = h('table')
        body.addCss('body')

        for (let tarIndex = 0; tarIndex < this.themeColors[0].length; tarIndex++) {
            const tr = h('tr')
            for (let j = 0; j < this.themeColors.length; j++) {
                const row = this.themeColors[j]
                const color = row[tarIndex]
                const cube = this.createColorCube(color)
                cube.css('padding', '2px')
                const td = h('td')
                td.on('click', () => {
                    this.updateFastColorElement(color)
                })
                td.append(cube)
                tr.append(td)
            }
            body.append(tr)
        }
        this._themeColorElement.css('padding-bottom', '5px')
        this._themeColorElement.append(body)
    }

    updateFastColorElement(color?: string) {
        if (color) {
            this.fastColor = color
            this.onChange(color)
        }
        this._fastColorElement.html('')
        this._fastColorElement.append(this.createColorCube(this.fastColor))
        const txt = h('span').html(this.fastColor)
        txt.css('padding', '0 0 0 10px')
        this._fastColorElement.append(txt)
    }

    createColorCube(color: string) {
        const cube = h('div')
        cube.addCss('color-cube')
        cube.css('width', '16px')
        cube.css('height', '16px')
        cube.css('background', color)
        return cube
    }
}
