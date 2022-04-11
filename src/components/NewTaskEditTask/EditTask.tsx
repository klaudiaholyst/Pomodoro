import { useState } from "react";

import { Todo } from "../../types/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "./NewTaskEditTask.css";

interface EditTaskProps {
  task: Todo;
  setInactive: () => void;
  editTask: (task: Todo) => void;
  deleteTask: (id: string) => void;
}
const EditTask = (props: EditTaskProps) => {
  const [task, setTask] = useState<string>(props.task.name);

  const [count, setCount] = useState(props.task.pomodoroAmount);
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

  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleFormReset = () => {
    setCount(1);
    setTask("");
  };

  const handleCloseComponent = () => {
    handleFormReset();
    props.setInactive();
  };

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.editTask({
      id: props.task.id,
      name: task,
      pomodoroAmount: count,
      pomodorosDone: props.task.pomodorosDone,
      isDone: props.task.isDone,
    });
    handleCloseComponent();
  };

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.deleteTask(props.task.id);
    handleCloseComponent();
  };
  return (
    <li key={props.task.id}>
      <div className="containerNarrow box modal-card addTaskContainer">
        <form onSubmit={handleEditTask}>
          <div className="modal-card-body taskQuestion">
            <input
              className="input is-medium input--noBorder "
              placeholder="What are your working on?"
              autoFocus
              value={task}
              onChange={handleTaskName}
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
          <div className="modal-card-foot buttons">
            <button
              type="button"
              className="button button--cancel"
              onClick={handleDeleteTask}
            >
              Delete
            </button>
            <div>
              <button
                type="button"
                className="button button--cancel"
                onClick={handleCloseComponent}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button button--save"
                disabled={task.trim() === ""}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>
  );
};

export default EditTask;
