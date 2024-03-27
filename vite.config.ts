import dts from 'vite-plugin-dts';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //
    react(),
    libInjectCss(),
    dts({ include: 'lib', insertTypesEntry: true }),
    splitVendorChunkPlugin(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['cjs', 'es'],
      fileName: 'main',
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'mobx', 'mobx-react-lite'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
