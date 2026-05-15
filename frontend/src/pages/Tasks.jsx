// frontend/src/pages/Tasks.jsx

import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function Tasks(){

  const [tasks,setTasks] =
  useState([]);

  const [projects,setProjects] =
  useState([]);

  const [formData,setFormData] =
  useState({

    title:"",
    description:"",
    priority:"Medium",
    status:"Pending",
    deadline:"",
    project_id:""

  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(()=>{

    fetchTasks();

    fetchProjects();

  },[]);

  const fetchTasks = async()=>{

    try{

      const res =
      await api.get("/tasks");

      const formatted =
      res.data.map(task=>({

        ...task,

        comments:
        task.comments
        ? JSON.parse(task.comments)
        : [],

        attachments:
        task.attachments
        ? JSON.parse(task.attachments)
        : []

      }));

      setTasks(formatted);

    }catch(err){

      console.log(err);

    }

  };

  const fetchProjects = async()=>{

    try{

      const res =
      await api.get(

        `/projects?user_id=${user.id}`

      );

      setProjects(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const createTask = async()=>{

    try{

      await api.post(
        "/tasks",
        {

          ...formData,

          user_id:user.id

        }
      );

      setFormData({

        title:"",
        description:"",
        priority:"Medium",
        status:"Pending",
        deadline:"",
        project_id:""

      });

      fetchTasks();

    }catch(err){

      console.log(err);

      alert(
        "Failed to create task"
      );

    }

  };

  const deleteTask = async(id)=>{

    try{

      await api.delete(
        `/tasks/${id}`
      );

      fetchTasks();

    }catch(err){

      console.log(err);

    }

  };

  return(

    <div>

      <Navbar/>

      <div className="page">

        <div className="page-header">

          <h1>
            Tasks
          </h1>

          <p>
            Manage all tasks.
          </p>

        </div>

        <div className="task-form-card">

          <h2>
            Create Task
          </h2>

          <div className="task-form">

            <div className="form-group">

              <label>
                Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
              />

            </div>

            <div className="form-group">

              <label>
                Description
              </label>

              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
              />

            </div>

            <div className="form-group">

              <label>
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >

                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>
                  Pending
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Completed
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                Project
              </label>

              <select
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
              >

                <option value="">
                  Select Project
                </option>

                {projects.map(project=>(

                  <option
                    key={project.id}
                    value={project.id}
                  >

                    {project.title}

                  </option>

                ))}

              </select>

            </div>

          </div>

          <button
            className="primary-btn"
            onClick={createTask}
          >
            Create Task
          </button>

        </div>

        <div className="tasks-grid">

          {tasks.map(task=>(

            <div
              className="task-card"
              key={task.id}
            >

              <div className="task-top">

                <h2>
                  {task.title}
                </h2>

                <button
                  className="delete-btn"
                  onClick={()=>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </button>

              </div>

              <p>
                {task.description}
              </p>

              <div className="task-meta">

                <span>
                  {task.priority}
                </span>

                <span>
                  {task.status}
                </span>

              </div>

              <div className="task-deadline">

                Deadline:
                {" "}
                {task.deadline || "None"}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}