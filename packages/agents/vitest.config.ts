import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: '@proj-lyra/agents',
    include: ['src/**/*.test.ts'],
  },
})
