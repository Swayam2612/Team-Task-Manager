const router =
require("express").Router();

const db =
require("../db/database");

/* GET COMMENTS */

router.get("/:taskId",(req,res)=>{

  db.all(
    `
    SELECT *
    FROM comments

    WHERE task_id=?

    ORDER BY created_at DESC
    `,
    [req.params.taskId],
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

/* CREATE COMMENT */

router.post("/",(req,res)=>{

  const {

    task_id,

    user_name,

    comment

  } = req.body;

  db.run(
    `
    INSERT INTO comments(

      task_id,

      user_name,

      comment

    )

    VALUES(?,?,?)
    `,
    [

      task_id,

      user_name,

      comment

    ],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json(err);

      }

      res.json({

        success:true,

        id:this.lastID

      });

    }
  )

});

module.exports = router;