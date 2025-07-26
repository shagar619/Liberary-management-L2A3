"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookZod = void 0;
const zod_1 = require("zod");
exports.borrowBookZod = zod_1.z.object({
    bookId: zod_1.z.string({
        error: 'bookId is required',
    }),
    quantity: zod_1.z.number({
        error: 'Quantity is required',
    }).int().min(1, 'Must borrow at least one copy'),
    borrowerName: zod_1.z.string().min(1, 'Borrower name is required'),
});
