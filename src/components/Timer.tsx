import { useEffect, useState } from "react";
import "./Timer.css";

enum ModeType {
  POMODORO = "pomodoro",
  SHORT_BREAK = "short_break",
  LONG_BREAK = "long_break",
}

type ModeTypes = ModeType.POMODORO | ModeType.SHORT_BREAK | ModeType.LONG_BREAK;

interface ModeInterface {
  type: ModeType;
  duration: number;
  color: string;
}
const pomodoro = {
  type: ModeType.POMODORO,
  duration: 15,
  color: "red",
};
const shortBreak = {
  type: ModeType.SHORT_BREAK,
  duration: 5,
  color: "green",
};
const longBreak = {
  type: ModeType.POMODORO,
  duration: 15,
  color: "blue",
};

const Timer = () => {
  const [minutes, setMinutes] = useState<number>(pomodoro.duration);
  const [seconds, setSeconds] = useState<number>(0);
  const [isCounting, setIsCounting] = useState(false);
  const [finishedCounting, setFinishedCounting] = useState(false);
  const [mode, setMode] = useState(pomodoro);
  const [donePomodoros, setDonePomodoros] = useState<number>(0);

  const handleButton: React.MouseEventHandler = () => {
    setIsCounting(!isCounting);
  };

  const handleMode = (mode: ModeInterface) => {
    setIsCounting(false);
    setMode(mode);
    setMinutes(mode.duration);
    setSeconds(0);
  };

  useEffect(() => {
    if (isCounting) {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
          setIsCounting(false);
          setFinishedCounting(true);
          mode.type === ModeType.POMODORO &&
            setDonePomodoros(donePomodoros + 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCounting, seconds, minutes]);

  return (
    <div className={`section ${mode.color}`}>
      <div className="timer box">
        <div className="container">
          <button
            className={`button  ${mode === pomodoro && "is-active"}`}
            onClick={() => handleMode(pomodoro)}
          >
            Pomodoro
          </button>
          <button
            className={`button  ${mode === shortBreak && "is-active"}`}
            onClick={() => handleMode(shortBreak)}
          >
            Short Break
          </button>
          <button
            className={`button  ${mode === longBreak && "is-active"}`}
            onClick={() => handleMode(longBreak)}
          >
            Long Break
          </button>
        </div>
        <div className="container">
          <p className="time">
            {minutes < 10 && "0"}
            {minutes} : {seconds < 10 && "0"}
            {seconds}
          </p>
        </div>
        <div className="container">
          <button
            className={`button start ${mode.color}`}
            onClick={handleButton}
          >
            {!isCounting ? "START" : "STOP"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Timer;
