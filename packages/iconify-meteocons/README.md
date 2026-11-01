<a name="readme-top"></a>

<div>
  <img width="64" height="64" src="https://raw.githubusercontent.com/proj-lyra/iconify-meteocons/refs/heads/main/docs/examples/overcast-day-hail-fill.svg" alt="Icon for overcast-day-hail-fill" />
  <img width="64" height="64" src="https://raw.githubusercontent.com/proj-lyra/iconify-meteocons/refs/heads/main/docs/examples/partly-cloudy-night-sleet-fill.svg" alt="Icon for partly-cloudy-night-sleet-fill" />
  <img width="64" height="64" src="https://raw.githubusercontent.com/proj-lyra/iconify-meteocons/refs/heads/main/docs/examples/thunderstorms-day-extreme-rain-line.svg" alt="Icon for thunderstorms-day-extreme-rain-line" />
  <img width="64" height="64" src="https://raw.githubusercontent.com/proj-lyra/iconify-meteocons/refs/heads/main/docs/examples/uv-index-2-fill.svg" alt="Icon for uv-index-2-fill" />
</div>

# [Meteocons](https://bas.dev/work/meteocons) ported into [Iconify](https://iconify.design/)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Nice looking animated flatten design SVG icons and Icon Collection. See them all on one page at [Meteocons](https://bas.dev/work/meteocons).<br/>
Contributions, corrections & requests can be made on their [GitHub repository](https://github.com/basmilius/weather-icons).

This enables you to use Meteocons in UnoCSS or any Iconify compatible scenario.

> [!NOTE]
>
> This project is part of (and also associate to) the [Project LYRA](https://github.com/lyra-org/lyra), we aim to build a LLM-driven VTuber like [Neuro-sama](https://www.youtube.com/@Neurosama) (subscribe if you didn't!) if you are interested in, please do give it a try on [live demo](https://lyra.local).

## Installation

Pick the package manager of your choice:

```shell
ni @proj-lyra/iconify-meteocons -D # from @antfu/ni, can be installed via `npm i -g @antfu/ni`
pnpm i @proj-lyra/iconify-meteocons @iconify/utils -D
yarn i @proj-lyra/iconify-meteocons @iconify/utils -D
npm i @proj-lyra/iconify-meteocons @iconify/utils -D
```

### UnoCSS usage

```typescript
import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
import { presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    // Other presets
    presetIcons({
      scale: 1.2,
      collections: {
        ...createExternalPackageIconLoader('@proj-lyra/iconify-meteocons'),
      },
    }),
  ],
})
```

Now you can use it with UnoCSS's `i-` syntax:

```html
<div class i-meteocons:overcast-day-haze-fill></div>
```

[npm-version-src]: https://img.shields.io/npm/v/@proj-lyra/iconify-meteocons?style=flat&colorA=080f12&colorB=2a64be
[npm-version-href]: https://npmjs.com/package/@proj-lyra/iconify-meteocons
[npm-downloads-src]: https://img.shields.io/npm/dm/@proj-lyra/iconify-meteocons?style=flat&colorA=080f12&colorB=2a64be
[npm-downloads-href]: https://npmjs.com/package/@proj-lyra/iconify-meteocons
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@proj-lyra/iconify-meteocons?style=flat&colorA=080f12&colorB=2a64be&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@proj-lyra/iconify-meteocons
[license-src]: https://img.shields.io/github/license/proj-lyra/iconify-meteocons.svg?style=flat&colorA=080f12&colorB=2a64be
[license-href]: https://github.com/proj-lyra/iconify-meteocons/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=2a64be
[jsdocs-href]: https://www.jsdocs.io/package/@proj-lyra/iconify-meteocons
