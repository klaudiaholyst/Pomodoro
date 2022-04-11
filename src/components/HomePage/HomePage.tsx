import { useState } from "react";

import { ModeType, Todo } from "../../types/types";

import "bulma/css/bulma.min.css";
import "./HomePage.css";

import Timer from "../Timer/Timer";
import Header from "../Header/Header";
import Settings from "../Settings/Settings";
import Tasks from "../Tasks/Tasks";
import Info from "../Info/Info";
import Footer from "../Footer/Footer";

const HomePage = () => {
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
    <div className={`HomePage ${color}`}>
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
};

export default HomePage;
