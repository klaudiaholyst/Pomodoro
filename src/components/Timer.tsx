import { useEffect, useState } from "react";
import Modal from "./Modal";
import "./Timer.css";

enum ModeType {
  POMODORO = "pomodoro",
  SHORT_BREAK = "short_break",
  LONG_BREAK = "long_break",
}

interface ModeInterface {
  type: ModeType;
  duration: number;
  color: string;
}

interface TimerProps {
  modeColor: (color: string) => void;
  pomodoro: ModeInterface;
  shortBreak: ModeInterface;
  longBreak: ModeInterface;
}

const Timer = (props: TimerProps) => {
  const [minutes, setMinutes] = useState<number>(props.pomodoro.duration);
  const [seconds, setSeconds] = useState<number>(0);
  const [isCounting, setIsCounting] = useState(false);
  const [finishedCounting, setFinishedCounting] = useState(false);
  const [mode, setMode] = useState(props.pomodoro);
  const [donePomodoros, setDonePomodoros] = useState<number>(0);

  const [sound] = useState(new Audio("/clickSound.wav"));
  const [playing, setPlaying] = useState(false);

  const [isModalActive, setIsModalActive] = useState(false);
  const [newMode, setNewMode] = useState<ModeInterface>(props.pomodoro);

  useEffect(() => {
    showNewMode(props.pomodoro);
  }, [props.pomodoro, props.longBreak, props.shortBreak]);

  const handleStartStopButton: React.MouseEventHandler = () => {
    setIsCounting(!isCounting);
    setPlaying(true);
  };
  const showNewMode = (mode: ModeInterface) => {
    setMode(mode);
    setMinutes(mode.duration);
    setSeconds(0);
    props.modeColor(mode.color);
  };
  const handleMode = (mode: ModeInterface) => {
    if (isCounting) {
      setNewMode(mode);
      setIsModalActive(true);
    } else {
      showNewMode(mode);
    }
  };

  const handleSwitchMode = (mode: ModeInterface) => {
    setIsCounting(false);
    showNewMode(mode);
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

  useEffect(() => {
    sound.addEventListener("ended", () => setPlaying(false));
    return () => {
      sound.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  useEffect(() => {
    playing && sound.play();
  }, [playing]);
  console.log(
    "props.pomodoro.duration",
    props.pomodoro.duration,
    "minutes",
    minutes
  );
  return (
    <>
      <div className="containerWide">
        <progress
          className="progressBar"
          value={mode.duration * 60 - (minutes * 60 + seconds)}
          max={mode.duration * 60}
        ></progress>
      </div>

      <div className="timer box">
        <div className="container">
          <button
            className={`button  ${mode === props.pomodoro && "is-active"}`}
            onClick={() => handleMode(props.pomodoro)}
          >
            Pomodoro
          </button>
          <button
            className={`button  ${mode === props.shortBreak && "is-active"}`}
            onClick={() => handleMode(props.shortBreak)}
          >
            Short Break
          </button>
          <button
            className={`button  ${mode === props.longBreak && "is-active"}`}
            onClick={() => handleMode(props.longBreak)}
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
            onClick={handleStartStopButton}
          >
            {!isCounting ? "START" : "STOP"}
          </button>
        </div>
      </div>
      <Modal
        isActive={isModalActive}
        setInactive={() => setIsModalActive(false)}
        switchMode={() => handleSwitchMode(newMode)}
      />
    </>
  );
};
export default Timer;
