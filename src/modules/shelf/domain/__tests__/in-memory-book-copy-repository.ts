import { BookCopyRepository } from '@/modules/shelf/domain/book-copy-repository';
import { BookCopy } from '@/modules/shelf/domain/book-copy';
import { Id } from '@/modules/shelf/domain/id';

export class InMemoryBookCopyRepository implements BookCopyRepository {
  private readonly copies: Map<string, BookCopy> = new Map();

  async save(bookCopy: BookCopy): Promise<BookCopy> {
    this.copies.set(bookCopy.id.toString(), bookCopy);
    return bookCopy;
  }

  async findById(id: Id): Promise<BookCopy | null> {
    return this.copies.get(id.toString()) ?? null;
  }

  async findAll(): Promise<BookCopy[]> {
    return Array.from(this.copies.values());
  }

  clear(): void {
    this.copies.clear();
  }
}
