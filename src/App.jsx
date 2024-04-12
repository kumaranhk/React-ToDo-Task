import { useState } from "react";
import "./App.css";
import Card from "./component/card.jsx";

function App() {
  const [formData, setFormData] = useState({});
  const [tasks, setTask] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [state, setState] = useState(false);


  const handleState = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
      console.log(task);
        return {
          ...task,
          state: !task.state,
        };
      }
      return task;
    });
    setTask([...updatedTasks]);
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.id ? updateTask() : createTask();
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = () => {
    const tempTask = { ...formData };
    tempTask.id = Date.now();
    tempTask.state = state;
    console.log(state, tempTask);
    setTask([tempTask, ...tasks]);
  };

  const updateTask = () => {
    const index = tasks.findIndex((task) => task.id === formData.id);
    const tempTask = [...tasks];
    tempTask[index] = formData;
    setTask(tempTask);
  };

  const editTask = (taskId) => {
    const taskData = tasks.find((task) => task.id === taskId);
    console.log(taskData);
    setFormData(taskData);
  };

  const removeTask = (tasksId) => {
    setTask(tasks.filter(({ id }) => tasksId != id));
  };


  const getStatus = (status) => {
    setCurrentStatus(status)
  };

  return (
    <>
      <div className="h3 text-success">My TODO</div>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <StatusFilterBar getStatus={getStatus} />
      <div className="task-data">
        {currentStatus === ''
          ? tasks.map((val) => (
              <Card
                {...val}
                key={val.id}
                editTask={editTask}
                removeTask={removeTask}
                handleState={handleState}
              />
            ))
          : currentStatus === 'false'
          ? tasks
              .filter((val) => !val.state)
              .map((val) => (
                <Card
                  {...val}
                  key={val.id}
                  editTask={editTask}
                  removeTask={removeTask}
                  handleState={handleState}
                />
              ))
          : tasks
              .filter((val) => val.state)
              .map((val) => (
                <Card
                  {...val}
                  key={val.id}
                  editTask={editTask}
                  removeTask={removeTask}
                  handleState={handleState}
                />
              ))}
      </div>
    </>
  );
}

const Form = ({ handleChange, handleSubmit, formData }) => {
  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name || ""}
                placeholder="TODO Name"
                aria-label="task-name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="description"
                value={formData.description || ""}
                placeholder="TODO Description"
                aria-label="task-description"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const StatusFilterBar = ({ getStatus }) => {
  const handleChange = (e) => {
    getStatus(e.target.value);
  };
  return (
    <>
      <hr />
      <div className="container">
        <div>My Todos</div>
        <div className="status-filter">
          <label htmlFor="status">Status</label>
          <select
            className="form-select form-select-sm status-dropDown"
            id="status"
            onChange={handleChange}
          >
            <option value={""}>All</option>
            <option value={false}>Not Completed</option>
            <option value={true}>Completed</option>
          </select>
        </div>
      </div>
      <hr className="hr"/>
    </>
  );
};

export default App;
