import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contentType, resolvePath, startServer } from './serve.mjs';

test('contentType knows the file types the game uses', () => {
  assert.equal(contentType('index.html'), 'text/html; charset=utf-8');
  assert.equal(contentType('src/main.js'), 'text/javascript; charset=utf-8');
  assert.equal(contentType('unknown.bin'), 'application/octet-stream');
});

test('resolvePath serves index.html for the root and stays below the repository', () => {
  assert.match(resolvePath('/'), /\/index\.html$/);
  assert.match(resolvePath('/src/main.js'), /\/src\/main\.js$/);
  assert.doesNotMatch(resolvePath('/../../etc/passwd'), /\.\./);
});

test('the server answers with the index page and a 404 for missing files', async () => {
  const server = await startServer(0);
  const base = `http://localhost:${server.address().port}`;
  try {
    const index = await fetch(`${base}/`);
    assert.equal(index.status, 200);
    assert.equal(index.headers.get('content-type'), 'text/html; charset=utf-8');
    const missing = await fetch(`${base}/nope.js`);
    assert.equal(missing.status, 404);
  } finally {
    server.close();
  }
});
