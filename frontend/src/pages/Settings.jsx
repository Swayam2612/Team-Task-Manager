import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

export default function Settings(){

  const [darkMode,setDarkMode] =
  useState(false);

  const [workspaceName,setWorkspaceName] =
  useState("");

  const [taskAlerts,setTaskAlerts] =
  useState(true);

  const [deadlineAlerts,setDeadlineAlerts] =
  useState(true);

  const [activityAlerts,setActivityAlerts] =
  useState(true);

  useEffect(()=>{

    const savedDark =
    localStorage.getItem(
      "darkMode"
    );

    if(savedDark === "true"){

      document.body.classList.add(
        "dark-mode"
      );

      setDarkMode(true);

    }

    const savedWorkspace =
    localStorage.getItem(
      "workspaceName"
    );

    if(savedWorkspace){

      setWorkspaceName(
        savedWorkspace
      );

    }

    const savedTaskAlerts =
    localStorage.getItem(
      "taskAlerts"
    );

    const savedDeadlineAlerts =
    localStorage.getItem(
      "deadlineAlerts"
    );

    const savedActivityAlerts =
    localStorage.getItem(
      "activityAlerts"
    );

    if(savedTaskAlerts !== null){

      setTaskAlerts(
        savedTaskAlerts === "true"
      );

    }

    if(savedDeadlineAlerts !== null){

      setDeadlineAlerts(
        savedDeadlineAlerts === "true"
      );

    }

    if(savedActivityAlerts !== null){

      setActivityAlerts(
        savedActivityAlerts === "true"
      );

    }

  },[]);

  const toggleDarkMode = ()=>{

    const newValue =
    !darkMode;

    setDarkMode(newValue);

    localStorage.setItem(
      "darkMode",
      newValue
    );

    if(newValue){

      document.body.classList.add(
        "dark-mode"
      );

    }else{

      document.body.classList.remove(
        "dark-mode"
      );

    }

  };

  const saveWorkspace = ()=>{

    localStorage.setItem(
      "workspaceName",
      workspaceName
    );

    alert(
      "Workspace settings saved"
    );

  };

  const saveNotifications = ()=>{

    localStorage.setItem(
      "taskAlerts",
      taskAlerts
    );

    localStorage.setItem(
      "deadlineAlerts",
      deadlineAlerts
    );

    localStorage.setItem(
      "activityAlerts",
      activityAlerts
    );

    alert(
      "Notification preferences saved"
    );

  };

  return(

    <div>

      <Navbar/>

      <div className="page">

        <div className="page-header">

          <h1>
            Settings
          </h1>

          <p>
            Customize your workspace.
          </p>

        </div>

        <div className="settings-grid">

          <div className="settings-card">

            <h2>
              Appearance
            </h2>

            <p>
              Toggle between dark and light themes.
            </p>

            <button
              className="primary-btn"
              onClick={toggleDarkMode}
            >

              {darkMode
                ? "Disable Dark Mode"
                : "Enable Dark Mode"}

            </button>

          </div>

          <div className="settings-card">

            <h2>
              Workspace
            </h2>

            <p>
              Manage workspace preferences and layout.
            </p>

            <div className="form-group">

              <label>
                Workspace Name
              </label>

              <input
                value={workspaceName}
                onChange={(e)=>
                  setWorkspaceName(
                    e.target.value
                  )
                }
                placeholder="Enter workspace name"
              />

            </div>

            <button
              className="primary-btn"
              onClick={saveWorkspace}
            >
              Save Workspace
            </button>

          </div>

          <div className="settings-card">

            <h2>
              Notifications
            </h2>

            <p>
              Configure task and activity alerts.
            </p>

            <div className="settings-option">

              <label>
                Task Alerts
              </label>

              <input
                type="checkbox"
                checked={taskAlerts}
                onChange={()=>
                  setTaskAlerts(
                    !taskAlerts
                  )
                }
              />

            </div>

            <div className="settings-option">

              <label>
                Deadline Reminders
              </label>

              <input
                type="checkbox"
                checked={deadlineAlerts}
                onChange={()=>
                  setDeadlineAlerts(
                    !deadlineAlerts
                  )
                }
              />

            </div>

            <div className="settings-option">

              <label>
                Activity Notifications
              </label>

              <input
                type="checkbox"
                checked={activityAlerts}
                onChange={()=>
                  setActivityAlerts(
                    !activityAlerts
                  )
                }
              />

            </div>

            <button
              className="primary-btn"
              onClick={saveNotifications}
            >
              Save Notifications
            </button>

          </div>

        </div>

      </div>

    </div>

  )

}