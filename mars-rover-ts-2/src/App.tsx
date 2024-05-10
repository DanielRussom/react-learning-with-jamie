import { useState } from "react";
import "./App.css";
import { MarsRoverController } from "./MarsRoverController";
import MarsGrid from "./MarsGrid";

function App() {
  const controller = new MarsRoverController();

  const [command, setCommand] = useState("");
  const [position, setPosition] = useState("0");

  function move(): void {
    setCommand(command + "M");
  }

  function turnRight(): void {
    setCommand(command + "R");
  }

  function turnLeft(): void {
    setCommand(command + "L");
  }

  function executeCommand(): void {
    setPosition(controller.execute(command));
  }

  return (
    <div className="App">
      <MarsGrid position={position} />
      <label htmlFor="command">Command:</label>
      <input id="command" disabled value={command} />
      <button onClick={move}>Move</button>
      <button onClick={turnRight}>Right</button>
      <button onClick={turnLeft}>Left</button>
      <button onClick={executeCommand}>Execute</button>
    </div>
  );
}

export default App;
