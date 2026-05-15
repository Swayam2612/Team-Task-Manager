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

export default function TeamDetails(){

  const {id} = useParams();

  const [team,setTeam] =
  useState(null);

  const [tasks,setTasks] =
  useState([]);

  useEffect(()=>{

    fetchTeam();
    fetchTasks();

  },[]);

  const fetchTeam = async()=>{

    try{

      const res =
      await api.get("/teams");

      const foundTeam =
      res.data.find(
        item =>
        item.id == id
      );

      setTeam(foundTeam);

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
        task.team_id == id
      );

      setTasks(filtered);

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
              {team.name}
            </h1>

            <p>

              Linked Project:
              {" "}

              {team.project_title || "None"}

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
              Team Tasks
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {completedTasks}
            </h2>

            <p>
              Completed
            </p>

          </div>

        </div>

        <div className="project-section">

          <h2>
            Team Tasks
          </h2>

          <div className="task-list">

            {tasks.length === 0 ? (

              <div className="empty-state">

                No tasks assigned to this team.

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

  )

}