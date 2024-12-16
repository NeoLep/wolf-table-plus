export default class I18n {
    static messages: {
        en: {
            cut: string;
            copy: string;
            paste: string;
            undo: string;
            redo: string;
            onlyPasteValue: string;
            delete: string;
            paintformat: string;
            clearformat: string;
            valueformat: string;
            increase_dicimal: string;
            reduce_dicimal: string;
            fontFamily: string;
            fontSize: string;
            fontBold: string;
            fontItalic: string;
            fontStrike: string;
            fontUnderline: string;
            fontAlign: string;
            fontVerticalAlign: string;
            fontAutoWrap: string;
            fontColor: string;
            bgColor: string;
            border: string;
            mergeCell: string;
            freezeCell: string;
            insertRow: string;
            insertCol: string;
            deleteRow: string;
            deleteCol: string;
            deleteValue: string;
            deleteStyle: string;
            deleteCell: string;
            theme_color: string;
            insert_others: string;
            insert_pictures: string;
            formats: {
                normal: string;
                text: string;
                number: string;
                scientific: string;
                percent: string;
                CNY: string;
                USD: string;
                EUR: string;
                shortDate: string;
                longDate: string;
                time: string;
            };
        };
        zh: {
            cut: string;
            copy: string;
            paste: string;
            undo: string;
            redo: string;
            onlyPasteValue: string;
            delete: string;
            paintformat: string;
            clearformat: string;
            valueformat: string;
            increase_dicimal: string;
            reduce_dicimal: string;
            fontFamily: string;
            fontSize: string;
            fontBold: string;
            fontItalic: string;
            fontStrike: string;
            fontUnderline: string;
            fontAlign: string;
            fontVerticalAlign: string;
            fontAutoWrap: string;
            fontColor: string;
            bgColor: string;
            border: string;
            mergeCell: string;
            freezeCell: string;
            insertRow: string;
            insertCol: string;
            deleteRow: string;
            deleteCol: string;
            deleteValue: string;
            deleteStyle: string;
            deleteCell: string;
            theme_color: string;
            insert_others: string;
            insert_pictures: string;
            formats: {
                normal: string;
                text: string;
                number: string;
                scientific: string;
                percent: string;
                CNY: string;
                USD: string;
                EUR: string;
                shortDate: string;
                longDate: string;
                time: string;
            };
        };
    };
    _currentLang: string;
    changeCallbacks: (Function | null)[];
    constructor();
    _deepValue(prop: string, lang: string): unknown;
    changeLang(lang: string): void;
    currentLang(): string;
    onChange(callback: () => void): number;
    clearOnChange(index: number): void;
    t: (code: string) => string;
}
