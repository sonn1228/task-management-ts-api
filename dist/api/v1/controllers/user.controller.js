"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.detail = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generateHelper = __importStar(require("../../../helpers/generate.helper"));
const md5_1 = __importDefault(require("md5"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false,
    });
    if (existUser) {
        res.json({
            code: 400,
            message: "User existed",
        });
        return;
    }
    try {
        const user = new user_model_1.default({
            fullName: req.body.fullName,
            email: req.body.email,
            password: (0, md5_1.default)(req.body.password),
            token: generateHelper.generateRandomString(30),
        });
        const data = yield user.save();
        res.json({
            code: 200,
            message: "Create successfully.",
            data: data,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            error: error,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const existUser = yield user_model_1.default.findOne({
            email: email,
            deleted: false,
        });
        if (!existUser) {
            res.json({
                code: 400,
                message: "Email Not Found!",
            });
            return;
        }
        if (existUser.password != (0, md5_1.default)(password)) {
            res.json({
                code: 400,
                message: "Password error!",
            });
            return;
        }
        const token = existUser.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Login successfully.",
            token: token,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            error: error,
        });
    }
});
exports.login = login;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            code: 200,
            message: "success",
            data: req["user"],
        });
    }
    catch (error) {
        res.json({
            code: 400,
            error: error,
        });
    }
});
exports.detail = detail;
