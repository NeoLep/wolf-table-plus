export function sum(min: number, max: number, getv: (index: number) => number) {
    let total = 0
    for (let i = min; i < max; i += 1) total += getv(i)
    return total
}

export function equals(obj1: Record<string, unknown>, obj2: Record<string, unknown>) {
    const keys = Object.keys(obj1)
    if (keys.length !== Object.keys(obj2).length) return false
    for (const k of keys) {
        const v1 = obj1[k]
        const v2 = obj2[k]
        if (v2 === undefined) return false
        if (typeof v1 === 'string' || typeof v1 === 'number' || typeof v1 === 'boolean') {
            if (v1 !== v2) return false
        } else if (Array.isArray(v1) && Array.isArray(v2)) {
            if (v1.length !== v2.length) return false
            for (const [ai, element] of v1.entries()) {
                if (!equals(element, v2[ai])) return false
            }
        } else if (
            typeof v1 !== 'function' &&
            !Array.isArray(v1) &&
            v1 instanceof Object &&
            !equals(v1 as Record<string, unknown>, v2 as Record<string, unknown>)
        )
            return false
    }
    return true
}

export function throttle(fn: Function, delay: number) {
    let timer: number | null = null
    return (...args: unknown[]) => {
        if (!timer) {
            timer = window.setTimeout(() => {
                fn.apply(null, ...args)
                timer = null
            }, delay || 0)
        }
    }
}

export const getDeviceDPI = () => {
    const tempDiv = document.createElement('div')
    tempDiv.style.width = '1in'
    tempDiv.style.visibility = 'hidden'
    document.body.appendChild(tempDiv)
    const dpi = tempDiv.offsetWidth
    document.body.removeChild(tempDiv)
    return dpi
}

export const dpi = getDeviceDPI()

/**
 * Point	Pixel
0.75 pt	1 px
1.5 pt	2 px
3 pt	4 px
4.5 pt	6 px
5 pt	6.6666666666667 px
6 pt	8 px
9 pt	12 px
10.5 pt	14 px
12 pt	16 px
13.5 pt	18 px
16.5 pt	22 px
18 pt	24 px
19.5 pt	26 px
21 pt	28 px
24 pt	32 px
28.5 pt	38 px
31.5 pt	42 px
36 pt	48 px
42 pt	56 px
45 pt	60 px
48 pt	64 px
54 pt	72 px
63 pt	84 px
75 pt	100 px
90 pt	120 px
 * @param pt 
 */
export function pt2px(pt: number): number {
    if (pt <= 0.75) return 1
    else if (pt <= 1.5) return 2
    else if (pt <= 2.25) return 3
    else if (pt <= 3) return 4
    else if (pt <= 3.75) return 5
    else if (pt <= 4.5) return 6
    return Math.round((dpi / 72) * pt)
}

export const px2pt = (px: number) => {
    return (72 / dpi) * px
}

export const mm2px = (mm: number) => {
    return Math.ceil((mm * dpi) / 25.4)
}

export const px2mm = (px: number) => {
    return (px * 25.4) / dpi
}

export const rgbToHex = (rgb: string) => {
    const values = rgb.match(/\d+/g) // 提取RGB值
    if (!values) throw new Error('rgb is null: ' + rgb)
    const hex = values.reduce((hexValue, currentValue) => {
        const hexString = Number(currentValue).toString(16) // 将每个RGB值转换成16进制字符串
        const paddedHexString = hexString.padStart(2, '0') // 在不满两位的字符串前补0
        return hexValue + paddedHexString // 拼接每个RGB值对应的16进制字符串
    }, '')
    return `#${hex.toLowerCase()}` // 返回完整的HEX颜色代码（需将字母转换为大写）
}
