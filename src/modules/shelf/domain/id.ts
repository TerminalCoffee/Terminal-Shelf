import { v7 as uuidv7 } from 'uuid';

export class InvalidIdError extends Error {
  constructor() {
    super('An id cannot be empty');
    this.name = 'InvalidIdError';
  }
}

export class Id {
  private constructor(private readonly value: string) {}

  static generate(): Id {
    return new Id(uuidv7());
  }

  static from(value: string): Id {
    if (!value) {
      throw new InvalidIdError();
    }
    return new Id(value);
  }

  equals(other: Id): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
