import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api
from "../services/api";

export default function Signup(){

  const navigate =
  useNavigate();

  const [form,setForm] =
  useState({

    name:"",
    email:"",
    password:"",
    role:"Member"

  });

  const [loading,setLoading] =
  useState(false);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e)=>{

    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });

  };

  /* =========================
     SIGNUP
  ========================= */

  const signup = async()=>{

    try{

      setLoading(true);

      const res =
      await api.post(

        "/auth/signup",

        form

      );

      if(

        !res.data ||

        !res.data.success

      ){

        alert(
          "Signup failed"
        );

        return;

      }

      alert(
        "Account created successfully"
      );

      navigate("/");

    }catch(err){

      console.log(err);

      alert(

        err?.response?.data?.error ||

        "Signup failed"

      );

    }finally{

      setLoading(false);

    }

  };

  return(

    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Create Account
        </h1>

        <div className="task-form">

          {/* NAME */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
            />

          </div>

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
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
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />

          </div>

          {/* ROLE */}

          <div className="form-group">

            <label>
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >

              <option value="Member">
                Member
              </option>

              <option value="Admin">
                Admin
              </option>

            </select>

          </div>

        </div>

        {/* BUTTON */}

        <button
          className="primary-btn"
          onClick={signup}
          disabled={loading}
        >

          {

            loading
            ? "Creating..."
            : "Create Account"

          }

        </button>

        {/* FOOTER */}

        <p
          style={{
            marginTop:"25px",
            textAlign:"center"
          }}
        >

          Already have an account?

          {" "}

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}