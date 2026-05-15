const router =
require("express").Router();

const db =
require("../db/database");

const createNotification =
require("../utils/notificationHelper");

const createActivity =
require("../utils/activityHelper");

/* =========================
   GET ALL TEAMS
========================= */

router.get("/",(req,res)=>{

  const user_id =
  req.query.user_id;

  db.all(
    `
    SELECT teams.*,

    projects.title
    AS project_title

    FROM teams

    LEFT JOIN projects
    ON teams.project_id = projects.id

    WHERE teams.user_id = ?

    ORDER BY teams.created_at DESC
    `,
    [user_id],
    (err,rows)=>{

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to fetch teams"
          });

      }

      res.json(rows);

    }
  )

});

/* =========================
   GET SINGLE TEAM
========================= */

router.get("/:id",(req,res)=>{

  db.get(
    `
    SELECT teams.*,

    projects.title
    AS project_title

    FROM teams

    LEFT JOIN projects
    ON teams.project_id = projects.id

    WHERE teams.id = ?
    `,
    [req.params.id],
    (err,row)=>{

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to fetch team"
          });

      }

      res.json(row);

    }
  )

});

/* =========================
   CREATE TEAM
========================= */

router.post("/",(req,res)=>{

  const {

    user_id,

    name,

    description,

    project_id

  } = req.body;

  db.run(
    `
    INSERT INTO teams(

      user_id,

      name,

      description,

      project_id

    )

    VALUES(?,?,?,?)
    `,
    [

      user_id,

      name || "",

      description || "",

      project_id || null

    ],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to create team"
          });

      }

      createNotification(
        `New team created: ${name}`
      );

      createActivity(
        `Team created: ${name}`
      );

      res.json({

        success:true,

        id:this.lastID

      });

    }
  )

});

/* =========================
   UPDATE TEAM
========================= */

router.put("/:id",(req,res)=>{

  const {

    name,

    description,

    project_id

  } = req.body;

  db.run(
    `
    UPDATE teams

    SET

      name = ?,

      description = ?,

      project_id = ?

    WHERE id = ?
    `,
    [

      name,

      description,

      project_id,

      req.params.id

    ],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to update team"
          });

      }

      createNotification(
        `Team updated: ${name}`
      );

      createActivity(
        `Team updated: ${name}`
      );

      res.json({

        success:true

      });

    }
  )

});

/* =========================
   DELETE TEAM
========================= */

router.delete("/:id",(req,res)=>{

  db.run(
    `
    DELETE FROM teams

    WHERE id = ?
    `,
    [req.params.id],
    function(err){

      if(err){

        console.log(err);

        return res
          .status(500)
          .json({
            error:"Failed to delete team"
          });

      }

      createNotification(
        `Team deleted`
      );

      createActivity(
        `Team deleted`
      );

      res.json({

        success:true

      });

    }
  )

});

module.exports = router;