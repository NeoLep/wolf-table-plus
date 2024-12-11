import { stylePrefix } from '../config'
import { h } from '../element'
import type { Rect } from '../table-renderer'
import type HElement from '../element'

function hOverlayer() {
    return h('div', `${stylePrefix}-overlayer-area`)
}

export default class Overlayer {
    _areas: HElement[]
    _headerAreas: HElement[]
    _areaRects: Rect[] = []

    constructor(target: HElement) {
        this._areas = [hOverlayer(), hOverlayer(), hOverlayer(), hOverlayer()]
        this._headerAreas = [hOverlayer(), hOverlayer(), hOverlayer(), hOverlayer()]
        target.append(...this._areas, ...this._headerAreas)
    }

    area(index: number): HElement
    area(index: number, rect: Rect): Overlayer
    area(index: number, rect?: Rect): HElement | Overlayer {
        if (rect) {
            this._areaRects[index] = rect
            const { x, y, height, width } = rect
            this._areas[index].css({ left: x, top: y, width, height })
            return this
        }
        return this._areas[index]
    }

    headerArea(index: number): HElement
    headerArea(index: number, rect: Rect): Overlayer
    headerArea(index: number, rect?: Rect): HElement | Overlayer {
        if (rect) {
            const { x, y, height, width } = rect
            this._headerAreas[index].css({ left: x, top: y, width, height })
        }
        return this._headerAreas[index]
    }

    inAreas({ x, y, height, width }: Rect) {
        const x1 = x + width
        const y1 = y + height
        for (const it of this._areaRects) {
            if (x >= 0 && x1 <= it.width && y >= 0 && y1 <= it.height) {
                return true
            }
        }
        return false
    }
}
