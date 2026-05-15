const router =
require("express").Router();

const db =
require("../db/database");

const createNotification =
require("../utils/notificationHelper");

const createActivity =
require("../utils/activityHelper");

/* =========================
   GET ALL PROJECTS
========================= */

router.get("/",(req,res)=>{

  const user_id =
  req.query.user_id;

  db.all(
    `
    SELECT *

    FROM projects

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
            error:"Failed to fetch projects"
          });

      }

      res.json(rows);

    }
  )

});

/* =========================
   GET SINGLE PROJECT
========================= */

router.get("/:id",(req,res)=>{

  db.get(
    `
    SELECT *

    FROM projects

    WHERE id=?
    `,
    [req.params.id],
    (err,row)=>{

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to fetch project"
          });

      }

      res.json(row);

    }
  )

});

/* =========================
   CREATE PROJECT
========================= */

router.post("/",(req,res)=>{

  console.log(req.body);

  const {

    user_id,

    title,

    description,

    deadline

  } = req.body;

  db.run(
    `
    INSERT INTO projects(

      user_id,

      title,

      description,

      deadline

    )

    VALUES(?,?,?,?)
    `,
    [

      user_id,

      title || "",

      description || "",

      deadline || ""

    ],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to create project"
          });

      }

      createNotification(
        `New project created: ${title}`
      );

      createActivity(
        `Project created: ${title}`
      );

      res.json({

        success:true,

        id:this.lastID

      });

    }
  )

});

/* =========================
   UPDATE PROJECT
========================= */

router.put("/:id",(req,res)=>{

  const {

    title,

    description,

    deadline

  } = req.body;

  db.run(
    `
    UPDATE projects

    SET

      title=?,

      description=?,

      deadline=?

    WHERE id=?
    `,
    [

      title,

      description,

      deadline,

      req.params.id

    ],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to update project"
          });

      }

      createNotification(
        `Project updated: ${title}`
      );

      createActivity(
        `Project updated: ${title}`
      );

      res.json({

        success:true

      });

    }
  )

});

/* =========================
   DELETE PROJECT
========================= */

router.delete("/:id",(req,res)=>{

  db.run(
    `
    DELETE FROM projects

    WHERE id=?
    `,
    [req.params.id],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to delete project"
          });

      }

      createNotification(
        `Project deleted`
      );

      createActivity(
        `Project deleted`
      );

      res.json({

        success:true

      });

    }
  )

});

module.exports = router;