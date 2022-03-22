import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import useForm from "../hooks/useForm";

import "./Settings.css";

interface SettingsProps {
  settingsActive: boolean;
  pomodoroMinutes: number;
  longBreakMinutes: number;
  shortBreakMinutes: number;
  closeSettings: () => void;
  changeModesDuration: (input: { [a: string]: number }) => void;
}

const Settings = (props: SettingsProps) => {
  const { inputs, handleInputChange, handleSubmit } = useForm({
    pomodoro: props.pomodoroMinutes,
    longBreak: props.longBreakMinutes,
    shortBreak: props.shortBreakMinutes,
  });
  const saveSettings = () => {
    props.changeModesDuration(inputs);
    props.closeSettings();
  };
  return (
    <div className={`modal ${props.settingsActive && "is-active"}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <form onSubmit={handleSubmit}>
          <header className="modal-card-head">
            <p className="modal-card-title">Timer settings</p>
            <button
              className="delete"
              aria-label="close"
              onClick={props.closeSettings}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="formContainer">
              <div>
                <label className="label" htmlFor="pomodoro">
                  Pomodoro
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="pomodoro"
                    name="pomodoro"
                    min="1"
                    max="100"
                    onChange={handleInputChange}
                    value={inputs.pomodoro}
                  ></input>
                </div>
              </div>
              <div>
                <label className="label" htmlFor="shortBreak">
                  Short Break
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="shortBreak"
                    name="shortBreak"
                    min="1"
                    max="100"
                    onChange={handleInputChange}
                    value={inputs.shortBreak}
                  ></input>
                </div>
              </div>
              <div>
                <label className="label" htmlFor="longBreak">
                  Long Break
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="longBreak"
                    name="longBreak"
                    min="1"
                    max="100"
                    onChange={handleInputChange}
                    value={inputs.longBreak}
                  ></input>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              onClick={saveSettings}
              type="submit"
              className="button is-dark"
            >
              <FontAwesomeIcon icon={faCheck} className="headerIcon" />
              OK
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Settings;
