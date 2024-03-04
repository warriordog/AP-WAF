export type Listener<TArgs extends unknown[]> = (...args: TArgs) => void;

export interface ListenerBlock<TArgs extends unknown[]> {
    readonly callback: Listener<TArgs>;
    readonly key?: unknown;
}
