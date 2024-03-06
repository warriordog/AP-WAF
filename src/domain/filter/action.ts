/**
 * Indicates that the message should be forwarded as-is through the proxy unchanged.
 * This is a no-op / passthrough action.
 */
export const forward = Symbol('Forward');

/**
 * Indicates that the message should be modified before being forwarded.
 * The new request is passed to all remaining rules.
 * This will override any past or future Forward actions.
 */
export const transform = Symbol('Transform');

/**
 * Indicates that the message should be dropped without a response.
 * This action is immediate and will end processing.
 */
export const drop = Symbol('Drop');

/**
 * Indicates that the request should be intercepted (not forwarded).
 * The response is generated directly by AP-WAF.
 * This action is immediate and will end processing.
 *
 * Intercept actions are not available for response filters, as the request has already been sent.
 * Instead, use transform and modify the response appropriately.
 */
export const intercept = Symbol('Intercept');

export type Action = RequestAction | ResponseAction;

export type RequestAction = ForwardAction | TransformAction | DropAction | InterceptAction;
export type ResponseAction = ForwardAction | TransformAction | DropAction;

export type ForwardAction = typeof forward;
export type TransformAction = typeof transform;
export type InterceptAction = typeof intercept;
export type DropAction = typeof drop;
