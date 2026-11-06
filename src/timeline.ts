// Excalidraw Replay — Timeline ported from Nihon 0.2.0 (play/timeline.js)
export interface TimelineItem {
  id: string;
  t: number;
  bbox: [number, number, number, number];
}

export class Timeline {
  private _items: TimelineItem[] = [];
  private _cursor = 0;

  constructor(items: TimelineItem[] = []) {
    this.rebuild(items);
  }

  rebuild(items: TimelineItem[] = []): void {
    const source = Array.isArray(items) ? items : [];
    this._items = source.slice().sort((a, b) => a.t - b.t);
    this._cursor = 0;
  }

  count(): number {
    return this._items.length;
  }

  advanceTo(t: number): TimelineItem[] {
    if (this._items.length === 0) return [];
    if (this._cursor > 0 && t < this._items[this._cursor - 1]!.t) {
      this._cursor = this._findSplitIndex(t);
      return [];
    }
    const newlyRevealed: TimelineItem[] = [];
    while (this._cursor < this._items.length && this._items[this._cursor]!.t <= t) {
      newlyRevealed.push(this._items[this._cursor]!);
      this._cursor++;
    }
    return newlyRevealed;
  }

  seek(t: number): { revealed: TimelineItem[]; pending: TimelineItem[] } {
    const split = this._findSplitIndex(t);
    this._cursor = split;
    return { revealed: this._items.slice(0, split), pending: this._items.slice(split) };
  }

  revealedAt(t: number): TimelineItem[] {
    return this._items.slice(0, this._findSplitIndex(t));
  }

  pendingAt(t: number): TimelineItem[] {
    return this._items.slice(this._findSplitIndex(t));
  }

  nextAfter(t: number): TimelineItem | null {
    const split = this._findSplitIndex(t);
    return split < this._items.length ? this._items[split]! : null;
  }

  bucketsForScrubber(bucketCount: number, duration: number): number[] {
    if (!bucketCount || bucketCount <= 0) return [];
    const count = Math.floor(bucketCount);
    const buckets = new Array(count).fill(0);
    if (!duration || duration <= 0 || this._items.length === 0) return buckets;
    for (let i = 0; i < this._items.length; i++) {
      const itemTime = this._items[i]!.t;
      if (itemTime <= 0) buckets[0]++;
      else if (itemTime >= duration) buckets[count - 1]++;
      else buckets[Math.min(count - 1, Math.max(0, Math.floor((itemTime / duration) * count)))]++;
    }
    return buckets;
  }

  destroy(): void {
    this._items = [];
    this._cursor = 0;
  }

  private _findSplitIndex(t: number): number {
    let low = 0;
    let high = this._items.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (this._items[mid]!.t <= t) low = mid + 1;
      else high = mid;
    }
    return low;
  }
}
