export const ReadingState = {
  Planned: 'Planned',
  Reading: 'Reading',
  Finished: 'Finished',
  OnHold: 'OnHold',
  Paused: 'Paused',
  ReReading: 'ReReading',
} as const;

export type ReadingState = typeof ReadingState[keyof typeof ReadingState];

export type ReadingAction =
  | 'startReading'
  | 'pauseReading'
  | 'resumeReading'
  | 'putOnHold'
  | 'finishReading'
  | 'restartReading';

const TRANSITIONS: Record<ReadingState, Partial<Record<ReadingAction, ReadingState>>> = {
  Planned: {
    startReading: ReadingState.Reading,
  },
  Reading: {
    pauseReading: ReadingState.Paused,
    putOnHold: ReadingState.OnHold,
    finishReading: ReadingState.Finished,
  },
  Paused: {
    resumeReading: ReadingState.Reading,
    putOnHold: ReadingState.OnHold,
    finishReading: ReadingState.Finished,
  },
  OnHold: {
    resumeReading: ReadingState.Reading,
  },
  Finished: {
    restartReading: ReadingState.ReReading,
  },
  ReReading: {
    pauseReading: ReadingState.Paused,
    putOnHold: ReadingState.OnHold,
    finishReading: ReadingState.Finished,
  },
};

export class InvalidReadingStateTransitionError extends Error {
  constructor(action: ReadingAction, from: ReadingState) {
    super(`Cannot perform '${action}' on a book copy in state '${from}'`);
    this.name = 'InvalidReadingStateTransitionError';
  }
}

export function nextState(from: ReadingState, action: ReadingAction): ReadingState {
  const next = TRANSITIONS[from][action];
  if (!next) {
    throw new InvalidReadingStateTransitionError(action, from);
  }
  return next;
}
