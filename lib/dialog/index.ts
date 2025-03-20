import HElement, { h } from '../element'
import Draggabilly from 'draggabilly'
import { stylePrefix } from '../config'

export default class Dialog {
    content: HElement

    mask: HElement = h('div', `${stylePrefix}-dialog-mask`).hide()
    container: HElement = h('div', `${stylePrefix}-dialog`)

    closeIcon = h('span', `${stylePrefix}-dialog__header_close`).append(h('div', 'icon'))
    containerHeader: HElement = h('div', `${stylePrefix}-dialog__header`).append(
        h('div', `${stylePrefix}-dialog__header__title`),
        this.closeIcon,
    )
    containerBody: HElement = h('div', `${stylePrefix}-dialog__body`)
    containerFooter: HElement = h('div', `${stylePrefix}-dialog__footer`)

    hasInserted = false
    visible: boolean = false
    conf: {
        to?: HTMLElement
        delayGenerate?: boolean // 只有调用了 show 之后才会创建 dom 否则，默认不创建 dom

        title?: string
        width?: string

        disableMask?: boolean
        maskColor?: string
        closeOnClickMask?: boolean
        draggable?: boolean

        onBeforeClose?: () => boolean | undefined
    }

    constructor(content: HElement | HElement[], config: typeof this.conf = {}) {
        if (Array.isArray(content)) {
            this.content = h('div').append(...content)
        } else {
            this.content = content
        }
        this.conf = config

        this.initContiner()
        if (!config?.delayGenerate) {
            this.insertContent()
        }
    }

    initContiner() {
        this.container.append(this.containerHeader, this.containerBody, this.containerFooter)
        this.mask.append(this.container)

        //
        this.mask.on('click', () => {
            if (!this.conf.disableMask) {
                if (this.conf.closeOnClickMask || this.conf.closeOnClickMask === undefined) {
                    this.close()
                }
            }
        })
        this.closeIcon.on('click', () => {
            this.close()
        })
        this.container.on('click', (evt) => {
            ;(evt as MouseEvent).stopPropagation()
        })

        if (this.conf.draggable) {
            new Draggabilly(this.container._, {
                handle: `.${stylePrefix}-dialog__header`,
            })
            this.container.addCss('is-draggable')
        }
        this.render()
    }

    insertContent() {
        if (this.hasInserted) return

        this.containerBody.append(this.content)

        if (this.conf.to) {
            this.conf.to.append(this.mask._)
        } else {
            document.body.appendChild(this.mask._)
        }
    }

    updateConfig(nConf: typeof this.conf) {
        nConf.to = undefined

        this.conf = {
            ...this.conf,
            ...nConf,
        }

        this.render()
    }

    render() {
        if (this.conf?.maskColor) {
            this.mask.css('background', this.conf.maskColor)
        }

        if (this.conf?.disableMask) {
            this.mask.css('pointer-events', 'none')
            this.container.css('pointer-events', 'auto')
            this.mask.css('background', 'transparent')
        } else {
            this.mask.css('pointer-events', 'auto')
        }

        if (this.conf?.title) {
            this.containerHeader.firstChild?.textContent(this.conf?.title)
        }
        if (this.conf?.width) {
            this.container.css('width', this.conf.width)
        }
    }

    show() {
        this.insertContent()

        this.mask.show()

        this.container.css('top', '50%')
        this.container.css('left', '50%')
        this.container.css('transform', 'translate(-50%, -50%)')

        this.visible = true
    }

    close() {
        if (this.conf.onBeforeClose) {
            const result = this.conf.onBeforeClose()
            if (result === false) {
                return
            }
        }

        this.mask.hide()

        this.visible = false
    }
}
