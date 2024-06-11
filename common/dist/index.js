"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputes = exports.blogInputes = exports.loginInputes = exports.signupInputes = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInputes = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(10),
    name: zod_1.default.string().optional(),
});
exports.loginInputes = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(10),
});
//blog inpput syntax
exports.blogInputes = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
//update blog inputes
exports.updateBlogInputes = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
});
