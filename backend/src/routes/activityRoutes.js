const router =
require("express").Router();

const db =
require("../db/database");

/* =========================
   GET ACTIVITIES
========================= */

router.get("/",(req,res)=>{

  const user_id =
  req.query.user_id;

  if(!user_id){

    return res
      .status(400)
      .json({
        error:"user_id required"
      });

  }

  db.all(
    `
    SELECT *

    FROM activities

    WHERE user_id = ?

    ORDER BY created_at DESC
    `,
    [user_id],
    (err,rows)=>{

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to fetch activities"
          });

      }

      res.json(

        Array.isArray(rows)
        ? rows
        : []

      );

    }
  );

});

module.exports = router;