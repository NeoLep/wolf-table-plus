import Dialog from './dialog';
import Table from '.';
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
    dpi: number;
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
    getDeviceDPI(): number;
    transferMMToPX(mm: number): number;
    transferPXToMM(px: number): number;
    getCurrentPaperInfo(): {
        direction: "portrait" | "landscape";
        width: number;
        height: number;
    } | undefined;
    renderPapaer(): void;
    printDOM(element: HTMLElement, config: {
        direction: 'portrait' | 'landscape';
        paper: string;
    }): void;
    print(): void;
}
