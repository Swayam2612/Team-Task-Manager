import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../services/api";

export default function Signup(){

  const navigate = useNavigate();

  const [form,setForm] = useState({

    name:"",
    email:"",
    password:"",
    role:"Member"

  });

  const signup = async()=>{

    try{

      await api.post(
        "/auth/signup",
        form
      );

      alert("User Created");

      navigate("/");

    }catch(err){

      console.log(err);

      alert("Signup failed");

    }

  };

  return(

    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Create Account
        </h1>

        <div className="task-form">

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter Name"
              value={form.name}
              onChange={(e)=>
                setForm({
                  ...form,
                  name:e.target.value
                })
              }
            />

          </div>

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={(e)=>
                setForm({
                  ...form,
                  email:e.target.value
                })
              }
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={(e)=>
                setForm({
                  ...form,
                  password:e.target.value
                })
              }
            />

          </div>

          <div className="form-group">

            <label>
              Role
            </label>

            <select
              value={form.role}
              onChange={(e)=>
                setForm({
                  ...form,
                  role:e.target.value
                })
              }
            >

              <option>
                Member
              </option>

              <option>
                Admin
              </option>

            </select>

          </div>

        </div>

        <button
          className="primary-btn"
          onClick={signup}
        >
          Create Account
        </button>

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

  )

}