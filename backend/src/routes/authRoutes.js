const router =
require("express").Router();

const db =
require("../db/database");

/* =========================
   TEST ROUTE
========================= */

router.get("/",(req,res)=>{

  res.json({

    success:true,

    message:
    "Auth routes working"

  });

});

/* =========================
   SIGNUP
========================= */

router.post("/signup",(req,res)=>{

  const {

    name,

    email,

    password,

    role

  } = req.body;

  /* VALIDATION */

  if(

    !name ||

    !email ||

    !password

  ){

    return res
      .status(400)
      .json({

        success:false,

        error:
        "All fields are required"

      });

  }

  /* CHECK EXISTING USER */

  db.get(
    `
    SELECT *

    FROM users

    WHERE email = ?
    `,
    [email],
    (err,user)=>{

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({

            success:false,

            error:
            "Database error"

          });

      }

      if(user){

        return res
          .status(400)
          .json({

            success:false,

            error:
            "Email already exists"

          });

      }

      /* CREATE USER */

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

            console.log(err);

            return res
              .status(500)
              .json({

                success:false,

                error:
                "Failed to create account"

              });

          }

          return res.json({

            success:true,

            user:{

              id:this.lastID,

              name,

              email,

              role:
              role || "Member"

            }

          });

        }
      );

    }
  );

});

/* =========================
   LOGIN
========================= */

router.post("/login",(req,res)=>{

  const {

    email,

    password

  } = req.body;

  if(

    !email ||

    !password

  ){

    return res
      .status(400)
      .json({

        success:false,

        error:
        "Email and password required"

      });

  }

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

        console.log(err);

        return res
          .status(500)
          .json({

            success:false,

            error:
            "Database error"

          });

      }

      if(!user){

        return res
          .status(401)
          .json({

            success:false,

            error:
            "Invalid credentials"

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