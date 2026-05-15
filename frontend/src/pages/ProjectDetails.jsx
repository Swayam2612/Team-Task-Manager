// frontend/src/pages/ProjectDetails.jsx

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function ProjectDetails(){

  const {id} =
  useParams();

  const [project,setProject] =
  useState(null);

  const [tasks,setTasks] =
  useState([]);

  const [teams,setTeams] =
  useState([]);

  useEffect(()=>{

    fetchProjectData();

  },[]);

  /* =========================
     FETCH PROJECT DATA
  ========================= */

  const fetchProjectData = async()=>{

    try{

      /* PROJECT */

      const res =
      await api.get(
        `/projects/${id}`
      );

      setProject(
        res.data
      );

      /* TASKS */

      const tasksRes =
      await api.get("/tasks");

      const filteredTasks =
      tasksRes.data.filter(task=>

        String(task.project_id)
        ===
        String(id)

      );

      setTasks(
        filteredTasks
      );

      /* TEAMS */

      const teamsRes =
      await api.get("/teams");

      const filteredTeams =
      teamsRes.data.filter(team=>

        String(team.project_id)
        ===
        String(id)

      );

      setTeams(
        filteredTeams
      );

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
  (Array.isArray(tasks) ? tasks : []).filter(task=>

    task.status === "Completed"

  ).length;

  const progressPercentage =

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

        {/* HEADER */}

        <div className="page-header">

          <h1>
            {project.title}
          </h1>

          <p>
            Detailed workspace overview for this project.
          </p>

        </div>

        {/* PROJECT OVERVIEW */}

        <div className="dashboard-card">

          <h2>
            Project Overview
          </h2>

          <p
            style={{
              marginTop:"18px",
              lineHeight:"1.7"
            }}
          >

            {project.description || "No description"}

          </p>

          <div
            className="task-meta"
            style={{
              marginTop:"22px"
            }}
          >

            <span>

              Deadline:
              {" "}
              {project.deadline || "None"}

            </span>

            <span>

              Tasks:
              {" "}
              {tasks.length}

            </span>

            <span>

              Teams:
              {" "}
              {teams.length}

            </span>

          </div>

        </div>

        {/* PROGRESS */}

        <div
          className="dashboard-card"
          style={{
            marginTop:"24px"
          }}
        >

          <div className="card-header">

            <h2>
              Project Progress
            </h2>

            <strong>
              {progressPercentage}%
            </strong>

          </div>

          <div
            style={{

              width:"100%",

              height:"14px",

              borderRadius:"999px",

              background:"#e2e8f0",

              overflow:"hidden",

              marginTop:"18px"

            }}
          >

            <div
              style={{

                width:`${progressPercentage}%`,

                height:"100%",

                background:
                "linear-gradient(90deg,#2563eb,#7c3aed)",

                borderRadius:"999px"

              }}
            />

          </div>

        </div>

        {/* GRID */}

        <div
          className="dashboard-grid"
          style={{
            marginTop:"24px"
          }}
        >

          {/* LINKED TASKS */}

          <div className="dashboard-card">

            <div className="card-header">

              <h2>
                Linked Tasks
              </h2>

            </div>

            {tasks.length === 0 ? (

              <div className="empty-state">

                ✨ No tasks linked.

              </div>

            ) : (

              (Array.isArray(tasks) ? tasks : []).map(task=>(

                <Link
                  to={`/tasks/${task.id}`}
                  key={task.id}
                >

                  <div className="dashboard-item">

                    <h3>
                      {task.title}
                    </h3>

                    <p>

                      {task.priority}

                      {" • "}

                      {task.status}

                    </p>

                  </div>

                </Link>

              ))

            )}

          </div>

          {/* LINKED TEAMS */}

          <div className="dashboard-card">

            <div className="card-header">

              <h2>
                Linked Teams
              </h2>

            </div>

            {teams.length === 0 ? (

              <div className="empty-state">

                ✨ No teams linked.

              </div>

            ) : (

              (Array.isArray(teams) ? teams : []).map(team=>(

                <Link
                  to={`/teams/${team.id}`}
                  key={team.id}
                >

                  <div className="dashboard-item">

                    <h3>
                      {team.name}
                    </h3>

                    <p>
                      {team.description || "No description"}
                    </p>

                  </div>

                </Link>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  )

}