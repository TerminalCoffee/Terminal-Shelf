import { BookCopy } from '@/modules/shelf/domain/book-copy';
import { Id } from '@/modules/shelf/domain/id';

export interface BookCopyRepository {
  save(bookCopy: BookCopy): Promise<BookCopy>;
  findById(id: Id): Promise<BookCopy | null>;
  findAll(): Promise<BookCopy[]>;
}
