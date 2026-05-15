const db =
require("../db/database");

const createNotification = (

  user_id,

  message

)=>{

  if(!user_id || !message){

    return;

  }

  db.run(
    `
    INSERT INTO notifications(

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
createNotification;