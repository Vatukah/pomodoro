import { useCallback, useEffect, useRef, useState } from "react";
import { useTomato } from "../context/tomatoProvider";
import { convertToMinutes, convertToSeconds } from "../uitls/helper";
import type { MODE, Settings } from "../type";
import { playGearDecrease, playGearIncrease } from "../uitls/audio";
import { useSettingsStore } from "../store/settings.store";


export default function SetTimerModal({
  changeTimeOf,
}: {
  changeTimeOf: MODE;
}) {
  const { animationController } = useTomato();
  const updateSettings = useSettingsStore((s) => s.updateSettings);
  const getSettings = useSettingsStore((s) => s.getSetting);
  const [count, setCount] = useState<number>(0);
  const hasChanged = useRef<boolean>(false);

  const ref = useRef<number | null>(null);
  const debounceId = useRef<ReturnType<typeof setInterval> | null>(null);

  const copyOfSetting = useRef<Settings>({ ...getSettings() });

  const handleTimechange = (e: React.WheelEvent<HTMLDivElement>): void => {
    if (debounceId.current) {
      clearTimeout(debounceId.current);
      debounceId.current = null;
    }
    if (!ref.current) return;

    if (e.deltaY > 0) {
      if (ref.current === 59) return;
      ref.current += 1;
      playGearIncrease();
    } else {
      if (ref.current === 1) return;
      ref.current -= 1;
      playGearDecrease();
    }

    const seconds = convertToSeconds(ref.current, 0);

    animationController?.tickRotate(seconds);
    setCount(ref.current);

    debounceId.current = setTimeout(() => {
      const updated: Settings = updatedTime();
      copyOfSetting.current = { ...updated };
      hasChanged.current = true;
    }, 10);
  };

  const updatedTime = useCallback((): Settings => {
    if (!ref.current) return copyOfSetting.current;

    let updated: Settings = { ...copyOfSetting.current }; // clone current settings

    if (changeTimeOf === "focus") {
      updated = {
        ...updated,
        focusTime: convertToSeconds(ref.current, 0),
      };
    } else if (changeTimeOf === "short-break") {
      updated = {
        ...updated,
        breakTime: convertToSeconds(ref.current, 0),
      };
    } else {
      updated = {
        ...updated,
        longBreakTime: convertToSeconds(ref.current, 0),
      };
    }

    return updated;
  }, [changeTimeOf, ref.current]);

  useEffect(() => {
    let savedTime;

    if (changeTimeOf === "focus") {
      savedTime = copyOfSetting.current.focusTime;
    } else if (changeTimeOf === "short-break") {
      savedTime = copyOfSetting.current.breakTime;
    } else {
      savedTime = copyOfSetting.current.longBreakTime;
    }

    animationController?.tickRotate(savedTime);
    const time = convertToMinutes(savedTime);
    ref.current = time.min;
    setCount(time.min);

    return () => {
      ref.current = null;
      debounceId.current = null;
    };
  }, [changeTimeOf, animationController]);

  useEffect(() => {
    console.log("rendering");

    return () => {
      if (hasChanged.current) {
        updateSettings({ ...copyOfSetting.current });
        hasChanged.current = false;
      }
    };
  }, []);

  return (
    <div className="setTimerModal">
      <div className="progress">
        <h3>Set Your Pomodoro Time</h3>
        <p>
          Define timings for <span className="highlight">{changeTimeOf}</span>.
        </p>
        <div>
          <span className="value teko-400">
            {count < 10 ? `0${count}` : `${count}`} : 00
          </span>{" "}
          {count > 1 ? "Minutes" : "Minute"}
        </div>
      </div>
      <div className="input_container" onWheel={handleTimechange}></div>
    </div>
  );
}
