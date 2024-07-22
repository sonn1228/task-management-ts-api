"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editPatch = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_helper_1 = __importDefault(require("../../../helpers/pagination.helper"));
const search_helper_1 = __importDefault(require("../../../helpers/search.helper"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[`${req.query.sortKey}`] = req.query.sortValue.toString();
    }
    const countTasks = yield task_model_1.default.countDocuments(find);
    let initPagination = {
        currentPage: 1,
        limitItems: 2,
        skip: 0,
    };
    const objPagination = (0, pagination_helper_1.default)(initPagination, req.query, countTasks);
    const objSearch = (0, search_helper_1.default)(req.query);
    if (req.query.keyword) {
        find.title = objSearch.regex;
    }
    try {
        const tasks = yield task_model_1.default.find(find)
            .sort(sort)
            .limit(objPagination.limitItems)
            .skip(objPagination.skip);
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching tasks." });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const task = yield task_model_1.default.findOne({
            _id: id,
            deleted: false,
        });
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }
        res.json(task);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while fetching the task." });
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.body.status;
    try {
        yield task_model_1.default.updateOne({
            _id: id,
        }, {
            status: status,
        });
        res.json({
            code: 200,
            message: "Update status successfully.",
        });
    }
    catch (error) {
        res.json(error);
    }
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    const key = req.body.key;
    let Key;
    (function (Key) {
        Key["STATUS"] = "status";
        Key["DELETE"] = "delete";
    })(Key || (Key = {}));
    try {
        switch (key) {
            case Key.STATUS:
                const value = req.body.value;
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    status: value,
                });
                break;
            case Key.DELETE:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                }, {
                    deleted: true,
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Not found.",
                });
                return;
        }
        res.json({
            code: 200,
            message: "Update status successfully.",
        });
    }
    catch (error) {
        res.json(error);
    }
});
exports.changeMulti = changeMulti;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_model_1.default(req.body);
        const data = yield task.save();
        res.json({
            code: 200,
            message: "Create successfully.",
            data: data,
        });
    }
    catch (error) {
        res.json(error);
    }
});
exports.create = create;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield task_model_1.default.updateOne({
            _id: id,
        }, req.body);
        res.json({
            code: 200,
            message: "Update successfully.",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            error: error,
        });
    }
});
exports.editPatch = editPatch;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield task_model_1.default.updateOne({
            _id: id,
        }, {
            deleted: true,
            deletedAt: new Date(),
        });
        res.json({
            code: 200,
            message: "Delete successfully.",
        });
    }
    catch (error) {
        res.json({
            code: 400,
            error: error,
        });
    }
});
exports.deleteTask = deleteTask;
