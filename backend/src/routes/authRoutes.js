// backend/src/routes/authRoutes.js

const router =
require("express").Router();

const db =
require("../db/database");

/* =========================
   SIGNUP
========================= */

router.post(
  "/signup",
  (req,res)=>{

    const {

      name,

      email,

      password,

      role

    } = req.body;

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
              error:"Database error"
            });

        }

        if(user){

          return res
            .status(400)
            .json({
              error:"User already exists"
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

            name || "",

            email || "",

            password || "",

            role || "Team Member"

          ],
          function(err){

            if(err){

              console.log(err);

              return res
                .status(500)
                .json({
                  error:"Signup failed"
                });

            }

            res.json({

              success:true,

              id:this.lastID

            });

          }
        )

      }
    )

  }
);

/* =========================
   LOGIN
========================= */

router.post(
  "/login",
  (req,res)=>{

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

          console.log(err);

          return res
            .status(500)
            .json({
              error:"Database error"
            });

        }

        if(!user){

          return res
            .status(401)
            .json({
              error:"Invalid credentials"
            });

        }

        res.json({

          id:user.id,

          name:user.name,

          email:user.email,

          role:user.role

        });

      }
    )

  }
);

module.exports = router;