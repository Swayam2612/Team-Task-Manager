import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function Notifications(){

  const [notifications,setNotifications] =
  useState([]);

  useEffect(()=>{

    fetchNotifications();

  },[]);

  const fetchNotifications = async()=>{

    try{

      const res =
      await api.get(
        "/notifications"
      );

      setNotifications(

        Array.isArray(res.data)
        ? res.data
        : []

      );

    }catch(err){

      console.log(err);

      setNotifications([]);

    }

  };

  const markAsRead = async(id)=>{

    try{

      await api.put(
        `/notifications/${id}`
      );

      fetchNotifications();

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
            Notifications
          </h1>

          <p>
            Workspace alerts and updates.
          </p>

        </div>

        <div className="notifications-list">

          {

            (Array.isArray(notifications)
              ? notifications
              : []
            ).map((notification)=>(

              <div
                className={`notification-card ${
                  notification.is_read
                  ? "read"
                  : ""
                }`}
                key={notification.id}
              >

                <div>

                  <h3>
                    {notification.message}
                  </h3>

                  <p>
                    {notification.created_at}
                  </p>

                </div>

                {!notification.is_read && (

                  <button
                    className="primary-btn"
                    onClick={()=>
                      markAsRead(
                        notification.id
                      )
                    }
                  >
                    Mark as Read
                  </button>

                )}

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}