import Divider from './buttons/divider'
import UndoButton from './buttons/undo'
import RedoButton from './buttons/redo'
import PaintformatButton from './buttons/paintformat'
import ClearformatButton from './buttons/clearformat'
import ValueFormatButton from './buttons/value-format'
import FontFamilyButton from './buttons/fonts'
import FontSizeButton from './buttons/font-size'
import FastOperateButton from './buttons/fast-operate'
import TextColor from './buttons/text-color'
import FillColor from './buttons/fill-color'
import Border from './buttons/border'
import TextAlignButton from './buttons/text-align'
import TextVerticalAlignButton from './buttons/text-vertical-align'
import type Table from '..'

export default function (table: Table) {
    const { t } = table._i18n
    return [
        new UndoButton(table).tooltip({ title: t('undo'), shortkey: '(Ctrl + Z)' }),
        new RedoButton(table).tooltip({ title: t('redo'), shortkey: '(Ctrl + Y)' }),
        new PaintformatButton(table).tooltip(t('paintformat')),
        new ClearformatButton(table).tooltip(t('clearformat')),
        new Divider(table),
        new ValueFormatButton(table).tooltip(t('valueformat')),
        new FastOperateButton(table, 'increase-dicimal', (fo: FastOperateButton) => {
            fo._?.hide()
        }).tooltip(t('increase_dicimal')),
        new FastOperateButton(table, 'reduce-dicimal', (fo: FastOperateButton) => {
            fo._?.hide()
        }).tooltip(t('reduce_dicimal')),
        new Divider(table),
        new FontFamilyButton(table).tooltip(t('fontFamily')),
        new FontSizeButton(table).tooltip(t('fontSize')),
        new Divider(table),
        new FastOperateButton(table, 'font-bold').tooltip({
            title: t('fontBold'),
            shortkey: '(Ctrl + B)',
        }),
        new FastOperateButton(table, 'font-italic').tooltip({
            title: t('fontItalic'),
            shortkey: '(Ctrl + I)',
        }),
        new FastOperateButton(table, 'strike').tooltip(t('fontStrike')),
        new FastOperateButton(table, 'underline').tooltip({
            title: t('fontUnderline'),
            shortkey: '(Ctrl + U)',
        }),
        new TextColor(table).tooltip(t('fontColor')),
        new Divider(table),
        new FillColor(table).tooltip(t('bgColor')),
        new Border(table).tooltip(t('border')),
        new FastOperateButton(table, 'merge', (fo: FastOperateButton) => {
            fo._?.css('margin-left', '2px')
        }).tooltip(t('mergeCell')),
        new Divider(table),
        new TextAlignButton(table).tooltip(t('fontAlign')),
        new TextVerticalAlignButton(table).tooltip(t('fontVerticalAlign')),
        new FastOperateButton(table, 'textwrap', (fo: FastOperateButton) => {
            fo._?.css('margin-left', '3px')
        }).tooltip(t('fontAutoWrap')),
        new Divider(table),
        new FastOperateButton(table, 'freeze', (fo: FastOperateButton) => {
            fo._?.css('margin-left', '3px')
        }).tooltip(t('freezeCell')),
    ]
}
