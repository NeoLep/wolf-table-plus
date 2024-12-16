# WolfTablePlus

基于 [WolfTable](https://github.com/wolf-table/table) 进行完善的 web table 库

## LICENSE
[MIT](https://github.com/NeoLep/wolf-table-plus?tab=MIT-1-ov-file)

## Install
`pnpm / npm i wolf-table-plus`

## Usage
```typescript
    import WolfTablePlus from 'wolf-table-plus'
    const container = document.querySelector('#container')
    const wt = WolfTablePlus.create(
        container,
        () => container.clientWidth,
        () => container.clientHeight,
        {
            scrollable: true,
            resizable: true,
            selectable: true,
            editable: true,
            copyable: true,
            data: {
                // cols: 30,
                // rows: 103,
            },
        },
    )
        .render()
```


## Development
`pnpm dev`




## 目前已支持的功能
- 基础功能
    - 输入文字
    - 输出到 HTML
    - 插入图片
- 顶部菜单栏
    - 撤销/恢复操作
    - 格式刷
    - 清除单元格样式
    - 格式化单元格
    - 字体设置
    - 字号设置
    - 文字加粗
    - 斜体
    - 中划线
    - 下划线
    - 文字颜色
    - 单元格背景色
    - 边框设置
    - 合并单元格
    - 文字 (水平/垂直) 对齐
    - 自动换行
    - 冻结单元格
    - 单元格下拉选功能 [TODO]
    - 公式功能 [TODO]
- 右键菜单
    - 撤销/恢复
    - 剪切
    - 复制/粘贴
    - 粘贴内容
    - 插入行/列
    - 删除行/列
    - 清空内容
    - 清空格式
    - 完全清空
- 键盘控制
    - up/down/left/right - 移动单元格
    - ctrl + x - 剪切
    - ctrl + c - 复制
    - ctrl + v - 粘贴
    - ctrl + z - 撤销
    - ctrl + y - 恢复
    - ctrl + b - 字体加粗
    - ctrl + u - 下划线
    - ctrl + i - 斜体
    - Esc - 当存在复制或剪切时取消选中的单元格
    - Backspace - 删除内容
    - shift + Backspace - 删除样式
    - delete - 完全删除
- OTHERS
    - 支持扩展功能 - 可以自定义渲染器
    - 显示图片 [done v.0.1]
