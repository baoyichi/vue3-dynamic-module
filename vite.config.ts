import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./examples', import.meta.url))
    }
  },
  build: {
    outDir: 'lib',
    // 库编译模式配置
    lib: {
      // 指定组件编译入口文件
      entry: resolve(__dirname, 'packages/index.js'),
      name: 'Vue3DynamicModule',
      fileName: 'vue3-dynamic-module'
    },
    // rollup 打包配置
    rollupOptions: {
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下位这些外部化的依赖提供全局变量
        globals: {
          vue: 'vue'
        }
      }
    }
  }
})
