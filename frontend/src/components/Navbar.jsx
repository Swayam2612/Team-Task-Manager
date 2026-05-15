import {
  Link,
  useNavigate
} from "react-router-dom";

export default function Navbar(){

  const navigate =
  useNavigate();

  /* SAFE USER PARSE */

  let user = null;

  try{

    user = JSON.parse(
      localStorage.getItem("user")
    );

  }catch(err){

    console.log(err);

    user = null;

  }

  /* LOGOUT */

  const logout = ()=>{

    localStorage.removeItem(
      "user"
    );

    navigate("/");

  };

  return(

    <div className="navbar">

      <div
        className="logo"
        onClick={()=>
          navigate("/dashboard")
        }
      >

        Team Task Manager

      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/teams">
          Teams
        </Link>

        <Link to="/tasks">
          Tasks
        </Link>

        <Link to="/calendar">
          Calendar
        </Link>

        <Link to="/notifications">
          Notifications
        </Link>

        {user?.role === "Admin" && (

          <Link to="/kanban">
            Kanban
          </Link>

        )}

        <Link to="/activity">
          Activity
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/settings">
          Settings
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  );

}