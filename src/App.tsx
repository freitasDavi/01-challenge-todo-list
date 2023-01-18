import { useState } from "react";
import Logo from "./assets/Logo.svg";
import clipboard from "./assets/Clipboard.png";
import plus from "./assets/plus.svg";
import trash from "./assets/trash.svg";

type Task = {
  task: string;
  completed: boolean;
  id: string;
}

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  let concluedTasks = tasks.filter((task) => task.completed === true);

  const addTask = () => {
    const id = newTask + "-" + new Date().toString();

    const taskToBeAdded: Task = {
      task: newTask,
      completed: false,
      id: id
    };

    setTasks([...tasks, taskToBeAdded]);

    setNewTask("");
  }

  const setTaskCompleted = (task: Task) => {
    const foundTask = tasks.find((tk) => tk.task == task.task)

    if (foundTask) {
      foundTask.completed = !task.completed;
    }

    setTasks([...tasks]);
  }

  const deleteTask = (task: Task) => {
    const filteredArray = tasks.filter((tsk) => tsk.task !== task.task);

    setTasks([...filteredArray]);
  }

  return (
    <div className="bg">
      <header>
        <img src={Logo} alt="rocket and todo written" />
      </header>
      <main>
        <div className="input-container">
          <input
            type="text"
            name="task"
            id="task"
            value={newTask}
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="create-task"
          >
            Criar
            <img src={plus} alt="plus symbol" />
          </button>
        </div>
        <div className="tasks-container">
          <div className="results-container">
            <p className="tasks-criadas">Tarefas criadas <span className="number-of-tasks">{tasks.length}</span></p>

            <p className="concluidas">Concluídas <span className="number-of-tasks">
              {tasks.length === 0 ? (
                "0"
              ) : (
                `${concluedTasks.length} de ${tasks.length}`
              )}
            </span></p>
          </div>

          {tasks && tasks.length ? (
            <div className="actual-tasks">
              {tasks.map((task) => (
                <div>
                  <label className="task" htmlFor="completed" key={task.id}>
                    <input
                      type="checkbox"
                      name="taskNumberX"
                      id="completed"
                      checked={task.completed}
                      onChange={(e) => setTaskCompleted(task)}
                    />
                    <p className={`
                      ${task.completed ? "completed" : ""}
                    `}>
                      {task.task}
                    </p>
                    <button onClick={(e) => deleteTask(task)}>
                      <img src={trash} alt="trash can" />
                    </button>
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-tasks">
              <img src={clipboard} alt="Clipboard draw" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus intes a fazer</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
