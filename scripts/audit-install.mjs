// Reproduce published-package installation without touching a real application.
// Network access is required. Third-party lifecycle scripts are disabled.
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const root = mkdtempSync(join(tmpdir(), 'sidepact-install-audit-'));
const cache = join(root, 'cache');
const userconfig = join(root, 'npmrc');
writeFileSync(userconfig, '');
const env = { ...process.env, npm_config_userconfig: userconfig, npm_config_registry: 'https://registry.npmjs.org/' };
const npm = (...args) => spawnSync('npm', args, { encoding: 'utf8', env });
const versions = { node: process.version, npm: npm('--version').stdout.trim() };
const results = [];
function fixture(name, dependencies = {}) {
  const path = join(root, name);
  mkdirSync(path);
  writeFileSync(join(path, 'package.json'), JSON.stringify({ name, version: '1.0.0', private: true, dependencies }, null, 2));
  return path;
}
function install(cwd, args) {
  return spawnSync('npm', ['install', ...args, '--ignore-scripts', '--no-audit', '--no-fund', '--fetch-retries=0', '--fetch-timeout=20000', '--cache', cache], { cwd, encoding: 'utf8', env });
}
function check(result, expected, label) {
  const output = result.stdout + result.stderr;
  if (expected === 'success') assert.equal(result.status, 0, `${label}\n${output}`);
  else { assert.notEqual(result.status, 0, label); assert.match(output, /ERESOLVE/, label); assert.match(output, /react-quill/, label); }
  results.push({ label, outcome: result.status === 0 ? 'success' : 'ERESOLVE' });
}
try {
  const clean = fixture('clean-project');
  check(install(clean, ['--save-dev', 'sidepact@0.5.0']), 'success', 'clean project + sidepact');
  const react = fixture('react19-project', { react: '19.2.6', 'react-dom': '19.2.6' });
  check(install(react, []), 'success', 'React 19 baseline');
  check(install(react, ['--save-dev', 'sidepact@0.5.0']), 'success', 'React 19 + sidepact');
  const conflict = fixture('conflicting-project', { react: '19.2.6', 'react-dom': '19.2.6', 'react-quill': '2.0.0' });
  // This creates only the deliberately incompatible fixture; it is not a recommended fix.
  check(install(conflict, ['--legacy-peer-deps']), 'success', 'create existing incompatible React/react-quill fixture');
  const beforePackage = readFileSync(join(conflict, 'package.json'), 'utf8');
  const beforeLock = readFileSync(join(conflict, 'package-lock.json'), 'utf8');
  check(install(conflict, ['--save-dev', 'sidepact@0.5.0']), 'ERESOLVE', 'conflicting project + sidepact');
  check(install(conflict, ['--save-dev', 'is-number@7.0.0']), 'ERESOLVE', 'same conflicting project + unrelated zero-dependency control');
  assert.equal(readFileSync(join(conflict, 'package.json'), 'utf8'), beforePackage);
  assert.equal(readFileSync(join(conflict, 'package-lock.json'), 'utf8'), beforeLock);
  const meta = spawnSync('npm', ['view', 'sidepact@0.5.0', '--json', '--cache', cache], { env, encoding: 'utf8' });
  assert.equal(meta.status, 0, meta.stderr);
  const published = JSON.parse(meta.stdout);
  assert.equal(Object.keys(published.dependencies ?? {}).length, 0);
  assert.equal(Object.keys(published.peerDependencies ?? {}).length, 0);
  console.log(JSON.stringify({ versions, package: { name: published.name, version: published.version, dependencies: published.dependencies ?? {}, peerDependencies: published.peerDependencies ?? {} }, results, conflictingFixtureManifestUnchanged: true }, null, 2));
} finally { rmSync(root, { recursive: true, force: true }); }
