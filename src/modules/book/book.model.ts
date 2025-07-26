
import { Model, model, Schema } from "mongoose";
import { IBook } from "./book.interface";


const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, 'Number of copies is required'],
        min: [0, 'Copies cannot be negative'],
    },
    available: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    }

);





// static methods
bookSchema.statics.updateAvailability = async function (bookId: string) {
    const book = await this.findById(bookId);
    if (book && book.copies === 0) {
        book.available = false;
    await book.save();
}
};


interface BookModel extends Model<IBook>{
    updateAvailability(bookId: string): Promise<void>;
}







// bookSchema.methods.borrowCopies = async function (quantity: number) {
//     if(this.copies < quantity) {
//         throw new Error('Not enough copies available');
//     }
//     this.copies -= quantity;

//     if(this.copies === 0) {
//         this.available = false;
//     }

//     return this.save();
// };




const Book = model<IBook, BookModel>("Book", bookSchema);
export default Book;