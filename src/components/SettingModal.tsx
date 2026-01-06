
import GhostBtn from "./buttons/ghostBtn";
import { Icon } from "./icon";
import { useState } from "react";
import TimerSounds from "./form/sound.form";

import TimerForm from "./form/Timer.form";
import SectionBreaker from "./SectionBreaker";
import useBottomTool from "../hooks/useBottomTool.ts";
import { useSettingsStore } from "../store/settings.store.ts";



export default function SettingModal({ close }: { close: () => void }) {
  const updateSettings = useSettingsStore((s) => s.updateSettings);
  const getSettings = useSettingsStore((s) => s.getSetting);
  const { openSetTimer } = useBottomTool();
  const [exitAnime, setExitAnime] = useState<boolean>(false);

  const animateCloseModal = () => {
    setExitAnime(true);
    setTimeout(() => {
      close();
    }, 420);
  };

  return (
    <div
      className={`settingModal ${exitAnime ? "exit-setting-modal" : "enter-setting-modal"
        }`}
    >
      <div className="setting_mdl_header">
        <div className="title">
          <Icon name="Settings" color="#ff6347" />
          Settings
        </div>
        <GhostBtn text="close" action={animateCloseModal}>
          <Icon name="X" />
        </GhostBtn>

      </div>
      <div className="setting_mdl_body">


        <div >
          <h4>Change Durations</h4>
          <p style={{ color: "var(--text-light)" }} >Personalize each interval to build a rhythm that keeps you energized.</p>
          <TimerForm
            savedValue={getSettings('focusTime')}
            options={[15, 25, 35]}
            onChange={(val) => updateSettings({ focusTime: val * 60 })}
            label="focus-time"
            customCallback={() => openSetTimer('focus')}
          >
            Focus for :
          </TimerForm>
          <SectionBreaker />
          <TimerForm
            savedValue={getSettings('breakTime')}
            options={[3, 5, 10]}
            onChange={(val) => updateSettings({ breakTime: val * 60 })}
            label="break-time"
            customCallback={() => openSetTimer("short-break")}
          >
            Take a short break :
          </TimerForm>
          <SectionBreaker />
          <TimerForm
            savedValue={getSettings("longBreakTime")}
            options={[10, 15, 25]}
            onChange={(val) => updateSettings({ longBreakTime: val * 60 })}
            label="long-break-time"
            customCallback={() => openSetTimer("long-break")}
          >
            Take a long break :
          </TimerForm>
          <SectionBreaker />
        </div>

        <div  >
          <h4>Sound Customization</h4>
          <p style={{ color: "var(--text-light)" }} > Tune your alert sounds and volume to fit your workflow.</p>
        </div>

        <TimerSounds />
      </div>
    </div>
  );
}
