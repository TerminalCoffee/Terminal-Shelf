import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { RegisterBookCopy } from '@/modules/shelf/application/register-book-copy/register-book-copy.use-case';
import { RegisterBookCopyCommand } from '@/modules/shelf/application/register-book-copy/register-book-copy.command';
import { InMemoryBookCopyRepository } from '@/modules/shelf/domain/__tests__/in-memory-book-copy-repository';
import { TitleRequiredError, ReadingState } from '@/modules/shelf/domain/book-copy';

describe('RegisterBookCopy', () => {
  let repository: InMemoryBookCopyRepository;
  let useCase: RegisterBookCopy;

  beforeEach(() => {
    repository = new InMemoryBookCopyRepository();
    useCase = new RegisterBookCopy(repository);
  });

  it('registers a copy from a title alone', async () => {
    const bookCopy = await useCase.execute({ title: 'Clean Code' });

    assert.strictEqual(bookCopy.title, 'Clean Code');
    assert.strictEqual(bookCopy.readingState, ReadingState.Planned);
    assert.ok(bookCopy.createdAt instanceof Date);
    assert.ok(bookCopy.updatedAt instanceof Date);
  });

  it('registers a copy with every optional field', async () => {
    const command: RegisterBookCopyCommand = {
      title: 'Clean Code',
      author: 'Robert Martin',
      isbn: '978-0132350884',
      publisher: 'Prentice Hall',
      year: 2008,
      edition: '1st',
      coverUrl: 'https://example.com/cover.jpg',
      description: 'A handbook of agile software craftsmanship',
      readingState: ReadingState.Reading,
    };

    const bookCopy = await useCase.execute(command);

    assert.strictEqual(bookCopy.title, 'Clean Code');
    assert.strictEqual(bookCopy.author, 'Robert Martin');
    assert.strictEqual(bookCopy.isbn, '978-0132350884');
    assert.strictEqual(bookCopy.publisher, 'Prentice Hall');
    assert.strictEqual(bookCopy.year, 2008);
    assert.strictEqual(bookCopy.edition, '1st');
    assert.strictEqual(bookCopy.coverUrl, 'https://example.com/cover.jpg');
    assert.strictEqual(bookCopy.description, 'A handbook of agile software craftsmanship');
    assert.strictEqual(bookCopy.readingState, ReadingState.Reading);
  });

  it('lets the entity reject an empty title', async () => {
    await assert.rejects(() => useCase.execute({ title: '' }), TitleRequiredError);
  });

  it('lets the entity reject a whitespace-only title', async () => {
    await assert.rejects(() => useCase.execute({ title: '   ' }), TitleRequiredError);
  });

  it('trims the title', async () => {
    const bookCopy = await useCase.execute({ title: '  Clean Code  ' });

    assert.strictEqual(bookCopy.title, 'Clean Code');
  });

  it('stores the copy in the repository', async () => {
    const bookCopy = await useCase.execute({ title: 'Test Book' });
    const stored = await repository.findById(bookCopy.id);

    assert.ok(stored);
    assert.strictEqual(stored?.id.equals(bookCopy.id), true);
    assert.strictEqual(stored?.title, 'Test Book');
  });

  it('mints a UUID v7 identity', async () => {
    const bookCopy = await useCase.execute({ title: 'Test Book' });

    assert.match(
      bookCopy.id.toString(),
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it('keeps duplicate ISBNs as separate copies', async () => {
    await useCase.execute({ title: 'Clean Code', isbn: '978-0132350884' });
    const second = await useCase.execute({ title: 'Clean Code (2nd copy)', isbn: '978-0132350884' });

    assert.strictEqual(second.isbn, '978-0132350884');
    assert.strictEqual((await repository.findAll()).length, 2);
  });
});
