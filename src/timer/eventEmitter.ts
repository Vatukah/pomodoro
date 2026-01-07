import type { Unsubscribe, Listener} from "../type";
import type {TimerEvent} from './index'
export class EventEmitter {
  private _events: Record<TimerEvent['type'], Listener[]> = {
    tick: [],
    complete: [],
    status: [],
    init: [],
  };

  on(eventName: TimerEvent['type'], callback: Listener): Unsubscribe {
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push(callback);

    return () => {
      this._events[eventName] = this._events[eventName].filter(
        (l) => l !== callback
      );
    };
  }

  emit(eventName: TimerEvent['type'], ...args: any[]) {
    if (!this._events[eventName]) return;
    this._events[eventName].forEach((l) => l(...args));
  }
}
