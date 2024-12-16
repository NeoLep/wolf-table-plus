export default class Store {
    #private;
    static use(): Store;
    constructor();
    pictures: Record<string, string>;
    savePicture(base64: string): string;
    getPicture(md5: string): string;
}
