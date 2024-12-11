import { defineConfig } from 'vite'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))
const pkgName = packageJson.name

export default defineConfig({
    build: {
        lib: {
            entry: './lib/index.ts',
            name: pkgName,
            fileName: pkgName,
        },
    },
})
