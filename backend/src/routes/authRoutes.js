const router =
require("express").Router();

/* TEST ROUTE */

router.get("/",(req,res)=>{

  res.send(
    "AUTH ROUTES WORKING"
  );

});

/* TEST SIGNUP */

router.post("/signup",(req,res)=>{

  return res.json({

    success:true,

    message:"Signup working"

  });

});

/* TEST LOGIN */

router.post("/login",(req,res)=>{

  return res.json({

    success:true,

    message:"Login working"

  });

});

module.exports =
router;