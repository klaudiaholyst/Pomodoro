import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./NewTask.css";

const NewTask = () => {
  const [count, setCount] = useState(1);
  const maxCount = 10;
  const minCount = 1;
  const incrementCount = () => {
    if (count < maxCount) {
      setCount((currValue) => currValue + 1);
    }
  };

  const decrementCount = () => {
    if (count > minCount) {
      setCount((currValue) => currValue - 1);
    }
  };

  const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minCount && value <= maxCount) {
      setCount(value);
    }
  };

  return (
    <div className="containerNarrow box modal-card addTaskContainer">
      <form>
        <div className="modal-card-body taskQuestion">
          <input
            className="input is-medium input--noBorder "
            placeholder="What are your working on?"
            autoFocus
          ></input>
        </div>

        <div className="modal-card-body">
          <label className="label">Est Pomodoros</label>
          <div>
            <input
              className="input input--small"
              type="number"
              max={10}
              min={1}
              value={count}
              onChange={handleCount}
            />
            <button
              className="button button--arrow"
              onClick={incrementCount}
              type="button"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            </button>
            <button
              className="button button--arrow"
              onClick={decrementCount}
              type="button"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            </button>
          </div>
        </div>
        <div className="modal-card-foot">
          <button className="button button--cancel">Cancel</button>
          <button type="submit" className="button button--save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewTask;
