import Navbar
from "../components/Navbar";

export default function Profile(){

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  if(!user){

    return(

      <div>

        <Navbar/>

        <div className="page">

          No user found.

        </div>

      </div>

    )

  }

  return(

    <div>

      <Navbar/>

      <div className="page">

        <div className="profile-card">

          <div className="profile-top">

            <div className="profile-avatar">

              {user.name
                ?.charAt(0)
                ?.toUpperCase()
              }

            </div>

            <div>

              <h1>
                {user.name}
              </h1>

              <p>
                {user.email}
              </p>

            </div>

          </div>

          <div className="profile-details">

            <div className="profile-item">

              <strong>
                Role
              </strong>

              <div
                className={`role-badge ${user.role || "Team Member"}`}
              >

                {user.role}

              </div>

            </div>

            <div className="profile-item">

              <strong>
                Account Type
              </strong>

              <p>
                Team Collaboration Workspace
              </p>

            </div>

            <div className="profile-item">

              <strong>
                Permissions
              </strong>

              <p>

                {user.role === "Admin"

                  ? "Full project management access"

                  : "Team member access"}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}