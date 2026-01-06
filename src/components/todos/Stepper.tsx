import { levelColor } from "../../uitls/helper";
import FlexContainer from "../flexContainer";

export default function Stepper({value, handleChange}:{value:number,handleChange:(value:number)=>void}){
    return(
        <FlexContainer
                  className="stepper"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((fs) => (
                    <FlexContainer
                      justify="center"
                      padding="xs"
                      align={"flex-end"}
                      className={`stepper_step ${value >= fs ? "is-active" : ""}`}
                      style={
                        { "--level-color": levelColor(value) } as React.CSSProperties
                      }
                      key={fs}
                      onClick={() => handleChange(fs)}
                    >
                      <span>{fs}</span>
                    </FlexContainer>
                  ))}
                </FlexContainer>
    )
}