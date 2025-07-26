import { NextFunction, Request, Response } from "express";
import Borrow from "./borrowBook.model";
import Book from "../book/book.model";
import z from "zod";
import mongoose from "mongoose";



const borrowZodSchema = z.object({
    bookId: z.string(),
    quantity: z.number(),
    dueDate: z.string().optional(),
});



// Borrow a Book
const borrowBook = async (req: Request, res: Response, next: NextFunction) => {

    try{

        const {
            bookId,
            quantity,
            dueDate,} = await borrowZodSchema.parseAsync(req.body);

        // Basic input validation
        if (!bookId || !mongoose.isValidObjectId(bookId)) {
            return res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    bookId: {
                    message: 'Invalid or missing book ID',
                },
            },
        });
    };


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


    const newBook = await Book.findById(bookId);

    if(!newBook){
        return res.status(404).json({
            message: 'Book not found',
            success: false,
            error: {newBook}
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

    await newBook.save();


    const postBorrowData = await Borrow.create({
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

    } catch(error) {
        next();
    }
};







// Borrowed Books Summary (Using Aggregation)
const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const summary = await Borrow.aggregate([

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

    }catch(error) {
        next(error);
    }
};






export const borrowController = {
    borrowBook,
    getBorrowSummary
};