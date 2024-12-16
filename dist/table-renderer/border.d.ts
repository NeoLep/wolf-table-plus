import Range from './range';
import type { Border, Area, Rect, BorderType } from '.';
export declare function borderRanges(area: Area, [ref, type, ...borderOther]: Border, areaMerges: Range[]): [Range, Rect, BorderType][];
