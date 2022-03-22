export enum ModeType {
  POMODORO = "pomodoro",
  SHORT_BREAK = "short_break",
  LONG_BREAK = "long_break",
}

export interface ModeInterface {
  type: ModeType;
  duration: number;
  color: string;
}

export interface Todo {
  id: string;
  name: string;
  pomodoroAmount: number;
  pomodorosDone: number;
  isDone: boolean;
}
