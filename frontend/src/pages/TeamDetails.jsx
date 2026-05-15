import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function TaskDetails(){

  const {id} =
  useParams();

  const [task,setTask] =
  useState(null);

  const [project,setProject] =
  useState(null);

  const [comment,setComment] =
  useState("");

  const [attachment,setAttachment] =
  useState("");

  useEffect(()=>{

    fetchTaskData();

  },[]);

  /* =========================
     FETCH TASK DATA
  ========================= */

  const fetchTaskData = async()=>{

    try{

      const res =
      await api.get(
        `/tasks/${id}`
      );

      const formatted = {

        ...res.data,

        comments:(()=>{

          try{

            return res.data.comments
            ? JSON.parse(res.data.comments)
            : [];

          }catch{

            return [];

          }

        })(),

        attachments:(()=>{

          try{

            return res.data.attachments
            ? JSON.parse(res.data.attachments)
            : [];

          }catch{

            return [];

          }

        })()

      };

      setTask(
        formatted
      );

      /* FETCH PROJECT */

      if(formatted.project_id){

        const projectRes =
        await api.get(
          `/projects/${formatted.project_id}`
        );

        setProject(
          projectRes.data || null
        );

      }

    }catch(err){

      console.log(err);

      setTask(null);

    }

  };

  /* =========================
     ADD COMMENT
  ========================= */

  const addComment = async()=>{

    try{

      const updatedComments = [

        ...(Array.isArray(task.comments)
          ? task.comments
          : []
        ),

        comment

      ];

      await api.put(
        `/tasks/${id}`,
        {

          ...task,

          comments:updatedComments

        }
      );

      setComment("");

      fetchTaskData();

    }catch(err){

      console.log(err);

    }

  };

  /* =========================
     ADD ATTACHMENT
  ========================= */

  const addAttachment = async()=>{

    try{

      const updatedAttachments = [

        ...(Array.isArray(task.attachments)
          ? task.attachments
          : []
        ),

        attachment

      ];

      await api.put(
        `/tasks/${id}`,
        {

          ...task,

          attachments:
          updatedAttachments

        }
      );

      setAttachment("");

      fetchTaskData();

    }catch(err){

      console.log(err);

    }

  };

  if(!task){

    return(

      <div>

        <Navbar/>

        <div className="page">

          Loading...

        </div>

      </div>

    );

  }

  return(

    <div>

      <Navbar/>

      <div className="page">

        {/* HEADER */}

        <div className="page-header">

          <h1>
            {task.title}
          </h1>

          <p>
            Complete task workspace and collaboration details.
          </p>

        </div>

        {/* TASK OVERVIEW */}

        <div className="dashboard-card">

          <h2>
            Task Overview
          </h2>

          <p
            style={{
              marginTop:"18px",
              lineHeight:"1.7"
            }}
          >

            {task.description || "No description"}

          </p>

          <div
            className="task-meta"
            style={{
              marginTop:"22px"
            }}
          >

            <span>
              {task.priority}
            </span>

            <span>
              {task.status}
            </span>

            <span>

              Deadline:
              {" "}
              {task.deadline || "None"}

            </span>

          </div>

        </div>

        {/* LINKED PROJECT */}

        <div
          className="dashboard-card"
          style={{
            marginTop:"24px"
          }}
        >

          <div className="card-header">

            <h2>
              Linked Project
            </h2>

          </div>

          {!project ? (

            <div className="empty-state">

              ✨ No linked project.

            </div>

          ) : (

            <Link
              to={`/projects/${project.id}`}
            >

              <div className="dashboard-item">

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

              </div>

            </Link>

          )}

        </div>

        {/* GRID */}

        <div
          className="dashboard-grid"
          style={{
            marginTop:"24px"
          }}
        >

          {/* COMMENTS */}

          <div className="dashboard-card">

            <div className="card-header">

              <h2>
                Comments
              </h2>

            </div>

            <div
              style={{
                marginBottom:"18px"
              }}
            >

              <input
                value={comment}
                onChange={(e)=>
                  setComment(
                    e.target.value
                  )
                }
                placeholder="Add comment"
                style={{
                  width:"100%",
                  marginBottom:"12px"
                }}
              />

              <button
                className="primary-btn"
                onClick={addComment}
              >
                Add Comment
              </button>

            </div>

            {

              (Array.isArray(task.comments)
                ? task.comments
                : []
              ).length === 0 ? (

                <div className="empty-state">

                  ✨ No comments yet.

                </div>

              ) : (

                (Array.isArray(task.comments)
                  ? task.comments
                  : []
                ).map(
                  (comment,index)=>(

                    <div
                      className="dashboard-item"
                      key={index}
                    >

                      <p>
                        {comment}
                      </p>

                    </div>

                  )
                )

              )

            }

          </div>

          {/* ATTACHMENTS */}

          <div className="dashboard-card">

            <div className="card-header">

              <h2>
                Attachments / URLs
              </h2>

            </div>

            <div
              style={{
                marginBottom:"18px"
              }}
            >

              <input
                value={attachment}
                onChange={(e)=>
                  setAttachment(
                    e.target.value
                  )
                }
                placeholder="Paste URL"
                style={{
                  width:"100%",
                  marginBottom:"12px"
                }}
              />

              <button
                className="primary-btn"
                onClick={addAttachment}
              >
                Add URL
              </button>

            </div>

            {

              (Array.isArray(task.attachments)
                ? task.attachments
                : []
              ).length === 0 ? (

                <div className="empty-state">

                  ✨ No attachments yet.

                </div>

              ) : (

                (Array.isArray(task.attachments)
                  ? task.attachments
                  : []
                ).map(
                  (link,index)=>(

                    <div
                      className="dashboard-item"
                      key={index}
                    >

                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="view-link"
                      >

                        {link}

                      </a>

                    </div>

                  )
                )

              )

            }

          </div>

        </div>

      </div>

    </div>

  );

}