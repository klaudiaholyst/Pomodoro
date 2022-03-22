import { useState } from "react";

import { ModeType, Todo } from "./types/types";

import "./App.css";
import "bulma/css/bulma.min.css";

import Timer from "./components/Timer";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Tasks from "./components/Tasks";
import Info from "./components/Info";
import Footer from "./components/Footer";

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
    type: ModeType.LONG_BREAK,
    duration: 15,
    color: "blue",
  });
  const [color, setColor] = useState("red");
  const [settingsActive, setSettingsActive] = useState(false);

  const [donePomodoros, setDonePomodoros] = useState<number>(0);

  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  const handleDonePomodoro = () => {
    setDonePomodoros((prevPomodoros) => prevPomodoros + 1);
  };

  return (
    <div className={`App ${color}`}>
      <Header
        setSettingsActive={() => setSettingsActive((prevState) => !prevState)}
      />
      <Timer
        modeColor={(color) => setColor(color)}
        pomodoro={pomodoro}
        shortBreak={shortBreak}
        longBreak={longBreak}
        donePomodoros={donePomodoros}
        setPomodoroDone={() => handleDonePomodoro()}
      />
      <Settings
        settingsActive={settingsActive}
        pomodoroMinutes={pomodoro.duration}
        longBreakMinutes={longBreak.duration}
        shortBreakMinutes={shortBreak.duration}
        closeSettings={() => setSettingsActive(false)}
        changeModesDuration={(values) => {
          setPomodoro((prevState) => ({
            ...prevState,
            duration: values.pomodoro,
          }));
          setShortBreak((prevState) => ({
            ...prevState,
            duration: values.shortBreak,
          }));
          setLongBreak((prevState) => ({
            ...prevState,
            duration: values.longBreak,
          }));
        }}
      />
      <Info selectedTask={selectedTask} />
      <Tasks
        donePomodoros={donePomodoros}
        setSelectedTask={(task) => setSelectedTask(task)}
      />
      <Footer />
    </div>
  );
}

export default App;
