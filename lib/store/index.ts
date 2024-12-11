import { MD5 } from 'crypto-js'

export default class Store {
    static #instanse: Store
    static use() {
        if (this.#instanse === undefined) {
            this.#instanse = new Store()
        }
        return this.#instanse
    }

    constructor() {}

    pictures: Record<string, string> = {} // {md5: base64}
    savePicture(base64: string): string {
        const md5 = MD5(base64).toString()
        if (!this.pictures[md5]) {
            this.pictures[md5] = base64
        } else {
            console.log('cached')
        }
        return md5
    }

    getPicture(md5: string): string {
        return this.pictures[md5]
    }
}
