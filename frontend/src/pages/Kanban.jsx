import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function Kanban(){

  const [tasks,setTasks] =
  useState([]);

  useEffect(()=>{

    fetchTasks();

  },[]);

  const fetchTasks = async()=>{

    try{

      const res =
      await api.get("/tasks");

      setTasks(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const updateStatus = async(
    task,
    status
  )=>{

    try{

      await api.put(
        `/tasks/${task.id}`,
        {

          ...task,

          status

        }
      );

      fetchTasks();

    }catch(err){

      console.log(err);

    }

  };

  const getTasks = (status)=>{

    return (Array.isArray(tasks) ? tasks : []).filter(
      task =>
      task.status === status
    );

  };

  const statuses = [

    "Pending",

    "In Progress",

    "Completed"

  ];

  return(

    <div>

      <Navbar/>

      <div className="page">

        <div className="page-header">

          <h1>
            Kanban Board
          </h1>

          <p>
            Visualize and manage task workflows.
          </p>

        </div>

        <div className="kanban-board">

          {(Array.isArray(statuses) ? statuses : []).map(

            <div
              className="kanban-column"
              key={status}
            >

              <div className="kanban-header">

                <h2>
                  {status}
                </h2>

                <span>

                  {
                    getTasks(status)
                    .length
                  }

                </span>

              </div>

              <div className="kanban-tasks">

                {(Array.isArray(getTasks(status)) ? getTasks(status) : []).map(

                  <div
                    className="kanban-card"
                    key={task.id}
                  >

                    <div className="kanban-card-top">

                      <h3>
                        {task.title}
                      </h3>

                      <div
                        className={`priority-badge ${task.priority}`}
                      >
                        {task.priority}
                      </div>

                    </div>

                    <p>
                      {task.description}
                    </p>

                    <div className="kanban-meta">

                      <div>

                        <strong>
                          Project:
                        </strong>

                        {" "}

                        {task.project_title || "None"}

                      </div>

                      <div>

                        <strong>
                          Team:
                        </strong>

                        {" "}

                        {task.team_name || "None"}

                      </div>

                      <div>

                        <strong>
                          Assigned:
                        </strong>

                        {" "}

                        {task.assigned_to || "None"}

                      </div>

                    </div>

                    <div className="kanban-actions">

                      {status !== "Pending" && (

                        <button
                          className="move-btn"
                          onClick={()=>
                            updateStatus(
                              task,
                              "Pending"
                            )
                          }
                        >
                          Pending
                        </button>

                      )}

                      {status !== "In Progress" && (

                        <button
                          className="move-btn"
                          onClick={()=>
                            updateStatus(
                              task,
                              "In Progress"
                            )
                          }
                        >
                          In Progress
                        </button>

                      )}

                      {status !== "Completed" && (

                        <button
                          className="move-btn"
                          onClick={()=>
                            updateStatus(
                              task,
                              "Completed"
                            )
                          }
                        >
                          Completed
                        </button>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}