import { useEffect, useState } from "react";
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
  isDone: boolean;
}

interface TasksProps {
  donePomodoros: number;
  setSelectedTask: (task: Todo) => void;
}

const Tasks = (props: TasksProps) => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "abc",
      name: "Prepare for Math exam",
      pomodoroAmount: 4,
      pomodorosDone: 2,
      isDone: false,
    },
    {
      id: "abcde",
      name: "Prepare for Math exam on Wednesday",
      pomodoroAmount: 3,
      pomodorosDone: 0,
      isDone: true,
    },
  ]);

  const totalPomodorosDone = todos.reduce(
    (acc, obj) => acc + obj.pomodorosDone,
    0
  );

  const [selectedTodoId, setSelectedTodoId] = useState<string>();

  const [addNewTaskComponentActive, setAddNewTaskComponentActive] =
    useState(false);

  const handleAddNewTaskComponent = () => {
    setAddNewTaskComponentActive((prevState) => !prevState);
  };

  const handleAddNewTask = (task: Todo) => {
    setTodos((prevTodos) => [...prevTodos, task]);
  };

  const handleSelectTask = (id: string) => {
    setSelectedTodoId(id);
    props.setSelectedTask(todos.find((task) => task.id === id)!);
  };
  const handleSetTaskDone = (id: string) => {
    console.log(id);
    const newTasks = [...todos];
    const task = newTasks.find((task) => task.id === id)!;
    task.isDone = !task.isDone;
    setTodos(newTasks);
  };

  useEffect(() => {
    setTodos((prevTasks) => {
      const newTasks = [...prevTasks];
      const task = newTasks.find((task) => task.id === selectedTodoId);
      if (task) {
        task.pomodorosDone = task.pomodorosDone + 1;
      }
      return newTasks;
    });
  }, [props.donePomodoros]);

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
            onClick={() => handleSelectTask(todo.id)}
          >
            <div className="taskDetails">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={`taskIcon ${todo.isDone && "taskIcon--isDone"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSetTaskDone(todo.id);
                }}
              />
              <p className={`taskName ${todo.isDone && "taskName--isDone"}`}>
                {todo.name}
              </p>
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
