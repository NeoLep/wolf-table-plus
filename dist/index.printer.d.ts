import Dialog from './dialog';
import Table, { HElement } from '.';
export type PaperConf = {
    label?: string;
    code: string;
    size: [number, number];
};
export declare const Papers: PaperConf[];
export default class Printer {
    papers: {
        label: string;
        code: string;
        size: [number, number];
    }[];
    currentPaper: PaperConf | undefined;
    table: Table;
    dialog: Dialog;
    formValue: {
        renderMode: "normal" | "compat";
        paper: string;
        padding: [number, number, number, number];
        direction: "portrait" | "landscape";
    };
    constructor(table: Table);
    getPaperByCode(code: string): {
        label: string;
        code: string;
        size: [number, number];
    } | undefined;
    getCurrentPaperInfo(): {
        direction: "portrait" | "landscape";
        width: number;
        height: number;
    } | undefined;
    renderPaperDom(conf?: typeof this.formValue): HElement[];
    renderPapaer(): void;
    printDOM(element: HTMLElement, config: {
        direction: 'portrait' | 'landscape';
        paper: string;
    }): void;
    print(): void;
}
