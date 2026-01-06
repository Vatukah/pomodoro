import {
  useContext,
  createContext,
  type ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type {
  MODE,
  IPomodoroActionContext,
  IPomodoroContext,
  SessionIntent,
  MessageMap,
  TimerStatus,
  UUIDTypes,
  timerConfig,
} from "../type";
import { usePomodoroWorker } from "../hooks/usePomodoroWorker";

import { useSettingsStore } from "../store/settings.store";

const pomodoroActionContext = createContext<IPomodoroActionContext>({
  startCurrentSession() {},
  initTaskSession() {},
  initFreeSession() {},
  startNewFreeFlow() {},
  reset: () => {},
  pause: () => {},
  resume: () => {},
  subscribe: () => () => {},
  init: () => {},
  status: "idle",
  isReady: false,
});

const pomodoroContext = createContext<IPomodoroContext>({
  mode: "focus",
  sessionCount: 0,
  flowMode: false,
  toggleFlowMode: () => {},
  decideNextSession: () => "focus",
});

export default function PomodoroProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [intent, setIntent] = useState<SessionIntent>({ type: "free" });

  const settings = useSettingsStore( s => s.settings);
  const getSetting = useSettingsStore( s => s.getSetting);

  const [timerConfig, setTimerConfig] = useState<timerConfig>(() => {
    const { focusTime, breakTime, longBreakTime } = settings;
    return {
      focus: focusTime,
      shortBreak: breakTime,
      longBreak: longBreakTime,
    };
  });

  const [currentSessionType, setCurrentSessionType] = useState<MODE>("focus");
  const [focusCompletedCount, setFocusCompletedCount] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("idle");

  const [flowMode, setFlowMode] = useState<boolean>(false);

  const isTimerActive = ["ticking", "paused"].includes(timerStatus);
  const isAutoInitAllowed = useRef<boolean>(true);

  const { subscribe, start, reset, resume, pause, isReady, init } =
    usePomodoroWorker();

  // const completedPomodoroSession =  useRef<number>(0);
  const decideNextSession = useCallback(
    function decideNextSession(completedSession: MODE): MODE {
      if (completedSession === "focus") {
        const nextFocusCount = focusCompletedCount + 1;

        if (nextFocusCount % 4 === 0) {
          return "long-break";
        }
        return "short-break";
      }

      // break always leads to focus
      return "focus";
    },
    [focusCompletedCount]
  );
  const scheduleNextSession = useCallback(
    function scheduleNextSession(nextSession: MODE) {
      setCurrentSessionType(nextSession);

      if (!flowMode) return;

      if (intent.type !== "free") return;
      // small buffer so UI can update
      setTimeout(() => {
        start();
      }, 1500);
    },
    [flowMode, start, intent]
  );

  const getTimeForMode = useCallback(
    function getTimeForMode(mode: MODE) {
      if (mode === "focus") {
        return timerConfig.focus;
      } else if (mode === "short-break") {
        return timerConfig.shortBreak;
      } else {
        return timerConfig.longBreak;
      }
    },
    [timerConfig]
  );

  const onSessionCompleted = useCallback(
    function onSessionCompleted() {
      if (!currentSessionType) return;

      isAutoInitAllowed.current = false;

      setFocusCompletedCount((prev) =>
        currentSessionType === "focus" ? prev + 1 : prev
      );

      const nextSession = decideNextSession(currentSessionType);

      const duration = getTimeForMode(nextSession);
      init({
        duration,
        id: intent.type === "task" ? intent.taskId : null,
        mode: nextSession,
      });

      scheduleNextSession(nextSession);
    },
    [
      currentSessionType,
      decideNextSession,
      getTimeForMode,
      intent,
      init,
      scheduleNextSession,
    ]
  );

  const initFreeSession = useCallback(
    function initFreeSession() {
      setIntent({ type: "free" });
      setFocusCompletedCount(0);
      setCurrentSessionType("focus");
      const duration = getSetting('focusTime');// focus time duration
      
      setTimerConfig((prev) => ({ ...prev, focus:duration}));

      init({ duration, id: null, mode: 'focus' });
    },
    [init,getSetting]
  );

  const startNewFreeFlow = useCallback(
    function startNewFreeFlow() {
      setIntent({ type: "free" });
      setFocusCompletedCount(0);
      setCurrentSessionType("focus");
     

      const duration = getTimeForMode("focus");
      init({ duration, id: null, mode: 'focus' });
      start();
    },
    [getTimeForMode, init, start]
  );

  const resetToDefault = useCallback(
    function resetToDefault() {
      const duration = getTimeForMode(currentSessionType);
      reset(duration);
    },
    [getTimeForMode, currentSessionType]
  );

  // const startTaskSession = useCallback(
  //   function startTaskSession(taskId: UUIDTypes, focusTime?: number) {
  //     setIntent({ type: "task", taskId });
  //     setFocusCompletedCount(0);
  //     setCurrentSessionType("focus");

  //     const duration = focusTime ? focusTime : getTimeForMode("focus");
  //     init({ duration, id: taskId, title: null });
  //     start();
  //   },
  //   [getTimeForMode, init, start]
  // );

  const initTaskSession = useCallback(
    function initTaskSession(taskId: UUIDTypes, focusTime?: number) {
      setIntent({ type: "task", taskId });
      setFocusCompletedCount(0);
      setCurrentSessionType("focus");
      setTimerConfig((prev) => ({ ...prev, focus:focusTime? focusTime : prev.focus }));

      const duration = focusTime ? focusTime : getTimeForMode("focus");
      init({ duration, id: taskId, mode: 'focus' });
    },
    [getTimeForMode, init]
  );

  const startCurrentSession = useCallback(
    function startCurrentSession() {
      if (!currentSessionType) return;
      const duration = getTimeForMode(currentSessionType);

      init({
        duration,
        id: intent.type === "task" ? intent.taskId : null,
        mode: currentSessionType,
      });

      start();
    },
    [currentSessionType, intent, getTimeForMode, init, start]
  );

  function onStatusChange(payload: MessageMap["status"]) {
    const { status } = payload;
    setTimerStatus(status);
  }


  useEffect(
    function completeEventSubscriber() {
      const unsub = subscribe("complete", onSessionCompleted);
      return () => unsub();
    },
    [subscribe, onSessionCompleted]
  );

  useEffect(
    function statusEventSubscriber() {
      const unsub = subscribe("status", onStatusChange);
      return () => unsub();
    },
    [subscribe]
  );

  const toggleFlowMode = () => {
    setFlowMode((prev) => !prev);
  };

  useEffect(
    function intialiseTimerOnSettingChg() {
      if(!isAutoInitAllowed.current){
        isAutoInitAllowed.current = true;
        return;
      }

      if (isTimerActive) return;

      const duration = getTimeForMode(currentSessionType);
      init({
        duration,
        id: intent.type === "task" ? intent.taskId : null,
        mode: currentSessionType,
      });
    },
    [currentSessionType, getTimeForMode]
  );

  useEffect(() => {
    if (isTimerActive || intent.type === "task") return;
    const { focusTime, breakTime, longBreakTime } = settings;
    const timeConfig = {
      focus: focusTime,
      shortBreak: breakTime,
      longBreak: longBreakTime,
    };

    setTimerConfig((prev) => ({ ...prev, ...timeConfig }));
  }, [settings.focusTime, settings.breakTime, settings.longBreakTime]);

  const pomodoroValue = useMemo(
    () => ({
      mode: currentSessionType,
      sessionCount: focusCompletedCount,
      flowMode,
      decideNextSession,
      toggleFlowMode,
    }),
    [currentSessionType, focusCompletedCount, flowMode]
  );

  const pomodoroActionValue = useMemo(
    () => ({
      startNewFreeFlow,
      startCurrentSession,
      initTaskSession,
      initFreeSession,
          reset: resetToDefault,
      pause,
      resume,
      subscribe,
      init,
      status: timerStatus,
      isReady,
    }),
    [
      isReady,
      startCurrentSession,
      startNewFreeFlow,
      initFreeSession,
      initTaskSession,
      timerStatus,
    ]
  );

  return (
    <pomodoroActionContext.Provider value={pomodoroActionValue}>
      <pomodoroContext.Provider value={pomodoroValue}>
        {children}
      </pomodoroContext.Provider>
    </pomodoroActionContext.Provider>
  );
}

export const usePomodoro = () => useContext(pomodoroContext);
export const usePomodoroAction = () => useContext(pomodoroActionContext);
