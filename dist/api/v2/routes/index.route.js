"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_route_1 = require("./task.route");
const mainV1Routes = (app) => {
    const version = "/api/v2";
    app.use(version + "/tasks", task_route_1.taskRoutes);
};
exports.default = mainV1Routes;
