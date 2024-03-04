import {ListenerSet} from "./listenerSet.js";
import {Listener} from "./listener.js";

export class Emitter<TEvents> {
    protected readonly _events: Listeners<TEvents> = {};

    public on<E extends keyof Events<TEvents>>(eventName: E, listener: Listener<Events<TEvents>[E]>): this {
        let listeners= this._events[eventName];
        if (!listeners) {
            listeners = new ListenerSet();
            this._events[eventName] = listeners;
        }

        listeners.add(listener);
        return this;
    }

    public once<E extends keyof Events<TEvents>>(eventName: E, listener: Listener<Events<TEvents>[E]>): this {
        return this.on(eventName, (...args) => {
            this.off(eventName, listener);
            listener(...args);
        });
    }

    public off<E extends keyof Events<TEvents>>(eventName: E, listener: Listener<Events<TEvents>[E]>): this {
        const listeners= this._events[eventName];
        listeners?.delete(listener);

        return this;
    }

    protected emit<E extends keyof Events<TEvents>>(eventName: E, ...args: Events<TEvents>[E]): this {
        this._events[eventName]?.emitWith(args);
        return this;
    }

    protected emitWith<E extends keyof Events<TEvents>>(eventName: E, args: Events<TEvents>[E]): this {
        this._events[eventName]?.emitWith(args);
        return this;
    }
}

type Events<T> = {
    [E in keyof T & string]: T[E] extends unknown[] ? T[E] : never;
};
// type Events = Record<string, unknown[]>;
type Listeners<TEvents> = {
    [E in keyof Events<TEvents>]?: ListenerSet<Events<TEvents>[E]>;
}
