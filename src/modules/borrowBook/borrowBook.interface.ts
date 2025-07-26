import { Types } from "mongoose";


export interface IBorrowBook {
    bookId:Types.ObjectId,
    quantity:number,
    dueDate:Date,
}