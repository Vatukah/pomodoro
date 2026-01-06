import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Settings } from "../type";
import { defaultSettings } from "../uitls/defaultVal";

type SettingsStore = {
  settings: Settings;

  updateSettings: (patch: Partial<Settings>) => void;

  // overloads
  getSetting(): Settings;
  getSetting<K extends keyof Settings>(key: K): Settings[K] ;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: { ...defaultSettings },

      updateSettings: (patch) =>
        set((state) => ({
          settings: { ...state.settings, ...patch },
        })),

      // 👇 EXPLICIT implementation signature
      getSetting<K extends keyof Settings>(key?: K) {
  const settings = get().settings;
  if (key) {
    return settings[key];
  }
  return settings as Settings; // Cast 'any' or 'Settings' to satisfy both overloads
},
    }),
    { name: "settings" }
  )
);
