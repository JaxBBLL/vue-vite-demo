import { defineConfig, presetAttributify, presetUno, presetWind } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import presetRemToPx from '@unocss/preset-rem-to-px';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind({
      preflight: false
    }),
    presetRemToPx({
      baseFontSize: 4 // 1单位 = 0.25rem = 1px
    })
  ],
  shortcuts: [['wh-full', 'w-full h-full']],
  rules: [],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      red: 'var(--red-color)',
      yellow: 'var(--yellow-color)',
      green: 'var(--green-color)',
      blue: 'var(--blue-color)'
    }
  },
  transformers: [transformerDirectives()]
});
