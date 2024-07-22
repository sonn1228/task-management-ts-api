"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper = (objPagination, query, countRecords) => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objPagination.limitItems = parseInt(query.limit);
    }
    objPagination.skip =
        (objPagination.currentPage - 1) * objPagination.limitItems;
    objPagination.totalPage = Math.ceil(countRecords / objPagination.limitItems);
    return objPagination;
};
exports.default = paginationHelper;
