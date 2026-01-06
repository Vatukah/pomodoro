import * as LucideIcons from "lucide-react";

export type MODE = | "focus" | "short-break" | "long-break";
export type UUIDTypes = string;
export type TimerStatus = "idle" | "ticking" | "paused" | "completed";
export type Listener = (...args: any[]) => void;
export type Unsubscribe = () => void;
export type THEME = "light" | "dark";
export type PomoEvents = "tick" | "complete" | "status" | "init";
export type InitialTimer = { mode: MODE; duration: number };
export type IconName = keyof typeof LucideIcons;
export type SessionIntent =
  | { type: "free" }
  | { type: "task"; taskId: string };

export type BootKey =
  | "model"
  | "settings"
  | "worker"
  | "sounds";

export type ModalState =
  | { type: "closed" }
  | { type: "set-timer"; mode: MODE, onClose:()=>void }
  | { type: "settings" }
  | { type: "confirm"; message: string,onConfirm:()=>void }
  | { type: "todo-add-form",center?:boolean}
  | { type: "todo-update-form",todo:ITodo,center?:boolean};


export type SoundSetting = {
  sound: string;
  volume: number;
};

export type timerConfig = {
  focus: number,     
  shortBreak: number, 
  longBreak: number, 
 };

export type Settings = {
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
  soundEnabled: boolean;
  accentColor: string;
  ticking: SoundSetting;
  complete: SoundSetting;
  enableTicking: boolean;
  enableComplete: boolean;
};

export interface ITimerInit {
  id: string | null;
  mode: MODE | null;
  duration: number;
}

export interface IPomodoroActionContext {
  startNewFreeFlow: () => void;
  initTaskSession:(taskId: string,duration?:number) => void;
  initFreeSession():void;
startCurrentSession:()=>void;

  reset(): void;
  pause(): void;
  resume(): void;
  subscribe: (eventName: PomoEvents, callbacks: Listener) => Unsubscribe;
  init(intial:ITimerInit):void;
  status:TimerStatus;
  isReady: boolean;
}

export interface IPomodoroContext {
  mode: MODE;
  sessionCount: number;
  flowMode: boolean;
  toggleFlowMode: () => void;
  decideNextSession:(mode:MODE)=>MODE
}


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
 
export type PostMessagePayload<T extends keyof MessageMap> = {
  type: T;
  payload: MessageMap[T];
};

export type WorkerMessage = {
  [K in keyof MessageMap]: {
    type: K;
    payload: MessageMap[K];
  }
}[keyof MessageMap];

export interface ITimerForm {
  children: React.ReactNode;
  savedValue: number;
  label: string;
  options: any[];
  onChange: (...arg: any[]) => void;
  customCallback: () => void;
}
export interface ITodo {
  id: UUIDTypes;
  title: string;
  focusDuration: number;
  estimatedPomo: number;
  completedPomo: number;
  status: "pending" |  "completed";
}
