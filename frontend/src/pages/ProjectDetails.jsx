import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function ProjectDetails(){

  const {id} = useParams();

  const [project,setProject] =
  useState(null);

  const [tasks,setTasks] =
  useState([]);

  const [teams,setTeams] =
  useState([]);

  useEffect(()=>{

    fetchProject();
    fetchTasks();
    fetchTeams();

  },[]);

  const fetchProject = async()=>{

    try{

      const res =
      await api.get("/projects");

      const foundProject =
      res.data.find(
        item =>
        item.id == id
      );

      setProject(foundProject);

    }catch(err){

      console.log(err);

    }

  };

  const fetchTasks = async()=>{

    try{

      const res =
      await api.get("/tasks");

      const filtered =
      res.data.filter(
        task =>
        task.project_id == id
      );

      setTasks(filtered);

    }catch(err){

      console.log(err);

    }

  };

  const fetchTeams = async()=>{

    try{

      const res =
      await api.get("/teams");

      const filtered =
      res.data.filter(
        team =>
        team.project_id == id
      );

      setTeams(filtered);

    }catch(err){

      console.log(err);

    }

  };

  if(!project){

    return(

      <div>

        <Navbar/>

        <div className="page">

          Loading...

        </div>

      </div>

    )

  }

  const completedTasks =
  tasks.filter(
    task =>
    task.status === "Completed"
  ).length;

  const progress =
  tasks.length === 0
  ? 0
  : Math.round(
      (
        completedTasks
        /
        tasks.length
      ) * 100
    );

  return(

    <div>

      <Navbar/>

      <div className="page">

        <div className="project-detail-header">

          <div>

            <h1>
              {project.title}
            </h1>

            <p>
              {project.description}
            </p>

          </div>

          <div className="project-progress-large">

            {progress}%

          </div>

        </div>

        <div className="stats">

          <div className="stat-card">

            <h2>
              {tasks.length}
            </h2>

            <p>
              Total Tasks
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {completedTasks}
            </h2>

            <p>
              Completed Tasks
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {teams.length}
            </h2>

            <p>
              Teams
            </p>

          </div>

        </div>

        <div className="project-sections">

          <div className="project-section">

            <h2>
              Teams
            </h2>

            <div className="teams-grid">

              {teams.length === 0 ? (

                <div className="empty-state">

                  No teams assigned.

                </div>

              ) : (

                teams.map(team=>(

                  <div
                    className="team-card"
                    key={team.id}
                  >

                    <div className="team-avatar">

                      {team.name
                        ?.charAt(0)
                        ?.toUpperCase()
                      }

                    </div>

                    <h3>
                      {team.name}
                    </h3>

                  </div>

                ))

              )}

            </div>

          </div>

          <div className="project-section">

            <h2>
              Tasks
            </h2>

            <div className="task-list">

              {tasks.length === 0 ? (

                <div className="empty-state">

                  No tasks for this project.

                </div>

              ) : (

                tasks.map(task=>(

                  <div
                    className="task-card"
                    key={task.id}
                  >

                    <div className="task-card-top">

                      <div>

                        <h3>
                          {task.title}
                        </h3>

                        <p>
                          {task.description}
                        </p>

                      </div>

                      <div
                        className={`priority-badge ${task.priority}`}
                      >
                        {task.priority}
                      </div>

                    </div>

                    <div className="task-meta">

                      <div>

                        <strong>
                          Assigned:
                        </strong>

                        {" "}

                        {task.assigned_to || "None"}

                      </div>

                      <div>

                        <strong>
                          Due:
                        </strong>

                        {" "}

                        {task.due_date || "None"}

                      </div>

                    </div>

                    <div className="task-footer">

                      <div
                        className={`status-pill ${task.status}`}
                      >
                        {task.status}
                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}