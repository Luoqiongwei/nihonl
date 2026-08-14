import { defineConfig } from 'astro/config';

// GitHub Pages 部署在 https://luoqiongwei.github.io/nihonl/
export default defineConfig({
  site: 'https://luoqiongwei.github.io',
  base: '/nihonl/',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
