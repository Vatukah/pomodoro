import { useCallback, useEffect, useState } from "react";

import FlexContainer from "../flexContainer";
import BorderBtn from "../buttons/borderBtn";


import { Icon } from "../icon";
import type { ITimerForm } from "../../type";
import IconBtn from "../buttons/IconButton";

export default function TimerForm({
  savedValue,
  options,
  label,
  onChange,
  children,
  customCallback,
}: ITimerForm) {
  const [opts, setOpt] = useState(options);
  const [selected, setSelected] = useState<number | null>(null);

  const getOnlyThree = useCallback(() => {
    if (!savedValue) return;
    //cause duration saved in seconds
    const min = Math.floor(savedValue / 60);

    let copyOptions = [...options];

    if (copyOptions.includes(min)) {
      setSelected(min);
      return;
    }

    let isGreaterThanAll = copyOptions.every((val) => val < min);

    if (isGreaterThanAll) {
      copyOptions = copyOptions.slice(0, 2);
      copyOptions.push(min);
    } else {
      copyOptions.push(min);
      copyOptions.sort((a, b) => a - b);
      copyOptions = copyOptions.slice(0, 3);
    }

    setSelected(min);
    setOpt(copyOptions);
  }, [options, savedValue]);

  const handleChange = (val: number) => {
    setSelected(val);
    onChange(val);
  };

  useEffect(() => {
    getOnlyThree();
  }, [savedValue]);

  return (
    
      <div className="timerForm" data-name={label}>
        <div className="timerForm-head">{children}</div>
        <FlexContainer justify="space-between"  align="center"  className="timerForm_body">
          <FlexContainer gap="lg"  style={{ fontWeight: 600 }}>
            {opts.map((value) => (
              <BorderBtn
                text={value + " mins"}
                action={() => handleChange(value)}
                isActive={value === selected}
                key={value}
              >
                <Icon name="Timer" />
              </BorderBtn>
            ))}
          </FlexContainer>
          <IconBtn text={"custom"} action={customCallback} icon="Timer"/>
    
        </FlexContainer>
      </div>
 
    
  );
}
