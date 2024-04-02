import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { checker } from 'vite-plugin-checker';
import { resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const envs = loadEnv(mode, process.cwd(), 'VITE_'); // load VITE_ prefix envs
  console.log(mode);

  return {
    server: {
      port: 8000,
    },
    plugins: [
      //
      react(),
      libInjectCss(),
      dts({ include: 'lib', insertTypesEntry: true }),
      splitVendorChunkPlugin(),
      checker({
        typescript: true,
        enableBuild: true,
        overlay: false,
      }),
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
  };
});
