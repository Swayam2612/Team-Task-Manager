const router =
require("express").Router();

const cors =
require("cors");

router.use(

  cors({

    origin:
    "https://task-team-manager.up.railway.app",

    credentials:true

  })

);

const db =
require("../db/database");

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

  if(

    !name ||

    !email ||

    !password

  ){

    return res
      .status(400)
      .json({

        error:
        "All fields required"

      });

  }

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

            error:
            "Database error"

          });

      }

      if(user){

        return res
          .status(400)
          .json({

            error:
            "Email already exists"

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

            console.log(err);

            return res
              .status(500)
              .json({

                error:
                "Failed to create account"

              });

          }

          res.json({

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

            error:
            "Database error"

          });

      }

      if(!user){

        return res
          .status(401)
          .json({

            error:
            "Invalid credentials"

          });

      }

      res.json({

        success:true,

        user

      });

    }
  );

});

module.exports =
router;