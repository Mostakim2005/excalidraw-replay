# Excalidraw Replay

> [!NOTE]
> **Live Plug-and-Play Runtime Available**: The `runtime/` directory contains the production-tested JavaScript bundle (`main.js`, `manifest.json`, and `styles.css`) running directly in the live Obsidian vault. While the TypeScript codebase (`src/`) is undergoing reverse-engineering for official Obsidian community plugin standards, the files in `runtime/` can be copied directly into your vault's `.obsidian/plugins/excalidraw-replay/` for immediate plug-and-play use.

Record audio while drawing in Excalidraw and replay the strokes in sync with the audio.

Target version: `v0.2.0`. This repo is being reverse-engineered from the live bundled JS back to Obsidian-standard TypeScript.

## Develop

- `npm i` (Node 18+), `npm run dev`, `npm run build` -> `main.js`

Manual install: copy `main.js`, `manifest.json`, `styles.css` to `<Vault>/.obsidian/plugins/excalidraw-replay/`.

## License

Code: PolyForm Noncommercial 1.0.0 (see `LICENSE`). Docs: CC BY-NC 4.0. Copyright (c) Mostakim2005. Source-available: free non-commercial use with credit, no commercial use.