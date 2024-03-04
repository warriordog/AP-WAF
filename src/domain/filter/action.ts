/**
 * Indicates that the request should be forwarded as-is through the proxy unchanged.
 * This is a no-op / passthrough action.
 */
export const forward = Symbol('Forward');

/**
 * Indicates that the request should be modified before being forwarded.
 * The new request is passed to all remaining rules.
 */
export const transform = Symbol('Transform');

/**
 * Indicates that the request should be intercepted (not forwarded).
 * The response is generated directly by AP-WAF.
 * This action is immediate and will end processing.
 *
 */
export const intercept = Symbol('Intercept');

/**
 * Indicates that the request should be dropped without a response.
 * This action is immediate and will end processing.
 */
export const drop = Symbol('Drop');

export type Action = RequestAction | ResponseAction;

export type RequestAction = ForwardAction | TransformAction | InterceptAction | DropAction;
export type ResponseAction = ForwardAction | TransformAction;

export type ForwardAction = typeof forward;
export type TransformAction = typeof transform;
export type InterceptAction = typeof intercept;
export type DropAction = typeof drop;
