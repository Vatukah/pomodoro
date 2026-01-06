import CanvasContainer from "./components/canvas/canvas";
import BigDigit from "./components/BigDigit";
import Model from "./components/tomato";
import ModelGroup from "./components/canvas/modelGroup";
import ActionToolWrapper from "./components/ActionToolWrapper";
import TodoPanel from "./components/panel/todoPanel";
import PomodoroAudioEffects from "./components/PomodoroAudioEffect";
import PomodoroTomatoBridge from "./components/PomodoroTomatoBridge";
import { useBoot } from "./context/bootProvider";


function App() {
  const { isBooted } = useBoot();

  if (!isBooted) return <div>Loading...</div>;
  return (
    <>
      <main className="main-container">
        <BigDigit />
        <CanvasContainer>
          <ModelGroup>
            <Model key={"tomato-modal"} />
          </ModelGroup>
        </CanvasContainer>
       
        <ActionToolWrapper />

        <TodoPanel />
        <PomodoroTomatoBridge />
        <PomodoroAudioEffects />
      </main>
    </>
  );
}

export default App;
