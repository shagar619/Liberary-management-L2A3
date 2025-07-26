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
exports.bookController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// Create book route
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Zod validation
        // const validatedData = createBookSchema.parseAsync(req.body);
        // create new book
        const newBook = yield book_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: "New Book created successfully!",
            newBook
        });
    }
    catch (error) {
        if (error instanceof Error && 'errors' in error) {
            // Handle Zod validation error
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
    ;
});
// Get all books route
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOrder = sort === 'asc' ? 1 : -1;
        const books = yield book_model_1.default.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(limit, 10));
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            books,
        });
    }
    catch (error) {
        next(error);
    }
    ;
});
// get book by id route
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        if (!mongoose_1.default.isValidObjectId(bookId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID',
                error: { bookId },
            });
        }
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: { bookId },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            book,
        });
    }
    catch (error) {
        next(error);
    }
    ;
});
// update book route
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        if (!mongoose_1.default.isValidObjectId(bookId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID',
                error: { bookId },
            });
        }
        const updatedBook = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updateBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: { bookId },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            updatedBook,
        });
    }
    catch (error) {
        next(error);
    }
    ;
});
// delete book route
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        if (!mongoose_1.default.isValidObjectId(bookId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID',
                error: { bookId },
            });
        }
        const book = yield book_model_1.default.findByIdAndDelete(bookId);
        if (!deleteBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: { bookId },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            deletedBook: book,
        });
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.bookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
