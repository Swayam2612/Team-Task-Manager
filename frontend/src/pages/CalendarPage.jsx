import {
  useEffect,
  useState
} from "react";

import Calendar
from "react-calendar";

import "react-calendar/dist/Calendar.css";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function CalendarPage(){

  const [tasks,setTasks] =
  useState([]);

  const [selectedDate,setSelectedDate] =
  useState(new Date());

  useEffect(()=>{

    fetchTasks();

  },[]);

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

  const selectedTasks =
  (Array.isArray(tasks)
    ? tasks
    : []
  ).filter(task=>{

    if(!task.deadline)
      return false;

    const taskDate =
    String(task.deadline)
    .split("T")[0];

    const selected =
    selectedDate
      .toLocaleDateString("en-CA");

    return(
      taskDate === selected
    );

  });

  const overdueTasks =
  (Array.isArray(tasks)
    ? tasks
    : []
  ).filter(task=>{

    if(!task.deadline)
      return false;

    return(

      new Date(task.deadline)
      < new Date()

      &&

      task.status !== "Completed"

    );

  });

  return(

    <div>

      <Navbar/>

      <div className="page">

        <div className="page-header">

          <h1>
            Calendar & Deadlines
          </h1>

          <p>
            Track schedules and overdue work.
          </p>

        </div>

        <div className="calendar-layout">

          <div className="calendar-card">

            <Calendar

              onChange={setSelectedDate}

              value={selectedDate}

              tileContent={({date})=>{

                const formattedDate =
                date.toLocaleDateString("en-CA");

                const hasTask =
                (Array.isArray(tasks)
                  ? tasks
                  : []
                ).some(task=>{

                  if(!task.deadline)
                    return false;

                  return(

                    String(task.deadline)
                    .split("T")[0]

                    ===

                    formattedDate

                  );

                });

                if(!hasTask)
                  return null;

                return(

                  <div
                    style={{

                      width:"8px",

                      height:"8px",

                      borderRadius:"50%",

                      background:"#2563eb",

                      margin:"4px auto 0"

                    }}
                  />

                );

              }}

            />

          </div>

          <div className="calendar-side">

            <div className="calendar-info-card">

              <h2>
                Tasks on Selected Date
              </h2>

              {selectedTasks.length === 0 ? (

                <div className="empty-state">

                  No tasks scheduled.

                </div>

              ) : (

                <div className="deadline-list">

                  {

                    (Array.isArray(selectedTasks)
                      ? selectedTasks
                      : []
                    ).map((task)=>(

                      <div
                        className="deadline-card"
                        key={task.id}
                      >

                        <h3>
                          {task.title}
                        </h3>

                        <p>
                          {task.description}
                        </p>

                        <p>

                          Deadline:
                          {" "}
                          {task.deadline}

                        </p>

                      </div>

                    ))

                  }

                </div>

              )}

            </div>

            <div className="calendar-info-card">

              <h2>
                Overdue Tasks
              </h2>

              {overdueTasks.length === 0 ? (

                <div className="empty-state">

                  No overdue tasks.

                </div>

              ) : (

                <div className="deadline-list">

                  {

                    (Array.isArray(overdueTasks)
                      ? overdueTasks
                      : []
                    ).map((task)=>(

                      <div
                        className="deadline-card overdue"
                        key={task.id}
                      >

                        <h3>
                          {task.title}
                        </h3>

                        <p>
                          {task.description}
                        </p>

                        <p>

                          Deadline:
                          {" "}
                          {task.deadline}

                        </p>

                      </div>

                    ))

                  }

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}