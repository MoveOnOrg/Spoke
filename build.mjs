
import * as esbuild from 'esbuild'
import { execSync } from 'child_process';

// Ensure dependencies are installed without devDependencies
execSync('yarn install --production --frozen-lockfile', { stdio: 'inherit' });

await esbuild.build({
  entryPoints: ['./handler.js'],
  bundle: true,
  minify: true,
  treeShaking: true,
  sourcemap: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  outdir: 'build',
  allowOverwrite: true,
  // logLevel: "debug",  // Uncomment for additional logging
  external: [
    'bull',
    'fakeredis',
    'better-sqlite3',
    'sqlite3',
    'tedious',
    'oracledb',
    'oracle',
    'mysql2',
    'mssql', 
    'mysql'
  ],
  loader: {
    '.map': 'file',
    '.md': 'file',
    '.csv': 'file',
    '.sql': 'file'
  },
});

