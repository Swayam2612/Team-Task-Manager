const db =
require("../db/database");

const createActivity = (

  user_id,

  message

)=>{

  if(!user_id || !message){

    return;

  }

  db.run(
    `
    INSERT INTO activities(

      user_id,

      message

    )

    VALUES(?,?)
    `,
    [

      user_id,

      message

    ],
    (err)=>{

      if(err){

        console.log(err);

      }

    }
  );

};

module.exports =
createActivity;