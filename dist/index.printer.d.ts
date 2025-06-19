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
    constructor(table: Table);
    getPaperByCode(code: string): {
        label: string;
        code: string;
        size: [number, number];
    } | undefined;
    getDeviceDPI(): number;
    transferMMToPX(mm: number): number;
    transferPXToMM(px: number): number;
    renderPapaer(): void;
    printDOM(element: HTMLElement, config: {
        direction: 'portrait' | 'landscape';
        paper: string;
    }): void;
    print(): void;
}
