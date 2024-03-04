export type Action = ForwardAction | TransformAction | InterceptAction | DropAction;

/**
 * Indicates that the request should be forwarded as-is through the proxy unchanged.
 * This is a no-op / passthrough action.
 */
export interface ForwardAction {
    type: typeof forward;
}

/**
 * Indicates that the request should be modified before being forwarded.
 * The new request is passed to all remaining rules.
 */
export interface TransformAction {
    type: typeof transform;

    /**
     * The modified request to pass on.
     */
    request: Request;
}

/**
 * Indicates that the request should be intercepted (not forwarded).
 * The response is generated directly by AP-WAF.
 * This action is immediate and will end processing.
 *
 */
export interface InterceptAction {
    type: typeof intercept;

    /**
     * The modified response to return.
     */
    response: Response;
}

/**
 * Indicates that the request should be dropped without a response.
 * This action is immediate and will end processing.
 */
export interface DropAction {
    type: typeof drop;
}

export const forward = Symbol('Forward');
export const transform = Symbol('Transform');
export const intercept = Symbol('Intercept');
export const drop = Symbol('Drop');

export function isForwardAction(action: Action): action is ForwardAction {
    return action.type === forward;
}

export function isTransformAction(action: Action): action is TransformAction {
    return action.type === transform;
}

export function isInterceptAction(action: Action): action is InterceptAction {
    return action.type === intercept;
}

export function isDropAction(action: Action): action is DropAction {
    return action.type === drop;
}

export function isActionImmediate(action: Action): boolean {
    return action.type === drop || action.type === intercept;
}

// export function compareActions(a: Action, b: Action): number {
//     return getActionPriority(a) - getActionPriority(b);
// }
//
// // Priority: Drop > Intercept > Transform > Forward
// function getActionPriority(action: Action): number {
//     switch (action.type) {
//         case drop: return 0;
//         case intercept: return 1;
//         case transform: return 2;
//         case forward: return 3;
//         default: throw new Error(`Unknown action type: ${(action as Action).type.description}`);
//     }
// }
