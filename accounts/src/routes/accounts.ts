import Router from 'koa-joi-router';

import controller from '../controllers/accounts';
import * as validator from '../domain/validators/account';

const router = Router();

router.prefix('/accounts');

router.route([
    {
        method: 'POST',
        path: '/',
        handler: [validator.create, controller.create],
    },
    {
        method: 'GET',
        path: '/',
        handler: [controller.find],
    },
    {
        method: 'PATCH',
        path: '/partiallypayment',
        handler: [
            validator.patchPartiallyPayment,
            validator.partiallyPayment,
            controller.partiallyPayment,
        ],
    },
]);

export default router;