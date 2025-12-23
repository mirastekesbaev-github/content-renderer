import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // или @vitejs/plugin-vue2 для Vue 2 проекта
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    plugins: [
      vue(),
      // Генерируем типы только при сборке библиотеки
      isBuild && dts({ insertTypesEntry: true }),
    ],

    // Настройки для разработки
    server: {
      port: 3000,
    },

    // Настройки сборки библиотеки
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'AdminContentLib',
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        // Указываем внешние зависимости, чтобы они не попали в бандл
        external: ['vue', 'vue-demi'],
        output: {
          globals: {
            vue: 'Vue',
            'vue-demi': 'VueDemi',
          },
        },
      },
    },

    resolve: {
      alias: {
        // Позволяет внутри App.vue импортировать библиотеку через '@'
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'src'),
      },
    },
  }
})
