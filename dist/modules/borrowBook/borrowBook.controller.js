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
exports.borrowController = void 0;
const borrowBook_model_1 = __importDefault(require("./borrowBook.model"));
const book_model_1 = __importDefault(require("../book/book.model"));
const zod_1 = __importDefault(require("zod"));
const mongoose_1 = __importDefault(require("mongoose"));
const borrowZodSchema = zod_1.default.object({
    bookId: zod_1.default.string(),
    quantity: zod_1.default.number(),
    dueDate: zod_1.default.string().optional(),
});
// Borrow a Book
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, quantity, dueDate, } = yield borrowZodSchema.parseAsync(req.body);
        // Basic input validation
        if (!bookId || !mongoose_1.default.isValidObjectId(bookId)) {
            return res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    bookId: {
                        message: 'Invalid or missing book ID',
                    },
                },
            });
        }
        ;
        //     // Quantity validation
        //     if (!quantity || typeof quantity !== 'number' || quantity < 1) {
        //         return res.status(400).json({
        //             message: 'Validation failed',
        //             success: false,
        //             error: {
        //                 quantity: {
        //                 message: 'Quantity must be a positive number',
        //             },
        //         },
        //     });
        // }
        const newBook = yield book_model_1.default.findById(bookId);
        if (!newBook) {
            return res.status(404).json({
                message: 'Book not found',
                success: false,
                error: { newBook }
            });
        }
        if (newBook.copies < quantity) {
            res.status(400).json({
                success: false,
                message: "Not enough Copies available",
            });
        }
        newBook.copies -= quantity;
        if (newBook.copies === 0) {
            newBook.available = false;
        }
        yield newBook.save();
        const postBorrowData = yield borrowBook_model_1.default.create({
            bookId,
            quantity,
            dueDate
        });
        res.status(201).json({
            message: 'Book borrowed successfully',
            success: true,
            data: {
                postBorrowData,
            },
        });
    }
    catch (error) {
        next();
    }
});
// Borrowed Books Summary (Using Aggregation)
const getBorrowSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrowBook_model_1.default.aggregate([
            // process-1
            {
                $group: {
                    _id: '$bookId',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            // process-2
            {
                $lookup: {
                    from: 'books', // name of the collection (not model)
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookId',
                },
            },
            { $unwind: '$bookId' },
            // process-3
            {
                $project: {
                    _id: 0,
                    bookId: '$_id',
                    totalQuantity: 1,
                    title: '$books.title',
                    isbn: '$books.isbn',
                },
            },
        ]);
        res.status(201).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowController = {
    borrowBook,
    getBorrowSummary
};
