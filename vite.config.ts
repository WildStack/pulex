import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envs = loadEnv(mode, process.cwd(), 'VITE_'); // load VITE_ prefix envs
  console.log('='.repeat(50) + 'LOAD_ENVS');
  console.log(envs);
  console.log('='.repeat(50));

  const isDev = mode !== 'production';
  const debugWatchBuild = envs?.VITE_DEBUG_WATCH_BUILD === 'true';

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
      ...(debugWatchBuild && isDev && { watch: { clearScreen: true } }),

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
