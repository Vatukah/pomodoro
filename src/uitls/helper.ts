import { v4 as UUID } from "uuid";


const months= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


export const modeMapToSetting = {
  "focus" : "focusTime",
  "short-break" : 'BreakTime',
  "long-break" :'LongBreakTime'

}

export function convertToSeconds(min: number, sec: number): number {
  if (isNaN(min) || isNaN(sec)) return 0;
  return min * 60 + sec;
}

export function convertToMinutes(seconds: number) {
  if (isNaN(seconds)) return { min: 0, sec: 0 };

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return { min, sec };
}

export function secondsToRadians(seconds: number): number {
  return -(seconds / 3600) * (2 * Math.PI);
}

export function formatTimerValue(
  current: number | null | undefined,
  defaultValue: number
): string {
  const value = current ?? defaultValue;
  return value.toString().padStart(2, "0");
}




export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getTodayDate(): string {
  const now = new Date();

  const day = now.getDate();
  // .getMonth() is 0-indexed (0 = Jan, 11 = Dec), so we add 1
  const month = months[now.getMonth()]; 
  const year = now.getFullYear();

  return `${day}, ${month}, ${year}`;
}

export const sessionCopy = (count: number) => {
    if (count <= 2) return "Light and easy — warming up nicely ☕";
    if (count <= 4) return "Solid focus zone. Consistent and smart 💪";
    if (count <= 6) return "Deep work mode activated. Respect 🔥";
    return "Full beast mode. Please remember to blink 🧠⚡";
  };
export const levelColor = (count: number) => {
  if (count <= 2) return "var(--level-low)";
  if (count <= 4) return "var(--level-medium)";
  if (count <= 6) return "var(--level-high)";
  return "var(--level-extreme)";
};

export const generateUUID =():string=>{
    return UUID()
}