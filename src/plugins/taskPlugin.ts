import type { TimerPlugin,TimerBus } from "../timer/index";
export class TaskPlugin implements TimerPlugin {
  id = "task-plugin";
  private unsub?: () => void;
  private taskId: string;

  constructor(taskId: string) {
    this.taskId = taskId;
  }

  attach(bus: TimerBus) {
    this.unsub = bus.subscribe("complete", (e) => {
      if (e.mode === "focus") {
        // update task progress
        console.log("Pomodoro completed for task", this.taskId);
      }
    });
  }

  detach() {
    this.unsub?.();
    this.unsub = undefined;
  }
}
