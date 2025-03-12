export interface IBook {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: number;
    created_at?: string;
    modified_at?: string;
    is_active: boolean;
}