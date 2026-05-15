const router =
require("express").Router();

const db =
require("../db/database");

/* GET NOTIFICATIONS */

router.get("/",(req,res)=>{

  db.all(
    `
    SELECT *

    FROM notifications

    ORDER BY created_at DESC
    `,
    [],
    (err,rows)=>{

      if(err){

        console.log(err);

        return res
          .status(500)
          .json(err);

      }

      res.json(rows);

    }
  )

});

/* MARK AS READ */

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
          .json(err);

      }

      res.json({

        success:true

      });

    }
  )

});

module.exports = router;