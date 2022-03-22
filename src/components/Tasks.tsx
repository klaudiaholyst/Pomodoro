import { useEffect, useState } from "react";
import "./Tasks.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import NewTask from "./NewTask";
import EditTask from "./EditTask";

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

  const selectedTodo = todos.find((task) => task.id === selectedTodoId);

  const [addNewTaskComponentActive, setAddNewTaskComponentActive] =
    useState(false);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState<string>("");

  const handleEditTaskComponent = (id: string) => {
    setEditingTaskId(id);
  };

  const handleEditTask = (task: Todo) => {
    setTodos((prevState) => {
      const newTodos = [...prevState];
      const index = newTodos.findIndex((item) => item.id === task.id);
      newTodos[index] = task;
      return newTodos;
    });
  };
  const handleAddNewTaskComponent = () => {
    setAddNewTaskComponentActive((prevState) => !prevState);
  };

  const handleAddNewTask = (task: Todo) => {
    setTodos((prevTodos) => [...prevTodos, task]);
  };

  const handleDeleteTask = (id: string) => {
    setTodos((prevState) => [...prevState].filter((item) => item.id !== id));
  };

  const handleSelectTask = (id: string) => {
    setSelectedTodoId(id);
  };

  const handleSetTaskDone = (id: string) => {
    const newTasks = [...todos];
    const task = newTasks.find((task) => task.id === id)!;
    task.isDone = !task.isDone;
    setTodos(newTasks);
  };

  const handleClearAllTasks = () => {
    setTodos([]);
    setIsDropdownActive(false);
  };

  const handleClearDoneTasks = () => {
    setTodos((prevState) => [...prevState].filter((task) => !task.isDone));
    setIsDropdownActive(false);
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

  useEffect(() => {
    props.setSelectedTask(selectedTodo!);
  }, [selectedTodo]);

  return (
    <div className="containerNarrow">
      <div className="topContainer">
        <h2 className="title">Tasks</h2>
        <div className={`dropdown is-right ${isDropdownActive && "is-active"}`}>
          <div className="dropdown-trigger">
            <button
              className="button titleIcon"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsDropdownActive((isActive) => !isActive)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <p className="dropdown-item" onClick={handleClearDoneTasks}>
                <FontAwesomeIcon icon={faTrash} className="trashIcon" />
                Clear finished tasks
              </p>
              <hr className="dropdown-divider" />
              <p className="dropdown-item" onClick={handleClearAllTasks}>
                <FontAwesomeIcon icon={faTrash} className="trashIcon" />
                Clear all tasks
              </p>
            </div>
          </div>
        </div>
      </div>

      <ul className="ul">
        {todos.map((todo) =>
          editingTaskId === todo.id ? (
            <EditTask
              key={todo.id}
              task={todo}
              setInactive={() => setEditingTaskId("")}
              editTask={(task) => handleEditTask(task)}
              deleteTask={(id) => handleDeleteTask(id)}
            />
          ) : (
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
                <button
                  className="button dotsIcon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTaskComponent(todo.id);
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </div>
            </li>
          )
        )}
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
