import { reject } from '../dist/domain/filter/action.js';

/** @type {Rule} **/
export const rejectAll = {
    id: 'reject-all',

    name: 'Reject All',
    description: 'Rejects all traffic',

    async transformIncoming() {
        return { type: reject };
    },

    async transformOutgoing() {
        return { type: reject };
    }
};
