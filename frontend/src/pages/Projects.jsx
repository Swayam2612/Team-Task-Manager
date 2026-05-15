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

export default function Projects(){

  const [projects,setProjects] =
  useState([]);

  const [formData,setFormData] =
  useState({

    title:"",
    description:"",
    deadline:""

  });

  useEffect(()=>{

    fetchProjects();

  },[]);

  /* =========================
     FETCH PROJECTS
  ========================= */

  const fetchProjects = async()=>{

    try{

      const user = JSON.parse(

        localStorage.getItem(
          "user"
        )

      );

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
     CREATE PROJECT
  ========================= */

  const createProject = async()=>{

    try{

      const user = JSON.parse(

        localStorage.getItem(
          "user"
        )

      );

      const payload = {

        user_id:user.id,

        title:formData.title,

        description:formData.description,

        deadline:formData.deadline

      };

      console.log(payload);

      await api.post(
        "/projects",
        payload
      );

      setFormData({

        title:"",
        description:"",
        deadline:""

      });

      await fetchProjects();

    }catch(err){

      console.log(err);

      alert(
        "Failed to create project"
      );

    }

  };

  /* =========================
     DELETE PROJECT
  ========================= */

  const deleteProject = async(id)=>{

    try{

      await api.delete(
        `/projects/${id}`
      );

      fetchProjects();

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
            Projects
          </h1>

          <p>
            Manage all your workspace projects.
          </p>

        </div>

        {/* CREATE PROJECT */}

        <div className="task-form-card">

          <h2>
            Create Project
          </h2>

          <div className="task-form">

            <div className="form-group">

              <label>
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
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
                placeholder="Enter description"
              />

            </div>

            <div className="form-group">

              <label>
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />

            </div>

          </div>

          <button
            className="primary-btn"
            onClick={createProject}
          >
            Create Project
          </button>

        </div>

        {/* PROJECTS GRID */}

        <div className="projects-grid">

          {projects.length === 0 ? (

            <div className="empty-state">

              ✨ No projects yet.
              Create your first project.

            </div>

          ) : (

            (Array.isArray(projects) ? projects : []).map(project=>(

              <div
                className="project-card"
                key={project.id}
              >

                <div className="task-top">

                  <h2>
                    {project.title}
                  </h2>

                  <button
                    className="delete-btn"
                    onClick={()=>
                      deleteProject(
                        project.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

                <p>
                  {project.description}
                </p>

                <div
                  className="task-meta"
                  style={{
                    marginTop:"16px"
                  }}
                >

                  <span>

                    Deadline:
                    {" "}
                    {project.deadline || "None"}

                  </span>

                </div>

                <div
                  style={{
                    marginTop:"20px"
                  }}
                >

                  <Link
                    to={`/projects/${project.id}`}
                    className="view-link"
                  >
                    View Details →
                  </Link>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  )

}