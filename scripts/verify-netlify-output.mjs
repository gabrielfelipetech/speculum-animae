import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

function isDirectory(path) {
  if (!existsSync(path)) {
    return false;
  }

  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function isFile(path) {
  if (!existsSync(path)) {
    return false;
  }

  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

function fail(message) {
  console.error(`[verify-netlify-output] ${message}`);
  process.exit(1);
}

const isNetlifyBuild = process.env.NETLIFY === 'true';

if (!isNetlifyBuild) {
  console.log('[verify-netlify-output] NETLIFY!=true, skipping Netlify SSR checks.');
  process.exit(0);
}

const projectRoot = process.cwd();
const distDir = resolve(projectRoot, 'dist');

if (!isDirectory(distDir)) {
  fail(
    'Missing "dist" directory after build. Check netlify.toml publish directory and Nitro Netlify preset.',
  );
}

const markers = [
  {
    label: 'dist/_redirects',
    path: resolve(projectRoot, 'dist', '_redirects'),
    exists: isFile,
  },
  {
    label: '.netlify/functions-internal/server',
    path: resolve(projectRoot, '.netlify', 'functions-internal', 'server'),
    exists: isDirectory,
  },
  {
    label: '.netlify/functions/server',
    path: resolve(projectRoot, '.netlify', 'functions', 'server'),
    exists: isDirectory,
  },
];

const hasAnySsrMarker = markers.some((marker) => marker.exists(marker.path));

if (!hasAnySsrMarker) {
  const expected = markers.map((marker) => marker.label).join(' OR ');
  fail(
    `Netlify SSR output markers not found. Expected ${expected}. Build would publish static-only output and break /api routes.`,
  );
}

console.log('[verify-netlify-output] Netlify SSR output markers found.');
