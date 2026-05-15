import {
  useEffect,
  useState
} from "react";

import {
  useLocation
} from "react-router-dom";

import {

  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip

} from "recharts";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function Dashboard(){
  const location =
useLocation();

  const [projects,setProjects] =
  useState([]);

  const [tasks,setTasks] =
  useState([]);

  const [teams,setTeams] =
  useState([]);

  useEffect(()=>{

  fetchData();

},[location]);

  const fetchData = async()=>{

  try{

    const user = JSON.parse(

      localStorage.getItem(
        "user"
      )

    );

    if(!user){

      return;

    }

    const projectRes =
    await api.get(

      `/projects?user_id=${user.id}`

    );

    const taskRes =
    await api.get(

      `/tasks?user_id=${user.id}`

    );

    const teamRes =
    await api.get(

      `/teams?user_id=${user.id}`

    );

    setProjects(
      projectRes.data
    );

    setTasks(
      taskRes.data
    );

    setTeams(
      teamRes.data
    );

  }catch(err){

    console.log(err);

  }

};
  const completed =
  (Array.isArray(tasks) ? tasks : []).filter(
    task =>
    task.status === "Completed"
  ).length;

  const pending =
  (Array.isArray(tasks) ? tasks : []).filter(
    task =>
    task.status === "Pending"
  ).length;

  const progress =
  (Array.isArray(tasks) ? tasks : []).filter(
    task =>
    task.status === "In Progress"
  ).length;

  const chartData = [

    {
      name:"Completed",
      value:completed
    },

    {
      name:"Pending",
      value:pending
    },

    {
      name:"In Progress",
      value:progress
    }

  ];

  const COLORS = [

    "#22c55e",

    "#ef4444",

    "#3b82f6"

  ];

  const productivityData = [

    {
      name:"Projects",
      value:projects.length
    },

    {
      name:"Teams",
      value:teams.length
    },

    {
      name:"Tasks",
      value:tasks.length
    }

  ];

  return(

    <div>

      <Navbar/>

      <div className="page">

        <div className="page-header">

          <h1>
            Analytics Dashboard
          </h1>

          <p>
            Monitor workspace productivity and performance.
          </p>

        </div>

        <div className="stats">

          <div className="stat-card">

            <h2>
              {projects.length}
            </h2>

            <p>
              Total Projects
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {teams.length}
            </h2>

            <p>
              Active Teams
            </p>

          </div>

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
              {completed}
            </h2>

            <p>
              Completed Tasks
            </p>

          </div>

        </div>

        <div className="analytics-grid">

          <div className="analytics-card">

            <h2>
              Task Distribution
            </h2>

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={120}
                  >

                    {chartData.map(
                      (entry,index)=>(

                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip/>

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="analytics-card">

            <h2>
              Workspace Overview
            </h2>

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <BarChart
                  data={productivityData}
                >

                  <XAxis dataKey="name"/>

                  <YAxis/>

                  <Tooltip/>

                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                    radius={[8,8,0,0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <div className="insights-grid">

          <div className="insight-card">

            <h3>
              Productivity
            </h3>

            <p>

              {
                tasks.length === 0

                ? 0

                : Math.round(
                    (
                      completed
                      /
                      tasks.length
                    ) * 100
                  )
              }%

            </p>

          </div>

          <div className="insight-card">

            <h3>
              Pending Work
            </h3>

            <p>
              {pending}
            </p>

          </div>

          <div className="insight-card">

            <h3>
              In Progress
            </h3>

            <p>
              {progress}
            </p>

          </div>

        </div>

      </div>

    </div>

  )

}