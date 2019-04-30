import date from "../utils/functions/dates";
import dictionary from "../utils/dictionaries/accounts";
import { accountEnum } from "../utils/enumerators";

const accountStatus = accountEnum.status;

const validDataSubmitted = (account) => {
    const errors = [];

    if (!account.name) errors.push(dictionary.account.nameIsEmpty);

    if (!account.value || account.value < 0) errors.push(dictionary.account.valueIsEmpty);

    if (!account.type) errors.push(dictionary.account.typeIsEmpty);

    if (!account.paymentForm) errors.push(dictionary.account.paymentFormIsEmpty);

    if (!account.dueDate) errors.push(dictionary.account.dueDateIsEmpty);

    if (account.amountPaid > account.value) errors.push(dictionary.account.amountPaidIsInvalid);
    else if (account.amountPaid < 0) errors.push(dictionary.account.amoountPaidIsNegative);

    if (!account.userId) errors.push(dictionary.account.userIdIsEmpty);

    return errors;
};

const validCreate = (ctx, next) => {
    const account = ctx.request.body;

    const errors = validDataSubmitted(account);

    const currentDate = date.getCurrentDate();

    if (!errors.length) {
        account.status = do {
            if (account.amountPaid === account.value) accountStatus.done;
            else if (account.dueDate < currentDate) accountStatus.expired;
            else accountStatus.pending;
        };
    } else return ctx.badRequest({ errors });

    ctx.request.body = account;

    return next();
};

const validList = (ctx, next) => {
    const { userid } = ctx.request.header;
    return !userid ? ctx.badRequest({ errors: [dictionary.account.userIdIsEmpty] }) : next();
};

const validEdit = (ctx, next) => {
    const account = ctx.request.body;
    const errors = validDataSubmitted(account);
    const currentDate = date.getCurrentDate();

    if (!account._id) errors.push(dictionary.account.accountIdIsEmpty);

    if (!errors.length) {
        if (account.dueDate < currentDate)
            return ctx.badRequest({
                errors: [dictionary.account.dataEditIsInvalid],
            });
        account.status = do {
            if (
                (account.status === accountStatus.expired && account.dueDate > currentDate) ||
                (account.status === accountStatus.done && account.amountPaid < account.value)
            )
                accountStatus.pending;
            else if (
                account.status === accountStatus.pending &&
                account.amountPaid === account.value
            )
                accountStatus.done;
            else account.status;
        };
    } else return ctx.badRequest({ errors });

    ctx.request.body = account;

    return next();
};

const validMakePartialPayment = (ctx, next) => {
    const { accountId } = ctx.request.body;

    return !accountId ? ctx.badRequest({ errors: dictionary.account.accountIdIsEmpty }) : next();
};

export default {
    validCreate,
    validList,
    validEdit,
    validMakePartialPayment,
};
