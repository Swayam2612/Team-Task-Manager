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

      res.json(

        Array.isArray(rows)
        ? rows
        : []

      );

    }
  );

});

/* =========================
   GET SINGLE PROJECT
========================= */

router.get("/:id",(req,res)=>{

  db.get(
    `
    SELECT *

    FROM projects

    WHERE id = ?
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

      if(!row){

        return res
          .status(404)
          .json({
            error:"Project not found"
          });

      }

      res.json(row);

    }
  );

});

/* =========================
   CREATE PROJECT
========================= */

router.post("/",(req,res)=>{

  const {

    user_id,

    title,

    description,

    deadline

  } = req.body;

  if(!user_id || !title){

    return res
      .status(400)
      .json({
        error:"Missing required fields"
      });

  }

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
        user_id,
        `New project created: ${title}`
      );

      createActivity(
        user_id,
        `Project created: ${title}`
      );

      res.json({

        success:true,

        id:this.lastID

      });

    }
  );

});

/* =========================
   UPDATE PROJECT
========================= */

router.put("/:id",(req,res)=>{

  const {

    user_id,

    title,

    description,

    deadline

  } = req.body;

  db.run(
    `
    UPDATE projects

    SET

      title = ?,

      description = ?,

      deadline = ?

    WHERE id = ?
    `,
    [

      title || "",

      description || "",

      deadline || "",

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
        user_id,
        `Project updated: ${title}`
      );

      createActivity(
        user_id,
        `Project updated: ${title}`
      );

      res.json({

        success:true

      });

    }
  );

});

/* =========================
   DELETE PROJECT
========================= */

router.delete("/:id",(req,res)=>{

  db.run(
    `
    DELETE FROM projects

    WHERE id = ?
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

      res.json({

        success:true

      });

    }
  );

});

module.exports = router;