const router =
require("express").Router();

const db =
require("../db/database");

const createNotification =
require("../utils/notificationHelper");

const createActivity =
require("../utils/activityHelper");

/* =========================
   GET ALL TASKS
========================= */

router.get("/",(req,res)=>{

  db.all(
    `
    SELECT

      tasks.*,

      projects.title
      AS project_title

    FROM tasks

    LEFT JOIN projects
    ON tasks.project_id = projects.id

    ORDER BY tasks.created_at DESC
    `,
    [],
    (err,rows)=>{

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to fetch tasks"
          });

      }

      res.json(rows);

    }
  )

});

/* =========================
   GET SINGLE TASK
========================= */

router.get("/:id",(req,res)=>{

  db.get(
    `
    SELECT *

    FROM tasks

    WHERE id=?
    `,
    [req.params.id],
    (err,row)=>{

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to fetch task"
          });

      }

      res.json(row);

    }
  )

});

/* =========================
   CREATE TASK
========================= */

router.post("/",(req,res)=>{

  console.log(req.body);

  const {

    title,

    description,

    priority,

    status,

    deadline,

    project_id,

    assigned_to

  } = req.body;

  db.run(
    `
    INSERT INTO tasks(

      title,

      description,

      priority,

      status,

      deadline,

      project_id,

      assigned_to,

      comments,

      attachments

    )

    VALUES(?,?,?,?,?,?,?,?,?)
    `,
    [

      title || "",

      description || "",

      priority || "Medium",

      status || "Pending",

      deadline || "",

      project_id || null,

      assigned_to || "",

      "[]",

      "[]"

    ],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to create task"
          });

      }

      createNotification(
        `New task created: ${title}`
      );

      createActivity(
        `Task created: ${title}`
      );

      res.json({

        success:true,

        id:this.lastID

      });

    }
  )

});

/* =========================
   UPDATE TASK
========================= */

router.put("/:id",(req,res)=>{

  const {

    title,

    description,

    priority,

    status,

    deadline,

    project_id,

    assigned_to,

    comments,

    attachments

  } = req.body;

  db.run(
    `
    UPDATE tasks

    SET

      title=?,

      description=?,

      priority=?,

      status=?,

      deadline=?,

      project_id=?,

      assigned_to=?,

      comments=?,

      attachments=?

    WHERE id=?
    `,
    [

      title,

      description,

      priority,

      status,

      deadline,

      project_id,

      assigned_to,

      comments || "[]",

      attachments || "[]",

      req.params.id

    ],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to update task"
          });

      }

      createNotification(
        `Task updated: ${title}`
      );

      createActivity(
        `Task updated: ${title}`
      );

      res.json({

        success:true

      });

    }
  )

});

/* =========================
   DELETE TASK
========================= */

router.delete("/:id",(req,res)=>{

  db.run(
    `
    DELETE FROM tasks

    WHERE id=?
    `,
    [req.params.id],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to delete task"
          });

      }

      createNotification(
        `Task deleted`
      );

      createActivity(
        `Task deleted`
      );

      res.json({

        success:true

      });

    }
  )

});

module.exports = router;