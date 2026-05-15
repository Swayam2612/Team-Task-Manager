const router =
require("express").Router();

const db =
require("../db/database");

/* GET ATTACHMENTS */

router.get("/:taskId",(req,res)=>{

  db.all(
    `
    SELECT *
    FROM attachments

    WHERE task_id=?
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

/* CREATE ATTACHMENT */

router.post("/",(req,res)=>{

  const {

    task_id,

    file_name,

    file_url

  } = req.body;

  db.run(
    `
    INSERT INTO attachments(

      task_id,

      file_name,

      file_url

    )

    VALUES(?,?,?)
    `,
    [

      task_id,

      file_name,

      file_url

    ],
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