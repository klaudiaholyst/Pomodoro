import { Todo } from "../types/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import "./Info.css";

interface InfoProps {
  selectedTask: Todo | null;
}

const Info = (props: InfoProps) => {
  const text = props.selectedTask ? (
    <>
      <p className="text">You are now working on: </p>
      <p>{props.selectedTask.name}</p>
      <p className="text">
        {props.selectedTask.pomodorosDone} out of{" "}
        {props.selectedTask.pomodoroAmount} Pomodoros done{" "}
        <FontAwesomeIcon icon={faThumbsUp} />
      </p>
    </>
  ) : (
    <p>Select a task and start Pomodoro.</p>
  );
  return <div className="containerNarrow info">{text}</div>;
};

export default Info;
