import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import TimerWorker from "../worker/timer.worker.ts?worker";
import type {
  Unsubscribe,
  PomoEvents,
  InitialTimer,
  Listener,
  WorkerMessage,
  ITimerInit,
  PostMessagePayload,
  MessageMap,
} from "../type";
import { EventEmitter } from "../uitls/pomodoro";
import { useBoot } from "../context/bootProvider";

export function usePomodoroWorker() {
  const workerRef = useRef<Worker | null>(null);
  const emitterRef = useRef<EventEmitter | null>(null);
  const [isReady, setIsReady] = useState(false);
  const {markReady} = useBoot();

  function postMessage<T extends keyof MessageMap>(
    message: PostMessagePayload<T>
  ) {
    if (workerRef.current) {
      workerRef.current.postMessage(message);
    }
  }

  useEffect(() => {
    const worker = new TimerWorker();
    workerRef.current = worker;

    const emitter = new EventEmitter();
    emitterRef.current = emitter;

    // worker.postMessage({ type: "INIT", payload:{ duration: initialTimer?.duration} });

    worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const { type, payload } = e.data;

      switch (type) {
        case "tick":
          emitter.emit("tick", payload);
          break;
        case "complete":
          emitter.emit("complete", payload);
          break;
        case "init":
        
          emitter.emit("init", payload);
          break;
        case "status":
          emitter.emit("status", payload);
          break;
        default:
          console.warn("Unknown Event:", type);
      }
    };

    setIsReady(true);
    markReady('worker');
    
    return () => {
      worker.terminate();
      setIsReady(false);
    };
  }, []);

  const subscribe = useCallback(
    (eventName: PomoEvents, callback: Listener): Unsubscribe => {
      if (!emitterRef.current) return () => {};
      return emitterRef.current.on(eventName, callback);
    },
    []
  );

  const controls = useMemo(
    () => ({
      start() {
        postMessage({ type: "START", payload: undefined });
      },
      pause() {
        postMessage({ type: "PAUSE", payload: undefined });
      },
      resume() {
        postMessage({ type: "RESUME", payload: undefined });
      },
      reset(defaultDuration:number) {
        postMessage({ type: "RESET", payload: {duration:defaultDuration} });
      },
      init(intial: ITimerInit) {
        postMessage({ type: "INIT", payload: { ...intial } });
      },
      subscribe,
      isReady,
    }),
    [isReady]
  );

  return controls;
}
