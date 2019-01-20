import moment from "moment";

import enumerators from "./enumerators";

const getCurrentDate = () => moment().format();

const getDaysInCurrentMonth = () => moment().daysInMonth();

const createMomentDate = date => moment(date);

const getDateDifference = (differenceType, dateA, dateB) => {
    const { differences } = enumerators.others.date;
    switch (differenceType) {
        case differences.milliseconds:
            return dateA.diff(dateB);
        case differences.minutes:
            return dateA.diff(dateB, differences.minutes);
        case differences.hours:
            return dateA.diff(dateB, differences.hours);
        case differences.days:
            return dateA.diff(dateB, differences.days);
        case differences.weeks:
            return dateA.diff(dateB, differences.weeks);
        case differences.months:
            return dateA.diff(dateB, differences.months);
        case differences.years:
            return dateA.diff(dateA, differences.years, true);
    }
};

const createResult = (data, page = 1, perPage = 20) => {
    return {
        count: data?.length ? data.length : 0,
        page,
        perPage,
        data
    };
};

export default {
    getCurrentDate,
    getDaysInCurrentMonth,
    createMomentDate,
    getDateDifference,
    createResult
};
