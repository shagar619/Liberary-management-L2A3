"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookSchema = exports.GenreEnum = void 0;
const zod_1 = __importDefault(require("zod"));
exports.GenreEnum = zod_1.default.enum([
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
]);
exports.createBookSchema = zod_1.default.object({
    title: zod_1.default.string({
        error: 'Title is required',
    }).min(1, 'Title cannot be empty'),
    author: zod_1.default.string({
        error: 'Author is required',
    }).min(1, 'Author cannot be empty'),
    genre: exports.GenreEnum,
    isbn: zod_1.default.string({
        error: 'ISBN is required',
    }).min(1, 'ISBN cannot be empty'),
    description: zod_1.default.string().optional(),
    copies: zod_1.default.number({
        error: 'Copies is required',
    }).int('Copies must be an integer').nonnegative('Copies cannot be negative'),
    available: zod_1.default.boolean().optional(),
});
