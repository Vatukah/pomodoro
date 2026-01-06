import { useSettingsStore } from "../../store/settings.store";
import { convertToMinutes} from "../../uitls/helper";
import FlexContainer from "../flexContainer";

export default function TaskFocusDurationSelector({checkedDuration,prevDuration,handleChange}:{checkedDuration:string,prevDuration:number,handleChange:(value:string)=>void}) {
           const currentFocusDuration = useSettingsStore.getState().settings.focusTime
    return (<>
            <p className="label xsText ">Your Focus Duration is Changed.</p>
        <div className="taskFocusDurationSelector">
            <p className="xsText">Update focus duration</p>
           <FlexContainer  direction="column" padding="sm" >
            <label htmlFor="previous-duration" className="subText">
            <input
                type="radio"
                name="focus-duration"
                id="previous-duration"
                value={"previous"}
                onChange={()=>handleChange('previous')}
                checked={checkedDuration==='previous'}
            />
             {convertToMinutes(prevDuration).min} min  — Saved for this task</label>
            <label htmlFor="current-duration" className="subText">
            <input
                type="radio"
                name="focus-duration"
                id="current-duration"
                value={'current'}
                onChange={()=>handleChange('current')}
                 checked={checkedDuration==='current'}
            />
             {convertToMinutes(currentFocusDuration).min} min  — Current focus duration</label>
</FlexContainer>
        </div>
        </>
    )
}