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

  if(!user_id){

    return res
      .status(400)
      .json({
        error:"user_id required"
      });

  }

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

      res.json(

        Array.isArray(rows)
        ? rows
        : []

      );

    }
  );

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

      if(!row){

        return res
          .status(404)
          .json({
            error:"Team not found"
          });

      }

      res.json(row);

    }
  );

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

  if(!user_id || !name){

    return res
      .status(400)
      .json({
        error:"Missing required fields"
      });

  }

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
        user_id,
        `New team created: ${name}`
      );

      createActivity(
        user_id,
        `Team created: ${name}`
      );

      res.json({

        success:true,

        id:this.lastID

      });

    }
  );

});

/* =========================
   UPDATE TEAM
========================= */

router.put("/:id",(req,res)=>{

  const {

    user_id,

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

      name || "",

      description || "",

      project_id || null,

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
        user_id,
        `Team updated: ${name}`
      );

      createActivity(
        user_id,
        `Team updated: ${name}`
      );

      res.json({

        success:true

      });

    }
  );

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

      res.json({

        success:true

      });

    }
  );

});

module.exports = router;