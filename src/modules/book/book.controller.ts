import { NextFunction, Request, Response } from "express";
import { success } from "zod";
import { createBookSchema } from "../../validations/book.validations";
import Book from "./book.model";
import mongoose from "mongoose";



// Create book route
const createBook = async (req: Request, res: Response) => {

    try {

        // Zod validation
        // const validatedData = createBookSchema.parseAsync(req.body);

        // create new book
        const newBook = await Book.create(req.body);

        res.status(201).json({
            success: true,
            message: "New Book created successfully!",
            newBook
        });

    } catch(error: any) {

    if (error instanceof Error && 'errors' in error) {
        // Handle Zod validation error
        return res.status(400).json({
            error: 'Validation error',
            details: (error as any).errors,
    });
    }

    res.status(500).json({
        success: false,
        message: error.message,
        error
    });
};
};








// Get all books route
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {

    try{

    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

    const query: any = {};
    if (filter) {
        query.genre = filter;
    }

    const sortOrder = sort === 'asc' ? 1 : -1;
    const books = await Book.find(query)
        .sort({ [sortBy as string]: sortOrder })
        .limit(parseInt(limit as string, 10));

    res.status(200).json({
        message: 'Books retrieved successfully',
        success: true,
        books,
    });

    } catch (error) {
        next(error);
    };
};





// get book by id route
const getBookById = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { bookId } = req.params;

        if(!mongoose.isValidObjectId(bookId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID',
                error: { bookId },
            });
        }

        const book = await Book.findById(bookId);

        if(!book) {
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

    } catch(error) {
        next(error);
    };
};





// update book route
const updateBook = async (req: Request, res: Response,next: NextFunction) => {

    try {

        const { bookId } = req.params;

        if(!mongoose.isValidObjectId(bookId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID',
                error: { bookId },
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, 
            req.body, {
                new: true,
                runValidators: true,
        });

        if(!updateBook) {
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

    } catch(error) {
        next(error);
    };
};





// delete book route
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { bookId } = req.params;

        if(!mongoose.isValidObjectId(bookId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID',
                error: { bookId },
            });
        }

        const book = await Book.findByIdAndDelete(bookId);

        if(!deleteBook) {
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

    } catch(error) {
        next(error);
    };
};







export const bookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};