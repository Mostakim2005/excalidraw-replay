// Excalidraw Replay — SessionClock ported from Nihon 0.2.0 (record/sessionClock.js)
export type ClockState = "idle" | "running" | "paused";

export class SessionClock {
  private _now: () => number;
  private _accumulated = 0;
  private _startTime: number | null = null;
  private _state: ClockState = "idle";

  constructor(options: { now?: () => number; initialTime?: number } = {}) {
    this._now = typeof options.now === "function" ? options.now : () => Date.now() / 1000;
    this._accumulated = typeof options.initialTime === "number" ? Math.max(0, options.initialTime) : 0;
  }

  start(initialOffset?: number): number {
    if (typeof initialOffset === "number") this._accumulated = Math.max(0, initialOffset);
    this._startTime = this._now();
    this._state = "running";
    return this.elapsed();
  }

  pause(): number {
    if (this._state === "running") {
      const current = this._now();
      this._accumulated += Math.max(0, current - (this._startTime ?? current));
      this._startTime = null;
      this._state = "paused";
    }
    return this.elapsed();
  }

  resume(): number {
    if (this._state === "paused") {
      this._startTime = this._now();
      this._state = "running";
    }
    return this.elapsed();
  }

  stop(): number {
    if (this._state === "running") {
      const current = this._now();
      this._accumulated += Math.max(0, current - (this._startTime ?? current));
      this._startTime = null;
    }
    this._state = "idle";
    return this.elapsed();
  }

  reset(): void {
    this._accumulated = 0;
    this._startTime = null;
    this._state = "idle";
  }

  elapsed(): number {
    if (this._state === "running" && this._startTime !== null) {
      return this._accumulated + Math.max(0, this._now() - this._startTime);
    }
    return this._accumulated;
  }

  state(): ClockState {
    return this._state;
  }

  isRunning(): boolean { return this._state === "running"; }
  isPaused(): boolean { return this._state === "paused"; }
  isIdle(): boolean { return this._state === "idle"; }
  destroy(): void { this.reset(); }
}
