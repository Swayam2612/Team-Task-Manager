// frontend/src/pages/TeamDetails.jsx

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

export default function TeamDetails(){

  const {id} =
  useParams();

  const [team,setTeam] =
  useState(null);

  const [project,setProject] =
  useState(null);

  const [tasks,setTasks] =
  useState([]);

  useEffect(()=>{

    fetchTeamData();

  },[]);

  /* =========================
     FETCH TEAM DATA
  ========================= */

  const fetchTeamData = async()=>{

    try{

      /* TEAM */

      const res =
      await api.get(
        `/teams/${id}`
      );

      setTeam(
        res.data
      );

      /* LINKED PROJECT */

      if(res.data.project_id){

        const projectRes =
        await api.get(
          `/projects/${res.data.project_id}`
        );

        setProject(
          projectRes.data
        );

        /* FETCH RELATED TASKS */

        const tasksRes =
        await api.get("/tasks");

        const filteredTasks =
        tasksRes.data.filter(task=>

          String(task.project_id)
          ===
          String(res.data.project_id)

        );

        setTasks(
          filteredTasks
        );

      }

    }catch(err){

      console.log(err);

    }

  };

  if(!team){

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
  tasks.filter(task=>

    task.status === "Completed"

  ).length;

  const productivity =

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
            {team.name}
          </h1>

          <p>
            Team collaboration workspace and productivity overview.
          </p>

        </div>

        {/* TEAM OVERVIEW */}

        <div className="dashboard-card">

          <h2>
            Team Overview
          </h2>

          <p
            style={{
              marginTop:"18px",
              lineHeight:"1.7"
            }}
          >

            {team.description || "No description"}

          </p>

          <div
            className="task-meta"
            style={{
              marginTop:"22px"
            }}
          >

            <span>

              Tasks:
              {" "}
              {tasks.length}

            </span>

            <span>

              Completed:
              {" "}
              {completedTasks}

            </span>

            <span>

              Productivity:
              {" "}
              {productivity}%

            </span>

          </div>

        </div>

        {/* LINKED PROJECT */}

        <div
          className="dashboard-card"
          style={{
            marginTop:"24px"
          }}
        >

          <div className="card-header">

            <h2>
              Linked Project
            </h2>

          </div>

          {!project ? (

            <div className="empty-state">

              ✨ No linked project.

            </div>

          ) : (

            <Link
              to={`/projects/${project.id}`}
            >

              <div className="dashboard-item">

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

              </div>

            </Link>

          )}

        </div>

        {/* TEAM TASKS */}

        <div
          className="dashboard-card"
          style={{
            marginTop:"24px"
          }}
        >

          <div className="card-header">

            <h2>
              Team Tasks
            </h2>

          </div>

          {tasks.length === 0 ? (

            <div className="empty-state">

              ✨ No tasks linked.

            </div>

          ) : (

            tasks.map(task=>(

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

        {/* TEAM PRODUCTIVITY */}

        <div
          className="dashboard-card"
          style={{
            marginTop:"24px"
          }}
        >

          <div className="card-header">

            <h2>
              Productivity Insights
            </h2>

          </div>

          <div className="insights-grid">

            <div className="insight-card">

              <h3>
                Total Tasks
              </h3>

              <p>
                {tasks.length}
              </p>

            </div>

            <div className="insight-card">

              <h3>
                Completed
              </h3>

              <p>
                {completedTasks}
              </p>

            </div>

            <div className="insight-card">

              <h3>
                Productivity
              </h3>

              <p>
                {productivity}%
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}