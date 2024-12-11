export const uploadPicture = (accept?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        if (accept) {
            input.setAttribute('accept', accept)
        }
        input.click()

        input.onchange = (event) => {
            if (event.target && (event.target as HTMLInputElement).files) {
                const file = (event.target as HTMLInputElement).files![0]
                if (!file) {
                    reject('files.length is zero')
                }
                const reader = new FileReader()
                reader.onload = function (e) {
                    const contents = e.target?.result
                    // 在这里可以对文件内容进行处理
                    // console.log(contents);
                    resolve(contents as string)
                }
                reader.readAsDataURL(file)
            } else {
                reject('event error')
            }
        }
    })
}
