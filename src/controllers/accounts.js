import * as service from '../services';

const create = async (ctx) => {
    const { body } = ctx.request;

    const account = await service.create(body);

    return ctx.created(account);
};

const find = async (ctx) => {
    const { header } = ctx.request;

    const accounts = await service.find(header);

    return ctx.ok(accounts);
};

export default {
    create,
    find,
};
