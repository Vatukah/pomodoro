import { useCallback, useState } from "react";
import { Icon } from "./icon";
import FlexContainer from "./flexContainer";
import { debounce } from "../uitls/helper";

export default function VolumeBar({ val, handleUpdate }: {val: number, handleUpdate: (value:number) => void }) {

    const [volume, setVolume] = useState<number>(val);
   const throttle = useCallback(
  debounce((value:number) => handleUpdate(value), 400),
  []
);
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let value: any = e.target.value;
        value = parseInt(value);
        if (value < 5) {
            value = 5;
            e.target.value = String(5);       // <-- keeps the thumb at 5 instantly
        }
        setVolume(value);
        throttle(value);
    },[handleUpdate]);

 

    return (

        <FlexContainer className="volume-bar" gap="lg" padding="md lg" align="center" >
            <Icon name="Volume2" />
            <input type="range" name="volume-progress" id="volume-progress" defaultValue={volume} style={{ "--progress": `${volume}%` } as React.CSSProperties} min={0} max={100} onChange={handleChange} />
            <div className="volume-indicator">{volume}</div>
        </FlexContainer>
    )
}