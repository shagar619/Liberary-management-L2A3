

import z from "zod";

export const GenreEnum = z.enum([
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
]);

export const createBookSchema = z.object({
    title: z.string({
        error: 'Title is required',
    }).min(1, 'Title cannot be empty'),

    author: z.string({
        error: 'Author is required',
    }).min(1, 'Author cannot be empty'),

    genre: GenreEnum,

    isbn: z.string({
        error: 'ISBN is required',
    }).min(1, 'ISBN cannot be empty'),

    description: z.string().optional(),

    copies: z.number({
        error: 'Copies is required',
    }).int('Copies must be an integer').nonnegative('Copies cannot be negative'),

    available: z.boolean().optional(),
});
