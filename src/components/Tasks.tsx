import { useState } from "react";
import "./Tasks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

interface Todo {
  id: string;
  name: string;
  isDone: boolean;
  inProgressNow: boolean;
}

interface TasksProps {
  initialTodos: Todo[];
}

const Tasks = ({ initialTodos }: TasksProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [selectedTodoId, setSelectedTodoId] = useState<string>();

  const selectedTodo = todos.find((todo) => todo.id === selectedTodoId);
  return (
    <div className="containerNarrow">
      <h2 className="title">Tasks</h2>
      <ul className="ul">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`box is-fullwidth li ${todo.inProgressNow && "active"}`}
          >
            <div className="taskDetails">
              <FontAwesomeIcon icon={faCircleCheck} className="taskIcon" />
              <p className="taskName">{todo.name}</p>
            </div>
            <div className="taskDetails">
              <p>1/4</p>
              <button className="button dotsIcon">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="button is-fullwidth button--newTask">
        <FontAwesomeIcon icon={faCirclePlus} className="taskIcon" />
        Add new task
      </button>
    </div>
  );
};

export default Tasks;
