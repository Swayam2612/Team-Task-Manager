const router = require("express").Router();
const db = require("../db/database");

router.post("/signup",(req,res)=>{

  const {name,email,password,role} = req.body;

  console.log("SIGNUP:",req.body);

  db.run(
    "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
    [name,email,password,role],
    function(err){

      if(err){

        console.log(err);

        return res.status(500).json(err);

      }

      res.json({

  id:user.id,

  name:user.name,

  email:user.email,

  role:user.role

});

    }
  )

});

router.post("/login",(req,res)=>{

  console.log("LOGIN:",req.body);

  const {email,password} = req.body;

  db.get(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email,password],
    (err,row)=>{

      if(err){

        console.log(err);

        return res.status(500).json(err);

      }

      if(!row){

        return res.status(401).json({
          message:"Invalid credentials"
        });

      }

      res.json(row);

    }
  )

});

module.exports = router;