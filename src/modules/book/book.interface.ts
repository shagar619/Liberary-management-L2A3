

// src/interfaces/Book.ts

export type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export interface IBook {
    title: string;
    author: string;
    genre: Genre;
    isbn: string;
    description?: string;
    copies: number;
    available?: boolean; // Will default to true in schema
};
