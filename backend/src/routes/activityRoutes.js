const router =
require("express").Router();

const db =
require("../db/database");

router.get("/",(req,res)=>{

  db.all(
    `
    SELECT *

    FROM activities

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

module.exports = router;