import type { Unsubscribe, Listener, PomoEvents } from "../type";

export class EventEmitter {
  private _events: Record<PomoEvents, Listener[]> = {
    tick: [],
    complete: [],
    status: [],
    init: [],
  };

  on(eventName: PomoEvents, callback: Listener): Unsubscribe {
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push(callback);

    return () => {
      this._events[eventName] = this._events[eventName].filter(
        (l) => l !== callback
      );
    };
  }

  emit(eventName: PomoEvents, ...args: any[]) {
    if (!this._events[eventName]) return;
    this._events[eventName].forEach((l) => l(...args));
  }
}
