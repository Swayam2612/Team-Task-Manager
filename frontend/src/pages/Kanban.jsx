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

  /* =========================
     FETCH TASKS
  ========================= */

  const fetchTasks = async()=>{

    try{

      const user = JSON.parse(

        localStorage.getItem(
          "user"
        ) || "{}"

      );

      if(!user?.id){

        setTasks([]);

        return;

      }

      const res =
      await api.get(

        `/tasks?user_id=${user.id}`

      );

      setTasks(

        Array.isArray(res.data)
        ? res.data
        : []

      );

    }catch(err){

      console.log(err);

      setTasks([]);

    }

  };

  /* =========================
     UPDATE TASK STATUS
  ========================= */

  const updateStatus = async(
    task,
    status
  )=>{

    try{

      const user = JSON.parse(

        localStorage.getItem(
          "user"
        ) || "{}"

      );

      await api.put(
        `/tasks/${task.id}`,
        {

          user_id:user.id,

          title:
          task.title || "",

          description:
          task.description || "",

          priority:
          task.priority || "Medium",

          status,

          deadline:
          task.deadline || "",

          project_id:
          task.project_id || null,

          team_id:
          task.team_id || null,

          assigned_to:
          task.assigned_to || "",

          comments:

            Array.isArray(task.comments)
            ? task.comments
            : [],

          attachments:

            Array.isArray(task.attachments)
            ? task.attachments
            : []

        }
      );

      fetchTasks();

    }catch(err){

      console.log(err);

    }

  };

  /* =========================
     FILTER TASKS
  ========================= */

  const getTasks = (status)=>{

    return (
      Array.isArray(tasks)
      ? tasks
      : []
    ).filter(
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

        {/* HEADER */}

        <div className="page-header">

          <h1>
            Kanban Board
          </h1>

          <p>
            Visualize and manage workflow progress.
          </p>

        </div>

        {/* BOARD */}

        <div className="kanban-board">

          {

            (Array.isArray(statuses)
              ? statuses
              : []
            ).map((status)=>(

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

                  {

                    (Array.isArray(getTasks(status))
                      ? getTasks(status)
                      : []
                    ).map((task)=>(

                      <div
                        className="kanban-card"
                        key={task.id}
                      >

                        {/* TOP */}

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

                        {/* DESCRIPTION */}

                        <p>
                          {task.description || "No description"}
                        </p>

                        {/* META */}

                        <div className="kanban-meta">

                          <div>

                            <strong>
                              Project:
                            </strong>

                            {" "}

                            {
                              task.project_title
                              || "None"
                            }

                          </div>

                          <div>

                            <strong>
                              Team:
                            </strong>

                            {" "}

                            {
                              task.team_name
                              || "None"
                            }

                          </div>

                          <div>

                            <strong>
                              Assigned:
                            </strong>

                            {" "}

                            {
                              task.assigned_to
                              || "None"
                            }

                          </div>

                          <div>

                            <strong>
                              Deadline:
                            </strong>

                            {" "}

                            {
                              task.deadline
                              || "None"
                            }

                          </div>

                        </div>

                        {/* ACTIONS */}

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

                    ))

                  }

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}