import TimerWorker from "../timer/timer.worker.ts?worker";
import type { Listener, Unsubscribe } from "../type";
import { EventEmitter } from "./eventEmitter";
import type { TimerBus, TimerCommand, TimerEvent} from './index'



export class TimerEngine implements TimerBus {
  private worker: Worker;
  private emitter = new EventEmitter();

  constructor() {
    this.worker = new TimerWorker();
    this.worker.onmessage = this.handleMessage;
  }

  private handleMessage = (e: MessageEvent<TimerEvent>) => {
    const message = e.data;
    this.emitter.emit(message.type, {...message});
  };

  subscribe<T extends TimerEvent['type']>(
    type: T,
    cb: Listener
  ): Unsubscribe {
    return this.emitter.on(type, cb);
  }

  post(command: TimerCommand) {
    this.worker.postMessage(command);
  }

  destroy() {
    this.worker.terminate();
  }
}
