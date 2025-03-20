const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function alphabet(index: number): string {
    return alphabets.charAt(index % alphabets.length)
}

export function stringAt(index: number) {
    const ary = []
    while (index >= 0) {
        ary.push(alphabet(index))
        index = Number.parseInt(`${index / alphabets.length}`, 10) - 1
    }
    return ary.reverse().join('')
}

export function indexAt(str: string) {
    let ret = 0
    for (let i = 0; i < str.length; i++) {
        ret = 26 * ret + str.charCodeAt(i) - 64
    }
    return ret - 1
}

// B10 => x,y
export function expr2xy(expr: string): [number, number] {
    let x = ''
    let y = ''
    for (let i = 0; i < expr.length; i += 1) {
        if (expr.charAt(i) >= '0' && expr.charAt(i) <= '9') {
            y += expr.charAt(i)
        } else {
            x += expr.charAt(i).toUpperCase()
        }
    }
    return [indexAt(x), Number.parseInt(y, 10) - 1]
}

// x,y => B10 - col, row
export function xy2expr(x: number, y: number) {
    return `${stringAt(x)}${y + 1}`
}

export function expr2expr(expr: string, xn: number, yn: number) {
    const [x, y] = expr2xy(expr)
    return xy2expr(x + xn, y + yn)
}

export function validExpr(expr: string): boolean {
    // Regular expression check: uppercase letters followed by digits (digits cannot start with 0)
    const pattern = /^([A-Z]+)(\d+)$/
    if (!pattern.test(expr)) return false

    const res = pattern.exec(expr)
    if (!res) return false
    const [, colLetters, rowNum] = res

    // Check row number validity (1 to 1048576, Excel's max row limit)
    const rowNumber = parseInt(rowNum, 10)
    if (rowNumber < 1 || rowNumber > 1048576) return false

    // Check column letters (A-Z only, no empty string)
    return /^[A-Z]+$/.test(colLetters) && colLetters.length > 0
}

export default {
    stringAt,
    indexAt,
    expr2xy,
    xy2expr,
    expr2expr,
    validExpr,
}
