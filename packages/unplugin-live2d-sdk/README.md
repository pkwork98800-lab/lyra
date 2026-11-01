<a name="readme-top"></a>

# `@proj-lyra/unplugin-live2d-sdk`

Helper plugin for helping installing Live2D SDK.

> [!NOTE]
>
> This project is part of (and also associate to) the [Project LYRA](https://github.com/lyra-org/lyra), we aim to build a LLM-driven VTuber like [Neuro-sama](https://www.youtube.com/@Neurosama) (subscribe if you didn't!) if you are interested in, please do give it a try on [live demo](https://lyra.local).

## Installation

Pick the package manager of your choice:

```shell
ni @proj-lyra/unplugin-live2d-sdk -D # from @antfu/ni, can be installed via `npm i -g @antfu/ni`
pnpm i @proj-lyra/unplugin-live2d-sdk -D
yarn i @proj-lyra/unplugin-live2d-sdk -D
npm i @proj-lyra/unplugin-live2d-sdk -D
```

### UnoCSS usage

```typescript
import { DownloadLive2DSDK } from '@proj-lyra/unplugin-live2d-sdk/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    DownloadLive2DSDK(),
  ]
})
```

## Other side projects born from Project LYRA

- [Awesome AI VTuber](https://github.com/proj-lyra/awesome-ai-vtuber): A curated list of AI VTubers and related projects
- [`unspeech`](https://github.com/lyra-org/unspeech): Universal endpoint proxy server for `/audio/transcriptions` and `/audio/speech`, like LiteLLM but for any ASR and TTS
- [`hfup`](https://github.com/lyra-org/hfup): tools to help on deploying, bundling to HuggingFace Spaces
- [`xsai-transformers`](https://github.com/lyra-org/xsai-transformers): Experimental [🤗 Transformers.js](https://github.com/huggingface/transformers.js) provider for [xsAI](https://github.com/lyra-org/xsai).
- [WebAI: Realtime Voice Chat](https://github.com/proj-lyra/webai-realtime-voice-chat): Full example of implementing ChatGPT's realtime voice from scratch with VAD + STT + LLM + TTS.
- [`@proj-lyra/drizzle-duckdb-wasm`](https://github.com/lyra-org/lyra/tree/main/packages/drizzle-duckdb-wasm/README.md): Drizzle ORM driver for DuckDB WASM
- [`@proj-lyra/duckdb-wasm`](https://github.com/lyra-org/lyra/tree/main/packages/duckdb-wasm/README.md): Easy to use wrapper for `@duckdb/duckdb-wasm`
- [Lyra Factorio](https://github.com/lyra-org/lyra-factorio): Allow Lyra to play Factorio
- [Factorio RCON API](https://github.com/nekomeowww/factorio-rcon-api): RESTful API wrapper for Factorio headless server console
- [`autorio`](https://github.com/lyra-org/lyra-factorio/tree/main/packages/autorio): Factorio automation library
- [`tstl-plugin-reload-factorio-mod`](https://github.com/lyra-org/lyra-factorio/tree/main/packages/tstl-plugin-reload-factorio-mod): Reload Factorio mod when developing
- [Velin](https://github.com/luoling8192/velin): Use Vue SFC and Markdown to write easy to manage stateful prompts for LLM
- [`demodel`](https://github.com/lyra-org/demodel): Easily boost the speed of pulling your models and datasets from various of inference runtimes.
- [`inventory`](https://github.com/lyra-org/inventory): Centralized model catalog and default provider configurations backend service
- [MCP Launcher](https://github.com/lyra-org/mcp-launcher): Easy to use MCP builder & launcher for all possible MCP servers, just like Ollama for models!
- [🥺 SAD](https://github.com/lyra-org/sad): Documentation and notes for self-host and browser running LLMs.
