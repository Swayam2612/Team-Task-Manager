import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function Tasks(){

  const [tasks,setTasks] =
  useState([]);

  const [projects,setProjects] =
  useState([]);

  const [teams,setTeams] =
  useState([]);

  const [formData,setFormData] =
  useState({

    title:"",
    description:"",
    priority:"Medium",
    status:"Pending",
    deadline:"",
    project_id:"",
    team_id:""

  });

  let user = {};

  try{

    user = JSON.parse(

      localStorage.getItem(
        "user"
      ) || "{}"

    );

  }catch(err){

    console.log(err);

  }

  useEffect(()=>{

    if(user?.id){

      fetchTasks();

      fetchProjects();

      fetchTeams();

    }

  },[]);

  /* =========================
     FETCH TASKS
  ========================= */

  const fetchTasks = async()=>{

    try{

      const res =
      await api.get(

        `/tasks?user_id=${user.id}`

      );

      const formatted =
      (Array.isArray(res.data)
        ? res.data
        : []
      ).map(task=>({

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

      setTasks(
        formatted
      );

    }catch(err){

      console.log(err);

      setTasks([]);

    }

  };

  /* =========================
     FETCH PROJECTS
  ========================= */

  const fetchProjects = async()=>{

    try{

      const res =
      await api.get(

        `/projects?user_id=${user.id}`

      );

      setProjects(

        Array.isArray(res.data)
        ? res.data
        : []

      );

    }catch(err){

      console.log(err);

      setProjects([]);

    }

  };

  /* =========================
     FETCH TEAMS
  ========================= */

  const fetchTeams = async()=>{

    try{

      const res =
      await api.get(

        `/teams?user_id=${user.id}`

      );

      setTeams(

        Array.isArray(res.data)
        ? res.data
        : []

      );

    }catch(err){

      console.log(err);

      setTeams([]);

    }

  };

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* =========================
     CREATE TASK
  ========================= */

  const createTask = async()=>{

    try{

      await api.post(
        "/tasks",
        {

          ...formData,

          user_id:user.id,

          comments:[],

          attachments:[]

        }
      );

      setFormData({

        title:"",
        description:"",
        priority:"Medium",
        status:"Pending",
        deadline:"",
        project_id:"",
        team_id:""

      });

      fetchTasks();

    }catch(err){

      console.log(err);

      alert(
        "Failed to create task"
      );

    }

  };

  /* =========================
     DELETE TASK
  ========================= */

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

        {/* HEADER */}

        <div className="page-header">

          <h1>
            Tasks
          </h1>

          <p>
            Manage tasks, assignments, priorities and deadlines.
          </p>

        </div>

        {/* CREATE TASK */}

        <div className="task-form-card">

          <h2>
            Create Task
          </h2>

          <div className="task-form">

            {/* TITLE */}

            <div className="form-group">

              <label>
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
              />

            </div>

            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
              />

            </div>

            {/* PRIORITY */}

            <div className="form-group">

              <label>
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

            </div>

            {/* STATUS */}

            <div className="form-group">

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            {/* DEADLINE */}

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

            {/* PROJECT */}

            <div className="form-group">

              <label>
                Linked Project
              </label>

              <select
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
              >

                <option value="">
                  Select Project
                </option>

                {

                  (Array.isArray(projects)
                    ? projects
                    : []
                  ).map((project)=>(

                    <option
                      key={project.id}
                      value={project.id}
                    >

                      {project.title}

                    </option>

                  ))

                }

              </select>

            </div>

            {/* TEAM */}

            <div className="form-group">

              <label>
                Assign Team
              </label>

              <select
                name="team_id"
                value={formData.team_id}
                onChange={handleChange}
              >

                <option value="">
                  Select Team
                </option>

                {

                  (Array.isArray(teams)
                    ? teams
                    : []
                  ).map((team)=>(

                    <option
                      key={team.id}
                      value={team.id}
                    >

                      {team.name}

                    </option>

                  ))

                }

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

        {/* TASKS GRID */}

        <div className="tasks-grid">

          {

            (Array.isArray(tasks)
              ? tasks
              : []
            ).length === 0 ? (

              <div className="empty-state">

                ✨ No tasks yet.
                Create your first task.

              </div>

            ) : (

              (Array.isArray(tasks)
                ? tasks
                : []
              ).map((task)=>(

                <Link
                  to={`/tasks/${task.id}`}
                  key={task.id}
                >

                  <div className="task-card">

                    <div className="task-top">

                      <h2>
                        {task.title}
                      </h2>

                      <button
                        className="delete-btn"
                        onClick={(e)=>{

                          e.preventDefault();

                          deleteTask(task.id);

                        }}
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

                    <div
                      className="task-meta"
                      style={{
                        marginTop:"10px"
                      }}
                    >

                      {task.project_title && (

                        <span>

                          📁 {task.project_title}

                        </span>

                      )}

                      {task.team_name && (

                        <span>

                          👥 {task.team_name}

                        </span>

                      )}

                    </div>

                    <div
                      className="task-deadline"
                      style={{
                        marginTop:"14px"
                      }}
                    >

                      Deadline:
                      {" "}
                      {task.deadline || "None"}

                    </div>

                  </div>

                </Link>

              ))

            )

          }

        </div>

      </div>

    </div>

  );

}