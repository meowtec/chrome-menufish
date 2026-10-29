/* eslint-disable no-undef */
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { zip } from 'cross-zip';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import replace from '@rollup/plugin-replace';
import { marked } from 'marked';
import pkg from './package.json' assert { type: 'json' };
import manifest from './manifest.js';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn('npm', ['run', 'serve', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = [
  {
    input: 'src/entry/background.ts',
    output: 'background.js',
  },
  {
    input: 'src/entry/options.ts',
    output: 'options.js',
  },
].map(({ input, output }) => ({
  input,
  output: {
    dir: './public/dist',
    name: output,
    format: 'esm',
  },

  plugins: [
    scss({ fileName: 'bundle.css', outputStyle: 'compressed' }),

    {
      name: 'md',

      transform(md, id) {
        if (!/\.md$/.test(id)) return null;

        return `export default ${JSON.stringify(marked(md))};`;
      },
    },

    {
      name: 'zip',
      writeBundle() {
        fs.writeFileSync(
          fileURLToPath(new URL('./public/manifest.json', import.meta.url)),
          JSON.stringify(manifest, null, '  '),
        );

        if (production) {
          try {
            fs.rmSync(`./public-${pkg.version}.zip`);
          } catch {
            /* */
          }

          zip('public', `public-${pkg.version}.zip`);
        }
      },
    },

    replace({
      preventAssignment: true,
      values: {
        'window.EXT_VERSION': JSON.stringify(pkg.version),
        'process.env.NODE_ENV': JSON.stringify(
          production ? 'production' : 'development',
        ),
      },
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
      outDir: 'public/dist/ts',
    }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}));

export default options;
