import service from "../services/account-service";

const create = async (ctx) => {
    await service.create(ctx.request.body);
    return ctx.created();
};

const find = async (ctx) => {
    const data = await service.find(ctx.request.header);
    return ctx.ok(data);
};

const listAll = async (ctx) => {
    const data = await service.listAll(ctx.request.header);

    return ctx.ok(data);
};

const edit = async (ctx) => {
    const data = await service.edit(ctx.request.body);
    return ctx.ok({ data });
};

const deleteAccount = async (ctx) => {
    const { accountsIds } = ctx.request.body;
    await service.deleteAccount(accountsIds);
    return ctx.ok();
};

const makePayment = async (ctx) => {
    const { accountsIds } = ctx.request.body;
    const data = await service.makePayment(accountsIds);
    return ctx.ok({ data });
};

const makePartialPayment = async (ctx) => {
    const data = await service.makePartialPayment(ctx.request.body);
    return data.errors.length ? ctx.badRequest(data) : ctx.ok(data);
};

const sendNext = async (ctx) => {
    const { accountid } = ctx.request.header;
    const data = await service.sendNext(accountid);
    return ctx.ok({ data });
};

export default {
    create,
    find,
    listAll,
    edit,
    deleteAccount,
    makePayment,
    makePartialPayment,
    sendNext,
};
