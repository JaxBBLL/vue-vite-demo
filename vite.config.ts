import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ViteComponents from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  console.log(mode)

  const config = {
    plugins: [
      vue(),
      ViteComponents({
        resolvers: [NaiveUiResolver()],
      }),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
  if (mode === 'staging') {
    return Object.assign(
      {
        base: '/test/',
      },
      config,
    )
  } else {
    return Object.assign(
      {
        base: '/',
      },
      config,
    )
  }
})
