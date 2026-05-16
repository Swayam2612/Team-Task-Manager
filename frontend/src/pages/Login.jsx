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

  const [loading,setLoading] =
  useState(false);

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const handleLogin = async()=>{

    try{

      setLoading(true);

      const res =
      await api.post(

        "/auth/login",

        formData

      );

      /* VALIDATE RESPONSE */

      if(

        !res.data ||

        !res.data.success ||

        !res.data.user

      ){

        alert(
          "Login failed"
        );

        return;

      }

      /* SAVE USER */

      localStorage.setItem(

        "user",

        JSON.stringify(

          res.data.user

        )

      );

      navigate(
        "/dashboard"
      );

    }catch(err){

      console.log(err);

      alert(

        err?.response?.data?.error ||

        "Invalid email or password"

      );

    }finally{

      setLoading(false);

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

          {/* EMAIL */}

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

          {/* PASSWORD */}

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

          {/* BUTTON */}

          <button
            className="primary-btn"
            onClick={handleLogin}
            disabled={loading}
          >

            {

              loading
              ? "Logging in..."
              : "Login"

            }

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

  );

}