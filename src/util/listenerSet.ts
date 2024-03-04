import type {Listener} from "./listener.js";

export class ListenerSet<TArgs extends unknown[]> extends Set<Listener<TArgs>> {
    // private _keys?: Map<unknown, Set<Listener<TArgs>>>;
    //
    // add(value: Listener<TArgs>, key?: unknown): this {
    //     // Add the key, if provided
    //     if (key !== undefined) {
    //         if (!this._keys) {
    //             this._keys = new Map();
    //         }
    //
    //         let keySet = this._keys.get(key);
    //         if (!keySet) {
    //             keySet = new Set();
    //             this._keys.set(key, keySet);
    //         }
    //
    //         keySet.add(value);
    //     }
    //
    //     // Add the listener
    //     return super.add(value);
    // }
    //
    // delete(value: Listener<TArgs>): boolean {
    //     if (this._keys) {
    //         for (const keySet of this._keys.values()) {
    //             keySet.delete(value);
    //         }
    //     }
    //
    //     return super.delete(value);
    // }
    //
    // clear(key?: unknown) {
    //     if (key) {
    //         const toRemove = this._keys?.get(key);
    //         if (toRemove) {
    //             for (const listener of toRemove) {
    //                 super.delete(listener);
    //             }
    //         }
    //         this._keys?.delete(key);
    //
    //     } else {
    //         this._keys?.clear();
    //         super.clear();
    //     }
    // }

    public emit(...args: TArgs): void {
        for (const listener of this) {
            listener(...args);
        }
    }

    public emitWith(args: TArgs): void {
        for (const listener of this) {
            listener(...args);
        }
    }
}
