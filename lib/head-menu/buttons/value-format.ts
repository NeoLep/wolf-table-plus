import { h } from '../../element'
import DropdownList from '../dropdown/dropdown-list'
import BaseButtons from '.'
import type { SupportFormats } from '../../data/format'
import type { HElement } from '../..'
import type Table from '../..'
import dayjs from 'dayjs'

export default class ValueTypeButton extends BaseButtons {
    table: Table
    _dropdown: DropdownList<SupportFormats>

    _visible = false
    constructor(table: Table) {
        super(table)
        this.table = table

        const { t } = this.table._i18n
        this._dropdown = new DropdownList<SupportFormats>([
            {
                label: t('formats.normal'),
                value: 'normal',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'normal'),
                props: {
                    example: '',
                },
            },
            // {
            //   label: t('formats.text'),
            //   value: 'text',
            //   action: (evt: MouseEvent) => this.changeFormat(evt, 'text'),
            //   props: {
            //     example: '',
            //   },
            // },
            'divider',
            {
                label: t('formats.number'),
                value: 'number',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'number'),
                props: {
                    example: '98.5',
                },
            },
            {
                label: t('formats.scientific'),
                value: 'scientific',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'scientific'),
                props: {
                    example: '5.01E+00',
                },
            },
            {
                label: t('formats.percent'),
                value: 'percent',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'percent'),
                props: {
                    example: '100%',
                },
            },
            {
                label: t('formats.CNY'),
                value: 'CNY',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'CNY'),
                props: {
                    example: '¥100',
                },
            },
            {
                label: t('formats.USD'),
                value: 'USD',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'USD'),
                props: {
                    example: '$100',
                },
            },
            {
                label: t('formats.EUR'),
                value: 'EUR',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'EUR'),
                props: {
                    example: '€100',
                },
            },
            'divider',
            {
                label: t('formats.shortDate'),
                value: 'YYYY-MM-DD',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'YYYY-MM-DD'),
                props: {
                    example: dayjs().format('YYYY-MM-DD'),
                },
            },
            {
                label: t('formats.longDate'),
                value: 'YYYY-MM-DD HH:mm:ss',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'YYYY-MM-DD HH:mm:ss'),
                props: {
                    example: `${dayjs().format('YYYY-MM-DD')} 00:00:00`,
                },
            },
            {
                label: t('formats.time'),
                value: 'HH:mm:ss',
                action: (evt: MouseEvent) => this.changeFormat(evt, 'HH:mm:ss'),
                props: {
                    example: `00:00:00`,
                },
            },
        ])
        this._dropdown._dropDownElement._contentElement.css('width', '250px')
        this._dropdown.customOption = (option) => {
            if (option !== 'divider') {
                const ele = h('div')
                ele.css('display', 'flex')
                ele.css('align-items', 'center')
                ele.css('justify-content', 'space-between')
                ele.html(
                    `<span>${option.label}</span> <span class="secondary-text-color">${option.props?.example}</span>`,
                )
                return ele
            }
            return null
        }

        this._dropdown.value = 'normal'
        this._.append(this._dropdown._)
        this.render()
    }

    update() {
        if (!this.table._selector?._focusRange) return
        const { startRow, startCol } = this.table._selector._focusRange
        const cell = this.table.cell(startRow, startCol)
        if (typeof cell !== 'object' && this._dropdown.value !== 'normal') {
            this._dropdown.value = 'normal'
            this.render()
        } else if (typeof cell === 'object') {
            if (cell?.format) {
                this._dropdown.value = cell?.format as SupportFormats
                this.render()
            } else {
                if (this._dropdown.value !== 'normal') {
                    this._dropdown.value = 'normal'
                    this.render()
                }
            }
        }
    }

    changeFormat(_evt: MouseEvent, format: SupportFormats) {
        this._dropdown.value = format
        this._dropdown.render()
        this.table._events.eventTrigger('fastFormat', format)
        this._dropdown.hide()
    }

    render() {
        this._dropdown.render()
    }
}
