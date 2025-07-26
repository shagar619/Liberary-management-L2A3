import { z } from 'zod';

export const borrowBookZod = z.object({
    bookId: z.string({
        error: 'bookId is required',
    }),
    quantity: z.number({
        error: 'Quantity is required',
    }).int().min(1, 'Must borrow at least one copy'),
    borrowerName: z.string().min(1, 'Borrower name is required'),
});
