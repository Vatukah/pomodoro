import type { ITimerInit, MODE, TimerStatus } from "../type";

interface ITimercontroller {
  readonly remainingsSec: number;
  readonly mode: MODE | null;
  
  start(): void;
  reset(defaultDuration:number): void;
  pause(): void;
  resume(): void;
  init(intial:ITimerInit): void;
}

export abstract class TimerController implements ITimercontroller {
  protected _mode:MODE | null = null;
  protected _remainings: number = 0;
  protected _target: number = 0;
  protected _fps: number = 200;
  protected _initialremaining = 0;
  protected _status: TimerStatus = "idle";

  protected _intervalId: ReturnType<typeof setInterval> | null = null;
  protected _pausedAt: number = 0;

  protected abstract _onTimerFinish(): void;

  protected abstract _onTicking(): void;

  protected abstract _onInit(duration: number): void;

  protected abstract _onStatusUpdate(s: TimerStatus): void;

  public get remainingsSec(): number {
    return Math.max(0, Math.ceil(this._remainings / 1000));
  }

 
  public get id():string | null {
    return this._id
  }
  public get mode(): MODE | null {
    return this._mode;
  }
  constructor(fps?: number) {
    this._fps = fps || this._fps;
  }

  init(intial:ITimerInit): void {
    this._remainings = intial.duration;
    this._initialremaining = intial.duration;
    this._pausedAt = 0;
    this._mode = intial.mode;
  
    this._updateStatus("idle");
    this._onInit(intial.duration);
  }

  start(): void {
    if (this._intervalId && this._status === "ticking") return;

    this._target = performance.now() + this._remainings * 1000;
    this._startInterval();
  }

  reset(defaultDuration:number): void {
   
    this._stopInterval();
    // sync with Time duration settings
    this._initialremaining = defaultDuration;
 
    this._remainings = this._initialremaining;
    this._onInit(this._initialremaining);
    this._updateStatus("idle");
  }

  pause(): void {
    this._pausedAt = performance.now();
    this._stopInterval();
    this._updateStatus("paused");
  }

  resume(): void {
    if (this._pausedAt === 0 && this._status !== "paused") return;
    const pausedDuration = performance.now() - this._pausedAt;
    this._target += pausedDuration;
    this._pausedAt = 0;
    this._startInterval();
  }

  private _stopInterval(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  private _startInterval(): void {
    if (this._intervalId && this._status === "ticking") return;
    this._intervalId = setInterval(this._tick.bind(this), this._fps);
    this._updateStatus("ticking");
  }

  private _tick(): void {
    const now = performance.now();
    const diff = this._target - now;
    this._remainings = Math.max(0, diff);

    this._onTicking();

    if (this._remainings <= 0) {
      this._stopInterval();
      this._updateStatus("completed");
      this._onTimerFinish();
    }
  }

  private _updateStatus(s: TimerStatus): void {
    this._status = s;
    this._onStatusUpdate(s);
  }
}
