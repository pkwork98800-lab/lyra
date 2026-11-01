import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: '@proj-lyra/core-agent',
    include: ['src/**/*.test.ts'],
  },
})
