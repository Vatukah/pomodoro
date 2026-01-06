// timer.worker.ts (patched resume behavior)
import type { TimerStatus, WorkerMessage } from "../type";
import { TimerController } from "../controller/timerController";

class MyTimer extends TimerController {
  protected _onTicking(): void {
    postMessage({ type: "tick", payload:{remaining: this.remainingsSec }});
  }

  protected _onTimerFinish(): void {
    let payload = {
      id: this.id,
      mode: this.mode,
    };
    postMessage({ type: "complete", payload });
  }

  protected _onStatusUpdate(status: TimerStatus): void {
    postMessage({ type: "status", payload:{status} });
  }

  protected _onInit(duration: number): void {
    postMessage({ type: "init", payload:{duration }});
  }
}

const pomodoro = new MyTimer();

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type, payload } = event.data;
  console.log(type, payload);
  switch (type) {
    case "INIT":
      pomodoro.init(payload);

      break;
    case "START":
      pomodoro.start();
      break;

    case "PAUSE":
      pomodoro.pause();
      break;

    case "RESUME":
      pomodoro.resume();
      break;

    case "RESET":
      pomodoro.reset(payload.duration);
      break;

    default:
      console.warn("Unknown worker command:", type);
  }
};
