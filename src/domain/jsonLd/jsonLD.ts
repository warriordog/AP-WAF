// export interface LDDocument {
//     context: LDContext;
// }
//
// export interface LDObject {
//     [property: string]: unknown[] | undefined;
// }
//
// export class LDContext {
//     private readonly _entries
//
//     constructor(raw?: unknown)
//     {
//         addRaw(this, raw);
//     }
//
//     add(entry: string | object): void {
//
//     }
//
//     toJson() {
//         return _entries
//     }
// }
//
// function addRaw(context: LDContext, raw: unknown) {
//     if (!raw)
//         return;
//
//     if (typeof(raw) === 'string')
//         context.add(raw);
//
//     if (typeof(raw) === 'object') {
//         if (Array.isArray(raw)) {
//             for (const entry of raw) {
//                 addRaw(context, entry);
//             }
//         } else {
//             context.add(raw);
//         }
//     }
// }
