import { useState } from "react";
import "./Tasks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewTask from "./NewTask";

interface Todo {
  id: string;
  name: string;
  pomodoroAmount: number;
  pomodorosDone: number;
  inProgressNow: boolean;
}

interface TasksProps {
  initialTodos: Todo[];
}

const Tasks = ({ initialTodos }: TasksProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [selectedTodoId, setSelectedTodoId] = useState<string>();

  const [addNewTaskComponentActive, setAddNewTaskComponentActive] =
    useState(false);

  const selectedTodo = todos.find((todo) => todo.id === selectedTodoId);

  const handleAddNewTaskComponent = () => {
    console.log("handleAddNewTaskComponent", addNewTaskComponentActive);
    setAddNewTaskComponentActive((prevState) => !prevState);
  };

  const handleAddNewTask = (task: Todo) => {
    setTodos((prevTodos) => [...prevTodos, task]);
  };
  return (
    <div className="containerNarrow">
      <h2 className="title">Tasks</h2>
      <ul className="ul">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`box is-fullwidth li ${
              todo.id === selectedTodoId && "active"
            }`}
            onClick={() => setSelectedTodoId(todo.id)}
          >
            <div className="taskDetails">
              <FontAwesomeIcon icon={faCircleCheck} className="taskIcon" />
              <p className="taskName">{todo.name}</p>
            </div>
            <div className="taskDetails">
              <p>
                {todo.pomodorosDone}/{todo.pomodoroAmount}
              </p>
              <button className="button dotsIcon">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {addNewTaskComponentActive ? (
        <NewTask
          setInactive={handleAddNewTaskComponent}
          addNewTask={handleAddNewTask}
        />
      ) : (
        <button
          className="button is-fullwidth button--newTask"
          onClick={handleAddNewTaskComponent}
        >
          <FontAwesomeIcon icon={faCirclePlus} className="taskIcon" />
          Add new task
        </button>
      )}
    </div>
  );
};

export default Tasks;
