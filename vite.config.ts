import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ViteComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  const isDev = mode === 'development'
  console.log(isDev, env)

  const config = {
    base: env.VITE_BASE,
    server: {
      open: true,
      port: 9000,
      proxy: {
        '/proxy': {
          target: 'http://192.168.16.109:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/\/proxy/, ''),
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
      }),
      ViteComponents({
        resolvers: [NaiveUiResolver()],
      }),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        // import { fileURLToPath, URL } from 'url'
        // fileURLToPath(new URL('./src', import.meta.url)),
        '@': path.resolve(process.cwd(), './src'),
      },
    },
  }
  return config
})
