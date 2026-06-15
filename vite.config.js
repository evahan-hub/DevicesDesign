import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';

export default defineConfig({
  base: '/IPP-Design/',
  plugins: [vue()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@adyen/bento-vue2/styles': path.resolve(__dirname, 'node_modules/@adyen/bento-vue2/dist/styles')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        balancePlatform: './balance-platform.html',
      }
    }
  }
});
