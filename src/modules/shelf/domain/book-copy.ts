import { Id } from '@/modules/shelf/domain/id';
import { ReadingAction, ReadingState, nextState } from '@/modules/shelf/domain/reading-state';

export { ReadingState } from '@/modules/shelf/domain/reading-state';

export interface BookCopyDraft {
  title: string;
  author?: string;
  isbn?: string;
  publisher?: string;
  year?: number;
  edition?: string;
  coverUrl?: string;
  description?: string;
  readingState?: ReadingState;
}

export interface BookCopyProps extends Omit<BookCopyDraft, 'readingState'> {
  id: Id;
  readingState: ReadingState;
  createdAt: Date;
  updatedAt: Date;
}

export class TitleRequiredError extends Error {
  constructor() {
    super('Title is required');
    this.name = 'TitleRequiredError';
  }
}

export class BookCopy {
  private constructor(private readonly props: BookCopyProps) {}

  static register(draft: BookCopyDraft): BookCopy {
    const title = draft.title?.trim();
    if (!title) {
      throw new TitleRequiredError();
    }

    const now = new Date();

    return new BookCopy({
      ...draft,
      title,
      id: Id.generate(),
      readingState: draft.readingState ?? ReadingState.Planned,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: BookCopyProps): BookCopy {
    return new BookCopy(props);
  }

  get id(): Id {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get author(): string | undefined {
    return this.props.author;
  }

  get isbn(): string | undefined {
    return this.props.isbn;
  }

  get publisher(): string | undefined {
    return this.props.publisher;
  }

  get year(): number | undefined {
    return this.props.year;
  }

  get edition(): string | undefined {
    return this.props.edition;
  }

  get coverUrl(): string | undefined {
    return this.props.coverUrl;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get readingState(): ReadingState {
    return this.props.readingState;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  startReading(): BookCopy {
    return this.transition('startReading');
  }

  pauseReading(): BookCopy {
    return this.transition('pauseReading');
  }

  resumeReading(): BookCopy {
    return this.transition('resumeReading');
  }

  putOnHold(): BookCopy {
    return this.transition('putOnHold');
  }

  finishReading(): BookCopy {
    return this.transition('finishReading');
  }

  restartReading(): BookCopy {
    return this.transition('restartReading');
  }

  renameTo(title: string): BookCopy {
    const renamed = title.trim();
    if (!renamed) {
      throw new TitleRequiredError();
    }
    return new BookCopy({ ...this.props, title: renamed, updatedAt: new Date() });
  }

  toPlainObject(): BookCopyProps {
    return { ...this.props };
  }

  private transition(action: ReadingAction): BookCopy {
    return new BookCopy({
      ...this.props,
      readingState: nextState(this.props.readingState, action),
      updatedAt: new Date(),
    });
  }
}
