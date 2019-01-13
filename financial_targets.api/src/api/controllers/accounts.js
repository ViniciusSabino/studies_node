import service from '../services/accounts';

const addAccount = async ctx => {
  const data = await service.saveAccount(ctx.request.body);
  return ctx.created({ data });
};

const listAccounts = async ctx =>
  await ctx.ok({
    ok: 'Listar mensalidades'
  });

const listAllAccounts = async ctx => {
  const { userid } = ctx.request.header;
  const data = await service.listAllAccounts(userid);
  return ctx.ok(data);
};

const editAccount = async ctx => {
  const { accountid } = ctx.request.header;
  const data = await service.editAccount(accountid, ctx.request.body);
  return ctx.ok({ data });
};

const deleteAccounts = async ctx => {
  const { accountsIds } = ctx.request.body;
  await service.deleteAccounts(accountsIds);
  return ctx.ok();
};

const makePayment = async ctx => {
  const { accountsIds } = ctx.request.body;
  const data = await service.makePayment(accountsIds);
  return ctx.ok({ data });
};

const makePartialPayment = async ctx => {
  const { amountPaid, accountId } = ctx.request.body;
  const data = await service.makePartialPayment({ amountPaid, accountId });
  return data.errors.length ? ctx.badRequest(data) : ctx.ok(data);
};

const sendNext = async ctx => {
  const { accountid } = ctx.request.header;
  const data = await service.sendNext(accountid);
  return ctx.ok({ data });
};

export default {
  addAccount,
  listAccounts,
  listAllAccounts,
  editAccount,
  deleteAccounts,
  makePayment,
  makePartialPayment,
  sendNext
};
