
import FlexContainer from "../flexContainer";
import { Icon } from "../icon";
import SectionBreaker from "../SectionBreaker";
import VolumeBar from "../volumeBar";

export default function SoundSelect({
  label = "Sound",
  enabled,
  onToggle,
  options,
  selectedSound,
  onSoundChange,
  volume,
  onVolumeChange,
}: {
  label: string,
  enabled: boolean,
  onToggle: () => void,
  options: {},
  selectedSound: string,
  onSoundChange: (e: string) => void,
  volume: number,
  onVolumeChange: (value: number) => void
}) {
  return (
    <div className="soundSelect">
      {/* Header row */}
      <div className="soundSelect-header">
        {label}
      </div>
        


      {/* Settings body */}

      <div className="soundSelect-body">

        <FlexContainer justify="space-between">
          <label htmlFor="soundSelect-toggle" className="soundSelect-label">{`Enable ${label}`}</label>
           <button
           id="soundSelect-toggle"
          className="soundSelect-toggle"
          aria-pressed={enabled}
          onClick={onToggle}
        >
          {/* {enabled ? <Icon name="Volume2" /> : <Icon name="Volume" />} */}
        </button>
        </FlexContainer >
        {/* Sound dropdown */}

        <div className="soundSelect-field">
          <FlexContainer align="center" gap="sm" justify="space-between">
            <label htmlFor={`${label}-select`} className="soundSelect-label">{`${label} sound`}</label>
            <select
              id={`${label}-select`}
              value={selectedSound}
              onChange={(e) => onSoundChange(e.target.value)}
            >
              {Object.keys(options).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

          </FlexContainer>
        </div>


        {/* Volume slider */}
        <div className="soundSelect-field">
 <label className="soundSelect-label">Volume
          <VolumeBar
           
            val={volume}
            handleUpdate={onVolumeChange}
           
          />
          </label>
        </div>
      </div>

    </div>
  );
}
