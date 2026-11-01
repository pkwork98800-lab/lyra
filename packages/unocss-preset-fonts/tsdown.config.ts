import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    './src/index.ts',
  ],
  noExternal: [
    '@proj-lyra/font-cjkfonts-allseto',
    '@proj-lyra/font-departure-mono',
    '@proj-lyra/font-xiaolai',
  ],
  dts: true,
  sourcemap: true,
})
