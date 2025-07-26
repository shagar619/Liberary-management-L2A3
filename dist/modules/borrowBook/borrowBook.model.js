"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.borrowBookSchema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Must borrow at least 1 copy']
    },
    dueDate: {
        type: Date,
        default: Date.now,
    }
}, {
    versionKey: false,
    timestamps: true
});
const Borrow = (0, mongoose_1.model)("Borrow", exports.borrowBookSchema);
exports.default = Borrow;
