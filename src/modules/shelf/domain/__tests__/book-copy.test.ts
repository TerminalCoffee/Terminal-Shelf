import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { BookCopy, TitleRequiredError, ReadingState } from '@/modules/shelf/domain/book-copy';
import { Id, InvalidIdError } from '@/modules/shelf/domain/id';
import { InvalidReadingStateTransitionError } from '@/modules/shelf/domain/reading-state';

describe('Id', () => {
  it('generates a UUID v7', () => {
    assert.match(
      Id.generate().toString(),
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it('generates a distinct value each time', () => {
    assert.notStrictEqual(Id.generate().equals(Id.generate()), true);
  });

  it('round-trips through from/toString', () => {
    const raw = '0192f0c2-7a1b-7c3d-8e4f-5a6b7c8d9e0f';
    assert.strictEqual(Id.from(raw).toString(), raw);
  });

  it('treats a reconstituted id as equal to its source', () => {
    const id = Id.generate();
    assert.strictEqual(Id.from(id.toString()).equals(id), true);
  });

  it('refuses an empty id', () => {
    assert.throws(() => Id.from(''), InvalidIdError);
  });
});

describe('BookCopy', () => {
  describe('register', () => {
    it('registers a copy from a title alone', () => {
      const bookCopy = BookCopy.register({ title: 'Clean Code' });

      assert.strictEqual(bookCopy.title, 'Clean Code');
      assert.strictEqual(bookCopy.readingState, ReadingState.Planned);
      assert.ok(bookCopy.createdAt instanceof Date);
      assert.ok(bookCopy.updatedAt instanceof Date);
      assert.strictEqual(bookCopy.author, undefined);
      assert.strictEqual(bookCopy.isbn, undefined);
    });

    it('registers a copy with every optional field', () => {
      const bookCopy = BookCopy.register({
        title: 'Clean Code',
        author: 'Robert Martin',
        isbn: '978-0132350884',
        publisher: 'Prentice Hall',
        year: 2008,
        edition: '1st',
        coverUrl: 'https://example.com/cover.jpg',
        description: 'A handbook of agile software craftsmanship',
        readingState: ReadingState.Reading,
      });

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

    it('throws when the title is empty', () => {
      assert.throws(() => BookCopy.register({ title: '' }), TitleRequiredError);
    });

    it('throws when the title is whitespace only', () => {
      assert.throws(() => BookCopy.register({ title: '   ' }), TitleRequiredError);
    });

    it('trims the title', () => {
      assert.strictEqual(BookCopy.register({ title: '  Clean Code  ' }).title, 'Clean Code');
    });

    it('keeps the reading state given at registration', () => {
      const bookCopy = BookCopy.register({ title: 'Test', readingState: ReadingState.Finished });
      assert.strictEqual(bookCopy.readingState, ReadingState.Finished);
    });
  });

  describe('identity', () => {
    it('is assigned at registration', () => {
      assert.ok(BookCopy.register({ title: 'Test' }).id instanceof Id);
    });

    it('is distinct per copy', () => {
      const first = BookCopy.register({ title: 'Test' });
      const second = BookCopy.register({ title: 'Test' });

      assert.strictEqual(first.id.equals(second.id), false);
    });

    it('survives every state change and rename', () => {
      const bookCopy = BookCopy.register({ title: 'Test' });
      const identity = bookCopy.id;

      const moved = bookCopy
        .startReading()
        .pauseReading()
        .resumeReading()
        .finishReading()
        .restartReading()
        .renameTo('Renamed');

      assert.strictEqual(moved.id.equals(identity), true);
    });
  });

  describe('reconstitute', () => {
    it('rebuilds a copy from stored props', () => {
      const props = {
        id: Id.from('uuid-v7-id'),
        title: 'Test Book',
        author: 'Author',
        isbn: '1234567890',
        publisher: 'Publisher',
        year: 2023,
        edition: '1st',
        coverUrl: 'http://cover.com',
        description: 'Description',
        readingState: ReadingState.Finished,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      };

      const bookCopy = BookCopy.reconstitute(props);

      assert.strictEqual(bookCopy.id.equals(props.id), true);
      assert.strictEqual(bookCopy.title, props.title);
      assert.strictEqual(bookCopy.readingState, props.readingState);
      assert.deepStrictEqual(bookCopy.createdAt, props.createdAt);
      assert.deepStrictEqual(bookCopy.updatedAt, props.updatedAt);
    });
  });

  describe('reading transitions', () => {
    it('starts reading from the shelf', () => {
      assert.strictEqual(
        BookCopy.register({ title: 'Test' }).startReading().readingState,
        ReadingState.Reading
      );
    });

    it('pauses an ongoing read', () => {
      const bookCopy = BookCopy.register({ title: 'Test' }).startReading();
      assert.strictEqual(bookCopy.pauseReading().readingState, ReadingState.Paused);
    });

    it('resumes a paused read', () => {
      const bookCopy = BookCopy.register({ title: 'Test' }).startReading().pauseReading();
      assert.strictEqual(bookCopy.resumeReading().readingState, ReadingState.Reading);
    });

    it('puts an ongoing read on hold', () => {
      const bookCopy = BookCopy.register({ title: 'Test' }).startReading();
      assert.strictEqual(bookCopy.putOnHold().readingState, ReadingState.OnHold);
    });

    it('resumes a held copy', () => {
      const bookCopy = BookCopy.register({ title: 'Test' }).startReading().putOnHold();
      assert.strictEqual(bookCopy.resumeReading().readingState, ReadingState.Reading);
    });

    it('finishes an ongoing read', () => {
      const bookCopy = BookCopy.register({ title: 'Test' }).startReading();
      assert.strictEqual(bookCopy.finishReading().readingState, ReadingState.Finished);
    });

    it('finishes straight from a pause', () => {
      const bookCopy = BookCopy.register({ title: 'Test' }).startReading().pauseReading();
      assert.strictEqual(bookCopy.finishReading().readingState, ReadingState.Finished);
    });

    it('restarts only a finished copy', () => {
      const bookCopy = BookCopy.register({ title: 'Test' }).startReading().finishReading();
      assert.strictEqual(bookCopy.restartReading().readingState, ReadingState.ReReading);
    });

    it('pauses and finishes again on a reread', () => {
      const finished = BookCopy.register({ title: 'Test' }).startReading().finishReading();

      const rereading = finished.restartReading();
      assert.strictEqual(rereading.readingState, ReadingState.ReReading);

      const paused = rereading.pauseReading();
      assert.strictEqual(paused.readingState, ReadingState.Paused);

      assert.strictEqual(paused.resumeReading().finishReading().readingState, ReadingState.Finished);
    });

    it('refuses to finish a copy that was never started', () => {
      assert.throws(
        () => BookCopy.register({ title: 'Test' }).finishReading(),
        InvalidReadingStateTransitionError
      );
    });

    it('refuses to pause a copy that was never started', () => {
      assert.throws(
        () => BookCopy.register({ title: 'Test' }).pauseReading(),
        InvalidReadingStateTransitionError
      );
    });

    it('refuses to hold a copy that was never started', () => {
      assert.throws(
        () => BookCopy.register({ title: 'Test' }).putOnHold(),
        InvalidReadingStateTransitionError
      );
    });

    it('refuses to resume a copy that was never started', () => {
      assert.throws(
        () => BookCopy.register({ title: 'Test' }).resumeReading(),
        InvalidReadingStateTransitionError
      );
    });

    it('refuses to restart a copy that was never finished', () => {
      assert.throws(
        () => BookCopy.register({ title: 'Test' }).restartReading(),
        InvalidReadingStateTransitionError
      );
    });

    it('refuses to start a copy that is already being read', () => {
      assert.throws(
        () => BookCopy.register({ title: 'Test' }).startReading().startReading(),
        InvalidReadingStateTransitionError
      );
    });

    it('refuses to finish a copy that is already finished', () => {
      assert.throws(
        () => BookCopy.register({ title: 'Test' }).startReading().finishReading().finishReading(),
        InvalidReadingStateTransitionError
      );
    });

    it('reports the action and the state that refused it', () => {
      assert.throws(
        () => BookCopy.register({ title: 'Test' }).finishReading(),
        (error: unknown) =>
          error instanceof InvalidReadingStateTransitionError &&
          error.message.includes('finishReading') &&
          error.message.includes('Planned')
      );
    });

    it('leaves the original copy untouched', () => {
      const bookCopy = BookCopy.register({ title: 'Test' });
      const originalUpdatedAt = bookCopy.updatedAt;

      bookCopy.startReading();

      assert.strictEqual(bookCopy.readingState, ReadingState.Planned);
      assert.deepStrictEqual(bookCopy.updatedAt, originalUpdatedAt);
    });

    it('stamps the transition time', () => {
      const bookCopy = BookCopy.register({ title: 'Test' });
      const moved = bookCopy.startReading();

      assert.ok(moved.updatedAt instanceof Date);
      assert.ok(moved.updatedAt.getTime() >= bookCopy.updatedAt.getTime());
    });
  });

  describe('renameTo', () => {
    it('records the new title', () => {
      assert.strictEqual(BookCopy.register({ title: 'Old' }).renameTo('New').title, 'New');
    });

    it('trims the new title', () => {
      assert.strictEqual(BookCopy.register({ title: 'Old' }).renameTo('  New  ').title, 'New');
    });

    it('throws when the new title is empty', () => {
      assert.throws(() => BookCopy.register({ title: 'Old' }).renameTo(''), TitleRequiredError);
    });

    it('throws when the new title is whitespace only', () => {
      assert.throws(() => BookCopy.register({ title: 'Old' }).renameTo('   '), TitleRequiredError);
    });

    it('leaves the original copy untouched', () => {
      const bookCopy = BookCopy.register({ title: 'Old' });
      bookCopy.renameTo('New');

      assert.strictEqual(bookCopy.title, 'Old');
    });
  });

  describe('toPlainObject', () => {
    it('exposes every stored prop', () => {
      const plain = BookCopy.register({
        title: 'Test',
        author: 'Author',
        readingState: ReadingState.Reading,
      }).toPlainObject();

      assert.strictEqual(plain.title, 'Test');
      assert.strictEqual(plain.author, 'Author');
      assert.strictEqual(plain.readingState, ReadingState.Reading);
      assert.ok(plain.id instanceof Id);
      assert.ok(plain.createdAt instanceof Date);
      assert.ok(plain.updatedAt instanceof Date);
    });
  });
});
