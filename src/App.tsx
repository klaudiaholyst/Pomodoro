import { useState } from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import Timer from "./components/Timer";
import Header from "./components/Header";
import Settings from "./components/Settings";

enum ModeType {
  POMODORO = "pomodoro",
  SHORT_BREAK = "short_break",
  LONG_BREAK = "long_break",
}

function App() {
  const [pomodoro, setPomodoro] = useState({
    type: ModeType.POMODORO,
    duration: 25,
    color: "red",
  });
  const [shortBreak, setShortBreak] = useState({
    type: ModeType.SHORT_BREAK,
    duration: 5,
    color: "green",
  });
  const [longBreak, setLongBreak] = useState({
    type: ModeType.POMODORO,
    duration: 15,
    color: "blue",
  });
  const [color, setColor] = useState("red");
  const [settingsActive, setSettingsActive] = useState(false);
  console.log(pomodoro);
  return (
    <div className={`App ${color}`}>
      <Header setSettingsActive={() => setSettingsActive(!settingsActive)} />
      <Timer
        modeColor={(color) => setColor(color)}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
      />
      <Settings
        settingsActive={settingsActive}
        pomodoroMinutes={pomodoro.duration}
        longBreakMinutes={longBreak.duration}
        shortBreakMinutes={shortBreak.duration}
        closeSettings={() => setSettingsActive(false)}
        changeModesDuration={(values) => {
          setPomodoro((pomodoro) => ({
            ...pomodoro,
            duration: values.pomodoro,
          }));
          setShortBreak((shortBreak) => ({
            ...shortBreak,
            duration: values.shortBreak,
          }));
          setLongBreak((longBreak) => ({
            ...longBreak,
            duration: values.longBreak,
          }));
        }}
      />
    </div>
  );
}

export default App;
