import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./styles.css";

import Login
from "./pages/Login";

import Signup
from "./pages/Signup";

import Dashboard
from "./pages/Dashboard";

import Projects
from "./pages/Projects";

import ProjectDetails
from "./pages/ProjectDetails";

import Teams
from "./pages/Teams";

import TeamDetails
from "./pages/TeamDetails";

import Tasks
from "./pages/Tasks";

import TaskDetails
from "./pages/TaskDetails";

import Kanban
from "./pages/Kanban";

import Profile
from "./pages/Profile";

import Activity
from "./pages/Activity";

import Settings
from "./pages/Settings";

import CalendarPage
from "./pages/CalendarPage";

import Notifications
from "./pages/Notifications";

export default function App(){

  return(

    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route
          path="/"
          element={<Login/>}
        />

        <Route
          path="/signup"
          element={<Signup/>}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />

        {/* PROJECTS */}

        <Route
          path="/projects"
          element={<Projects/>}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetails/>}
        />

        {/* TEAMS */}

        <Route
          path="/teams"
          element={<Teams/>}
        />

        <Route
          path="/teams/:id"
          element={<TeamDetails/>}
        />

        {/* TASKS */}

        <Route
          path="/tasks"
          element={<Tasks/>}
        />

        <Route
          path="/tasks/:id"
          element={<TaskDetails/>}
        />

        {/* KANBAN */}

        <Route
          path="/kanban"
          element={<Kanban/>}
        />

        {/* CALENDAR */}

        <Route
          path="/calendar"
          element={<CalendarPage/>}
        />

        {/* NOTIFICATIONS */}

        <Route
          path="/notifications"
          element={<Notifications/>}
        />

        {/* ACTIVITY */}

        <Route
          path="/activity"
          element={<Activity/>}
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={<Profile/>}
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={<Settings/>}
        />

      </Routes>

    </BrowserRouter>

  )

}