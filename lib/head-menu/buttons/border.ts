import { stylePrefix } from '../../config'
import { h } from '../../element'
import Dropdown, { isMouseInnerElementArea } from '../dropdown'
import ColorPicker from '../color-picker'
import DropdownList from '../dropdown/dropdown-list'
import BaseButtons from '.'
import type { BorderLineStyle, BorderType } from '../../table-renderer'
import type { HElement } from '../..'
import type Table from '../..'

function generateButton(icn: string) {
    const btn = h('div', `${stylePrefix}-hm-button`)
    const iconEle = h('div', `${stylePrefix}-icon`)
    iconEle.html(`<div class="icon ${icn || ''}"></div>`)
    btn.append(iconEle)
    return btn
}
export default class BorderButton extends BaseButtons {
    table: Table
    _dropdown: Dropdown
    _ctx: ContextButton
    _line: LineButton
    _visible = false

    constructor(table: Table) {
        super(table)
        this.table = table

        this._ctx = new ContextButton(this.table)
        this._line = new LineButton(this.table)

        this._dropdown = new Dropdown(generateButton('border-all'), this.generateContent())
        this._dropdown._.css('margin-left', '2px')

        this._.append(this._dropdown._)

        this._dropdown.beforeHide = (evt?: MouseEvent) => {
            if (
                evt &&
                (isMouseInnerElementArea(this._ctx._dropdown._contentElement._, evt) ||
                    isMouseInnerElementArea(
                        this._line._dropdown._dropDownElement._contentElement._,
                        evt,
                    ))
            ) {
                throw new Error('Stop hide')
            }
        }
        this.render()
    }

    generateContent() {
        const container = h('div')
        const content = h('div')
        content.css('display', 'flex')
        content.css('padding', '5px')
        content.css('justify-content', 'space-between')

        const leftElement = h('table')
        const setBorderList: (BorderType | 'none')[][] = [
            ['all', 'inside', 'horizontal', 'vertical', 'outside'],
            ['left', 'top', 'right', 'bottom', 'none'],
        ]
        setBorderList.forEach((row) => {
            const tr = h('tr')
            row.forEach((icon) => {
                const td = h('td').append(generateButton(`border-${icon}`))
                td.on('click', () => {
                    this.setBorderStyle(icon)
                })
                tr.append(td)
            })
            leftElement.append(tr)
        })
        content.append(leftElement)
        leftElement.addCss(`${stylePrefix}-hm-divider-line`)

        const rightElement = h('div')

        // --
        rightElement.css('padding', '2px 0 2px 0px')
        rightElement.append(this._ctx._)
        rightElement.append(this._line._)

        content.append(rightElement)
        container.append(content)

        return container
    }

    setBorderStyle(type: BorderType | 'none') {
        if (type === 'none') {
            this.table._events.eventTrigger('clearBorder')
        } else {
            this.table._events.eventTrigger(
                'setBorder',
                type,
                this._line.getValue() || 'thin',
                this._ctx.getValue(),
            )
        }
        this._dropdown.hide()
    }

    update() {
        // console.log('update')
        this.render()
    }

    render() {
        // console.log('render')
    }
}

class ContextButton {
    table: Table
    _: HElement
    _dropdown: Dropdown
    _colorPicker: ColorPicker
    _btn = generateButton('line-color')
    constructor(table: Table) {
        this.table = table
        this._colorPicker = new ColorPicker(undefined, this.table)
        this._dropdown = new Dropdown(this._btn, this._colorPicker._)
        this._dropdown._contentElement.css('left', '103%')
        this._dropdown._contentElement.css('top', '-5px')
        this._ = this._dropdown._
        this.updateButton()

        this._colorPicker.onChange = (_color: string) => {
            this._dropdown.hide()
            this.updateButton()
        }
    }
    updateButton() {
        this._dropdown._labelElement.firstChild?.css(
            'border-bottom',
            `3px solid ${this._colorPicker.fastColor}`,
        )
    }
    getValue() {
        return this._colorPicker.fastColor
    }
}

class LineButton {
    table: Table
    _: HElement
    _dropdown: DropdownList<BorderLineStyle>
    _btn = generateButton('line-type')
    lines: BorderLineStyle[] = ['thin', 'medium', 'thick', 'dashed', 'dotted']
    constructor(table: Table) {
        this.table = table
        this._dropdown = new DropdownList<BorderLineStyle>(
            this.lines.map((line) => ({
                label: line,
                value: line,
                action: (_evt) => {
                    this.updateButton(line)
                },
            })),
        )
        this._dropdown._dropDownElement._labelElement.css('padding-left', '0')
        this._dropdown.render = () => {
            this._dropdown._dropDownElement._labelElement.html(
                `<div class="${stylePrefix}-icon">
          <div class="icon line-type"></div>
        </div>`,
            )
        }
        this._dropdown.customOption = (item) => {
            const res = h('div')
            res.css('height', '32px')
            res.css('display', 'flex')
            res.css('align-items', 'center')
            if (item !== 'divider') {
                res.html(
                    `<div class="line-squire ${
                        this._dropdown.value === item.value ? 'selected' : ''
                    }"></div> ${this.drawLine(item.value) || ''}`,
                )
            }
            return res
        }

        this._dropdown._.css('position', 'relative')
        this._dropdown._.css('margin-top', '5px')
        this._dropdown._.css('margin-left', '0')
        this._dropdown._dropDownElement._contentElement.css('left', 'calc(100% + 10px)')
        this._dropdown._dropDownElement._contentElement.css('top', '-5px')
        this._ = this._dropdown._
        this.updateButton(this._dropdown.value || 'thin')
    }

    drawLine(type: BorderLineStyle) {
        if (type === 'thin') {
            return `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line></svg>`
        } else if (type === 'medium') {
            return `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" style="user-select: none;"><line x1="0" y1="1.0" x2="50" y2="1.0" stroke-width="2" stroke="black" style="user-select: none;"></line></svg>`
        } else if (type === 'thick') {
            return `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;"><line x1="0" y1="1.5" x2="50" y2="1.5" stroke-width="3" stroke="black" style="user-select: none;"></line></svg>`
        } else if (type === 'dashed') {
            return `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="2" style="user-select: none;"></line></svg>`
        } else if (type === 'dotted') {
            return `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="1" style="user-select: none;"></line></svg>`
        }
    }
    updateButton(line: BorderLineStyle) {
        this._dropdown.value = line
        this._dropdown.render()
        this._dropdown.renderList()
        this._dropdown.hide()
    }

    getValue() {
        return this._dropdown.value
    }
}
