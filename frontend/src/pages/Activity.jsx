import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

export default function Activity(){

  const [activities,setActivities] =
  useState([]);

  useEffect(()=>{

    fetchActivities();

  },[]);

  const fetchActivities = async()=>{

    try{

      const res =
      await api.get("/activities");

      setActivities(res.data);

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
            Activity Feed
          </h1>

          <p>
            Recent actions across workspace.
          </p>

        </div>

        <div className="activity-list">

          {activities.length === 0 ? (

            <div className="empty-state">

              No activity yet.

            </div>

          ) : (

            activities.map(activity=>(

              <div
                className="activity-card"
                key={activity.id}
              >

                <div className="activity-dot"/>

                <div>

                  <h3>
                    {activity.message}
                  </h3>

                  <p>
                    {activity.created_at}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  )

}