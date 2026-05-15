import {
  useEffect,
  useState
} from "react";

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

  useEffect(()=>{

    fetchTeams();

    fetchProjects();

  },[]);

  const fetchTeams = async()=>{

    try{

      const res =
      await api.get("/teams");

      setTeams(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const fetchProjects = async()=>{

    try{

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res =
      await api.get(

        `/projects?user_id=${user.id}`

      );

      setProjects(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const createTeam = async()=>{

    try{

      await api.post(
        "/teams",
        formData
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
            Manage teams and project collaboration.
          </p>

        </div>

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
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Team description"
              />

            </div>

            <div className="form-group">

              <label>
                Linked Project
              </label>

              <select
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
              >

                <option value="">
                  Select Project
                </option>

                {projects.map(project=>(

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

        <div className="teams-grid">

          {teams.map(team=>(

            <div
              className="team-card"
              key={team.id}
            >

              <div className="team-top">

                <h2>
                  {team.name}
                </h2>

                <button
                  className="delete-btn"
                  onClick={()=>
                    deleteTeam(team.id)
                  }
                >
                  Delete
                </button>

              </div>

              <p>
                {team.description}
              </p>

              <div className="team-project">

                <strong>
                  Linked Project:
                </strong>

                {" "}

                {team.project_title || "None"}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}