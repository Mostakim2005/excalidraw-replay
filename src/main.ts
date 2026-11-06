import { Plugin, Notice } from "obsidian";
import { DEFAULT_SETTINGS, type ExcalidrawSettings } from "./settings";
// Pilot entry — full 25-module bundle split is incremental. See README parity.
export default class ExcalidrawReplayPlugin extends Plugin {
  settings: ExcalidrawSettings = DEFAULT_SETTINGS;
  async onload() {
    await this.loadSettings();
    this.addRibbonIcon("film", "Excalidraw Replay", () => new Notice("Excalidraw Replay — pilot build."));
    this.addCommand({ id: "open-excalidraw-replay", name: "Open Excalidraw Replay", callback: () => new Notice("Excalidraw Replay — pilot build.") });
  }
  onunload() {}
  async loadSettings() {
    const loaded = (await this.loadData()) as Partial<ExcalidrawSettings> | undefined;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded ?? {});
  }
  async saveSettings() { await this.saveData(this.settings); }
}
