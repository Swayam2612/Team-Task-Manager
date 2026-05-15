import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function TaskDetails(){

  const {id} =
  useParams();

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const [comments,setComments] =
  useState([]);

  const [attachments,setAttachments] =
  useState([]);

  const [comment,setComment] =
  useState("");

  const [file,setFile] =
  useState("");

  useEffect(()=>{

    fetchComments();

    fetchAttachments();

  },[]);

  const fetchComments = async()=>{

    try{

      const res =
      await api.get(
        `/comments/${id}`
      );

      setComments(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const fetchAttachments = async()=>{

    try{

      const res =
      await api.get(
        `/attachments/${id}`
      );

      setAttachments(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const addComment = async()=>{

    if(!comment){

      return;

    }

    try{

      await api.post(
        "/comments",
        {

          task_id:id,

          user_name:user.name,

          comment

        }
      );

      setComment("");

      fetchComments();

    }catch(err){

      console.log(err);

    }

  };

  const addAttachment = async()=>{

    if(!file){

      return;

    }

    try{

      await api.post(
        "/attachments",
        {

          task_id:id,

          file_name:file,

          file_url:file

        }
      );

      setFile("");

      fetchAttachments();

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
            Task Workspace
          </h1>

          <p>
            Collaborate using comments
            and attachments.
          </p>

        </div>

        <div className="workspace-grid">

          {/* COMMENTS */}

          <div className="workspace-section">

            <h2>
              Comments
            </h2>

            <div className="workspace-input">

              <textarea
                placeholder="Write comment..."
                value={comment}
                onChange={(e)=>
                  setComment(
                    e.target.value
                  )
                }
              />

              <button
                className="primary-btn"
                onClick={addComment}
              >
                Add Comment
              </button>

            </div>

            <div className="comment-list">

              {comments.map(item=>(

                <div
                  className="comment-card"
                  key={item.id}
                >

                  <h3>
                    {item.user_name}
                  </h3>

                  <p>
                    {item.comment}
                  </p>

                  <span>
                    {item.created_at}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* ATTACHMENTS */}

          <div className="workspace-section">

            <h2>
              Attachments
            </h2>

            <div className="workspace-input">

              <input
                placeholder="Paste file URL"
                value={file}
                onChange={(e)=>
                  setFile(
                    e.target.value
                  )
                }
              />

              <button
                className="primary-btn"
                onClick={addAttachment}
              >
                Add File
              </button>

            </div>

            <div className="attachment-list">

              {attachments.map(file=>(

                <a
                  href={file.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="attachment-card"
                  key={file.id}
                >

                  📎 {file.file_name}

                </a>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}