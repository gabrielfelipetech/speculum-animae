import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: [
      'src/server/engine/scoring/__tests__/**/*.test.ts',
      'server/**/__tests__/**/*.test.ts',
      'src/**/__tests__/**/*.test.ts',
    ],
  },
});
