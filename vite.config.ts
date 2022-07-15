import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  const isDev = mode === 'development'

  const config = {
    base: env.VITE_BASE,
    server: {
      open: true,
      port: 9000,
      proxy: {
        '/local_proxy': {
          target: 'http://192.168.16.109:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/\/local_proxy/, ''),
        },
      },
    },
    build: {
      minify: 'terser',
      targets: ['es2015'],
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              const moduleId = id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()

              if (
                ['vue', 'vue-router', 'axios', 'pinia', 'vue-demi'].includes(
                  moduleId,
                )
              ) {
                return 'lib'
              } else {
                return 'vendor'
              }
            }
          },
          entryFileNames: 'js/[name].[hash].js', // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          chunkFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
          assetFileNames: '[ext]/[name].[hash].[ext]', // 用于输出静态资源的命名，[ext]表示文件扩展名
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ].concat(
      isDev
        ? []
        : [
            legacy({
              targets: ['defaults', 'not IE 11'],
            }),
          ],
    ),
    resolve: {
      alias: {
        // import { fileURLToPath, URL } from 'url'
        // fileURLToPath(new URL('./src', import.meta.url)),
        '~': path.resolve(process.cwd(), './'),
        '@': path.resolve(process.cwd(), './src'),
      },
    },
  }
  return config
})
