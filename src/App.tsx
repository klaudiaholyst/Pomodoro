import { useState } from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import Timer from "./components/Timer";
import Header from "./components/Header";

function App() {
  const [color, setColor] = useState("red");
  return (
    <div className={`App ${color}`}>
      <Header />
      <Timer modeColor={(color) => setColor(color)} />
    </div>
  );
}

export default App;
