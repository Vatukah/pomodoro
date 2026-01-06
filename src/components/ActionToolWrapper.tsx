
import BottomTools from "./tools/BottomTools";
import TopTools from "./tools/TopTools";
import useBottomTool from "../hooks/useBottomTool.ts";

export default function ActionToolWrapper(){
   const bottomTool = useBottomTool();

 

    return(
        <>
        <TopTools timerModal={bottomTool.isSetTimerActive}/>
        <BottomTools timerModal={bottomTool.isSetTimerActive} bottomActions={bottomTool} />
        </>
    )
}