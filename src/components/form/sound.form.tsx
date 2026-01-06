import { useCallback } from "react";
import sfx from "../../uitls/sfx.json";
import type { SoundSetting } from "../../type";
import { playDemo, stopAllPlay } from "../../uitls/audio";
import SoundSelect from "./soundSelect.form";
import { useSettingsStore } from "../../store/settings.store";


export default function TimerSounds() {
  const updateSettings = useSettingsStore((s) => s.updateSettings);
  const getSettings = useSettingsStore((s) => s.getSetting);

  const availableSounds = sfx;

  const handleSoundChange = useCallback((target: string, value: string) => {
    stopAllPlay();
    const savedSetting = getSettings(); // don’t type as Object

    const updatedItem: SoundSetting = {
      ...savedSetting[target], // copy
      sound: value, // update
    };

    updateSettings({ [target]: updatedItem });
    playDemo(value, updatedItem.volume);
  }, []);

  const handleVolumeChange = useCallback((target: string, value: number) => {
    stopAllPlay();
    const savedSetting = getSettings(); // don’t type as Object

    const updatedItem: SoundSetting = {
      ...savedSetting[target],
      volume: value,
    };

    updateSettings({ [target]: updatedItem });
    playDemo(updatedItem.sound, updatedItem.volume);
  }, []);

  const toggleSound = () => {
    const { enableTicking: isTickingEnabled } = getSettings();
    updateSettings({ enableTicking: !isTickingEnabled });
  };
  const toggleAlarm = () => {
    const { enableComplete: isAlarmEnabled } = getSettings();
    updateSettings({ enableComplete: !isAlarmEnabled });
  };

  return (
    <>
      <SoundSelect
        label="Alarm"
        enabled={getSettings().enableComplete}
        options={availableSounds.complete}
        selectedSound={getSettings().complete.sound}
        onSoundChange={(val) => handleSoundChange("complete", val)}
        volume={getSettings().complete.volume}
        onVolumeChange={(val) => handleVolumeChange("complete", val)}
        onToggle={toggleAlarm}
      />
      <SoundSelect
        label="Sound"
        enabled={getSettings().enableTicking}
        options={availableSounds.ticking}
        selectedSound={getSettings().ticking.sound}
        onSoundChange={(val) => handleSoundChange("ticking", val)}
        volume={getSettings().ticking.volume}
        onVolumeChange={(val) => handleVolumeChange("ticking", val)}
        onToggle={toggleSound}
      />
    </>
  );
}
