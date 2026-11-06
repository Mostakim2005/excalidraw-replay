// Excalidraw Replay — pilot TS scaffold from Mostakim2005 template.
// Full 25-module JS bundle split is incremental. See README parity checklist.
export interface ExcalidrawSettings {
  revealInterval: number;
  autoFollow: boolean;
  showSubtitles: boolean;
  enableRecordingFrameOutline: boolean;
  recordPointer: boolean;
  glassmorphism: boolean;
  debugEvents: boolean;
}

export const DEFAULT_SETTINGS: ExcalidrawSettings = {
  revealInterval: 0.5,
  autoFollow: true,
  showSubtitles: true,
  enableRecordingFrameOutline: true,
  recordPointer: false,
  glassmorphism: true,
  debugEvents: true,
};
