"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchHelper = (query) => {
    let objSearch = {
        keyword: "",
    };
    if (query.keyword) {
        objSearch.keyword = query.keyword;
        const regex = new RegExp(objSearch.keyword, "i");
        objSearch.regex = regex;
    }
    return objSearch;
};
exports.default = searchHelper;
