import { BookCopyRepository } from '@/modules/shelf/domain/book-copy-repository';
import { BookCopy } from '@/modules/shelf/domain/book-copy';
import { RegisterBookCopyCommand } from '@/modules/shelf/application/register-book-copy/register-book-copy.command';

export class RegisterBookCopy {
  constructor(private readonly repository: BookCopyRepository) {}

  async execute(command: RegisterBookCopyCommand): Promise<BookCopy> {
    return this.repository.save(BookCopy.register(command));
  }
}
