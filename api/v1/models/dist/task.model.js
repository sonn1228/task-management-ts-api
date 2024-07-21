"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var taskSchema = new mongoose_1["default"].Schema({
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    createdBy: String,
    listUser: Array,
    taskParentId: String,
    deleted: {
        type: Boolean,
        "default": false
    },
    deletedAt: Date
}, {
    timestamps: true
});
var Task = mongoose_1["default"].model("Task", taskSchema, "tasks");
exports["default"] = Task;
