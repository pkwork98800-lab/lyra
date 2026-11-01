# @proj-lyra/three-mmd-physics-ammo

Ammo.js physics plugin for `@proj-lyra/three-mmd`.

## Install

```bash
pnpm add @proj-lyra/three-mmd @proj-lyra/three-mmd-physics-ammo
```

## Usage

Register `MMDAmmoPlugin` before loading the model:

```ts
import { MMDLoader } from '@proj-lyra/three-mmd'
import { MMDAmmoPlugin } from '@proj-lyra/three-mmd-physics-ammo'

const mmd = await new MMDLoader()
  .register(MMDAmmoPlugin)
  .loadAsync('/models/miku_v2.pmd')
```

The plugin initializes the shared Ammo runtime and installs a physics service
on the resulting `MMD`. For direct use of `MMDAmmoPhysics`, call `initAmmo()`
first.

```ts
import { initAmmo, MMDAmmoPhysics } from '@proj-lyra/three-mmd-physics-ammo'

await initAmmo()
mmd.setPhysics(MMDAmmoPhysics)
```

## License

[MIT](../../LICENSE.md)
