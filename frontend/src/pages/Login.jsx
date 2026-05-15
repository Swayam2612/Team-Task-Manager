import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import api
from "../services/api";

export default function Login(){

  const navigate =
  useNavigate();

  const [formData,setFormData] =
  useState({

    email:"",
    password:""

  });

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const handleLogin = async()=>{

    try{

      const res =
      await api.post(
        "/auth/login",
        formData
      );

      /* SAVE CURRENT USER */

      localStorage.setItem(

        "user",

        JSON.stringify({

  id:res.data.id,

  name:res.data.name,

  email:res.data.email,

  role:res.data.role

})

      );

      navigate(
        "/dashboard"
      );

    }catch(err){

      console.log(err);

      alert(
        "Invalid email or password"
      );

    }

  };

  return(

    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to continue managing your workspace.
        </p>

        <div className="auth-form">

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

          </div>

          <button
            className="primary-btn"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>

        <div className="auth-footer">

          Don’t have an account?

          {" "}

          <Link to="/signup">

            Sign up

          </Link>

        </div>

      </div>

    </div>

  )

}