import type { MODE,TimerStatus } from "../type";

export type TimerEvent =
  | { type: "tick"; remaining: number }
  | { type: "complete"; mode: MODE }
  | { type: "status"; status: TimerStatus }
  | {type : "init"; duration:number};

export type TimerCommand =
  | { type: "START"; duration: number; mode: MODE }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "RESET"; duration: number }
  | { type: "INIT"; duration: number; mode: MODE }


export type MessageMap = {
  INIT: { id: string | null; mode: MODE | null; duration: number };
  START: undefined;
  PAUSE: undefined;
  RESUME: undefined;
  RESET: {duration:number};
  // timer worker event
  tick:{remaining:number};
  init: { duration: number };
  complete: { id: string | null; mode: MODE | null };
  status: { status: TimerStatus };
}
 
export type PostMessageType<T extends TimerCommand['type']> = {
  type: T;
  payload: Extract<TimerCommand,{type:T}>;
};

export type WorkerMessage = {
  [K in TimerCommand['type']]: {
    type: K;
    payload: Extract<TimerCommand,{type:K}>;
  }
}[TimerCommand['type']];

export interface TimerBus {
  subscribe<T extends TimerEvent["type"]>(
    type: T,
    cb: (payload: Extract<TimerEvent, { type: T }>) => void
  ): () => void;

  post(command: TimerCommand): void;
}

export interface TimerBus {
  subscribe<T extends TimerEvent["type"]>(
    type: T,
    cb: (payload: Extract<TimerEvent, { type: T }>) => void
  ): () => void;

  post(command: TimerCommand): void;
}

export interface TimerPlugin {
  id: string;
  attach(bus: TimerBus): void;
  detach(): void;
}
