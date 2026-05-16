const router =
require("express").Router();

const db =
require("../db/database");

/* =========================
   SIGNUP
========================= */

router.post("/signup",(req,res)=>{

  console.log("SIGNUP REQUEST:", req.body);

  const {
    name,
    email,
    password,
    role
  } = req.body;

  if(
    !name ||
    !email ||
    !password
  ){

    return res.status(400).json({

      success:false,

      error:"All fields required"

    });

  }

  db.run(

    `
    INSERT INTO users(
      name,
      email,
      password,
      role
    )
    VALUES(?,?,?,?)
    `,

    [
      name,
      email,
      password,
      role || "Member"
    ],

    function(err){

      if(err){

        console.log("SIGNUP DB ERROR:", err);

        return res.status(500).json({

          success:false,

          error:err.message

        });

      }

      return res.json({

        success:true,

        user:{
          id:this.lastID,
          name,
          email,
          role:role || "Member"
        }

      });

    }

  );

});

/* =========================
   LOGIN
========================= */

router.post("/login",(req,res)=>{

  console.log("LOGIN REQUEST:", req.body);

  const {
    email,
    password
  } = req.body;

  db.get(

    `
    SELECT *
    FROM users
    WHERE email = ?
    AND password = ?
    `,

    [
      email,
      password
    ],

    (err,user)=>{

      if(err){

        console.log("LOGIN DB ERROR:", err);

        return res.status(500).json({

          success:false,

          error:err.message

        });

      }

      if(!user){

        return res.status(401).json({

          success:false,

          error:"Invalid credentials"

        });

      }

      return res.json({

        success:true,

        user

      });

    }

  );

});

module.exports =
router;