import { useEffect, useState, useRef } from "react";
import { usePomodoroAction } from "../context/pomodoroProvider";
import {
  convertToMinutes,
    formatTimerValue,

} from "../uitls/helper";

import '../styles/bigDigit.css'
import type { PostMessagePayload } from "../type";
import { useSettingsStore } from "../store/settings.store";


function BigDigit() {
  const [timer, setTimer] = useState<{
    min: number | null;
    sec: number | null;
  }>({
    min: null,
    sec: null,
  });
  const [defaultTime, setDefaultTime] = useState<{ min: number; sec: number }>(
    () => {
      const modeTime = useSettingsStore.getState().settings.focusTime;
      return convertToMinutes(modeTime);
    }
  );
  const { subscribe, isReady } = usePomodoroAction();
  

  // Keep track of last time to avoid redundant updates
  const lastTimeRef = useRef<{ min: number; sec: number } | null>(null);

  useEffect(() => {
    if (!isReady) return;

    // --- tick subscription ---
    const unsub_tick = subscribe("tick", (payload) => {
      const {remaining} = payload
      const { min, sec } = convertToMinutes(remaining);

      const last = lastTimeRef.current;
      if (!last || last.min !== min || last.sec !== sec) {
        lastTimeRef.current = { min, sec };
       
        setTimer({ min, sec });
      }

      if (remaining === 0) {
        setTimer({ min: null, sec: null });
      }
    });

    // --- init subscription ---
    const unsub_init = subscribe("init", (payload:PostMessagePayload<'init'>['payload']) => {
      const {duration} = payload
      const { min, sec } = convertToMinutes(duration);
      setTimer({min:null,sec:null})
      setDefaultTime({ min, sec });
    });

    return () => {
      
      unsub_init();
      unsub_tick();
    
      
      lastTimeRef.current = null;
    };
  }, [isReady]);

  

  return (
    <div id="bigDigit" className="bigDigit teko-700" >
      <span>{formatTimerValue(timer.min, defaultTime.min)}</span>
      <span>{formatTimerValue(timer.sec, defaultTime.sec)}</span>
    </div>
  );
}

export default BigDigit;
