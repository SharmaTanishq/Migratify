import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'edge-runtime',
    include: ['**/*.test.ts'],
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
    globals: true,
  },
}); 