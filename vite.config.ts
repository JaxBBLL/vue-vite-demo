import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import eslint from 'vite-plugin-eslint';
import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const isDev = mode === 'development';

  const config: UserConfig = {
    base: env.VITE_BASE,
    server: {
      open: true,
      port: 8300,
      proxy: {
        '/local_proxy': {
          target: 'http://192.168.16.109:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/\/local_proxy/, '')
        }
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: !isDev,
          drop_debugger: !isDev
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              const moduleId = id.toString().split('node_modules/')[1].split('/')[0].toString();
              const configMap: {
                [propName: string]: string[];
              } = {
                lib: ['vue', '@vue', 'vue-router', 'axios', 'pinia', 'vue-demi']
              };
              for (const key in configMap) {
                if (configMap[key].includes(moduleId)) {
                  return key;
                }
              }
              return 'vendor';
            }
          },
          entryFileNames: 'js/[name].[hash].js', // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          chunkFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
          assetFileNames: '[ext]/[name].[hash].[ext]' // 用于输出静态资源的命名，[ext]表示文件扩展名
        }
      }
    },
    plugins: [
      Unocss(),
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia']
      }),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      eslint({
        exclude: ['**/node_modules/**', 'public/**'],
        cache: false
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/styles/var.less";',
          javascriptEnabled: true
        }
      }
    }
  };
  return config;
});
