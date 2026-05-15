// frontend/src/pages/Teams.jsx

import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function Teams(){

  const [teams,setTeams] =
  useState([]);

  const [projects,setProjects] =
  useState([]);

  const [formData,setFormData] =
  useState({

    name:"",
    description:"",
    project_id:""

  });

  const user = JSON.parse(

    localStorage.getItem(
      "user"
    )

  );

  useEffect(()=>{

    fetchTeams();

    fetchProjects();

  },[]);

  /* =========================
     FETCH TEAMS
  ========================= */

  const fetchTeams = async()=>{

    try{

      const res =
      await api.get(

        `/teams?user_id=${user.id}`

      );

      setTeams(
        res.data
      );

    }catch(err){

      console.log(err);

    }

  };

  /* =========================
     FETCH PROJECTS
  ========================= */

  const fetchProjects = async()=>{

    try{

      const res =
      await api.get(

        `/projects?user_id=${user.id}`

      );

      setProjects(
        res.data
      );

    }catch(err){

      console.log(err);

    }

  };

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* =========================
     CREATE TEAM
  ========================= */

  const createTeam = async()=>{

    try{

      await api.post(
        "/teams",
        {

          ...formData,

          user_id:user.id

        }
      );

      setFormData({

        name:"",
        description:"",
        project_id:""

      });

      fetchTeams();

    }catch(err){

      console.log(err);

      alert(
        "Failed to create team"
      );

    }

  };

  /* =========================
     DELETE TEAM
  ========================= */

  const deleteTeam = async(id)=>{

    try{

      await api.delete(
        `/teams/${id}`
      );

      fetchTeams();

    }catch(err){

      console.log(err);

    }

  };

  return(

    <div>

      <Navbar/>

      <div className="page">

        <div className="page-header">

          <h1>
            Teams
          </h1>

          <p>
            Create and manage collaborative teams.
          </p>

        </div>

        {/* CREATE TEAM */}

        <div className="task-form-card">

          <h2>
            Create Team
          </h2>

          <div className="task-form">

            <div className="form-group">

              <label>
                Team Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Frontend Team"
              />

            </div>

            <div className="form-group">

              <label>
                Description
              </label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Team description"
              />

            </div>

            <div className="form-group">

              <label>
                Select Project
              </label>

              <select
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
              >

                <option value="">
                  Choose Project
                </option>

                {(Array.isArray(projects) ? projects : [])map(project=>(

                  <option
                    key={project.id}
                    value={project.id}
                  >

                    {project.title}

                  </option>

                ))}

              </select>

            </div>

          </div>

          <button
            className="primary-btn"
            onClick={createTeam}
          >
            Create Team
          </button>

        </div>

        {/* TEAMS GRID */}

        <div className="teams-grid">

          {teams.length === 0 ? (

            <div className="empty-state">

              ✨ No teams yet.
              Create your first team.

            </div>

          ) : (

            (Array.isArray(teams) ? teams : [])map(team=>(

              <Link
                to={`/teams/${team.id}`}
                key={team.id}
              >

                <div className="team-card">

                  <div className="task-top">

                    <h2>
                      {team.name}
                    </h2>

                    <button
                      className="delete-btn"
                      onClick={(e)=>{

                        e.preventDefault();

                        deleteTeam(team.id);

                      }}
                    >
                      Delete
                    </button>

                  </div>

                  <p>
                    {team.description || "No description"}
                  </p>

                  <div
                    className="task-meta"
                    style={{
                      marginTop:"16px"
                    }}
                  >

                    <span>

                      Linked Project:
                      {" "}

                      {team.project_title || "None"}

                    </span>

                  </div>

                  <div
                    style={{
                      marginTop:"18px"
                    }}
                  >

                    <span
                      className="view-link"
                    >
                      View Team →
                    </span>

                  </div>

                </div>

              </Link>

            ))

          )}

        </div>

      </div>

    </div>

  )

}