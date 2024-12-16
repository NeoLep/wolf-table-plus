import type { Style } from '../table-renderer';
import type Cells from './cells';
export type SupportFormats = 'normal' | 'text' | 'number' | 'scientific' | 'percent' | 'CNY' | 'USD' | 'EUR' | 'YYYY-MM-DD' | 'HH:mm:ss' | 'YYYY-MM-DD HH:mm:ss';
export declare const injectFormatters: (cells: Cells, _getStyle: (index: number) => Partial<Style>) => void;
