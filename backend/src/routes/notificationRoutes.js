const router =
require("express").Router();

const db =
require("../db/database");

/* =========================
   GET NOTIFICATIONS
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

    FROM notifications

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
            error:"Failed to fetch notifications"
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

/* =========================
   MARK AS READ
========================= */

router.put("/:id",(req,res)=>{

  db.run(
    `
    UPDATE notifications

    SET is_read = 1

    WHERE id = ?
    `,
    [req.params.id],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to update notification"
          });

      }

      res.json({

        success:true

      });

    }
  );

});

module.exports = router;