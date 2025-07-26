import { model, Schema } from "mongoose";
import { IBorrowBook } from "./borrowBook.interface";


export const borrowBookSchema = new Schema<IBorrowBook>({
    bookId: {
        type: Schema.Types.ObjectId,
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
},
    {
        versionKey: false,
        timestamps: true
    }
);


const Borrow = model<IBorrowBook>("Borrow", borrowBookSchema);
export default Borrow;