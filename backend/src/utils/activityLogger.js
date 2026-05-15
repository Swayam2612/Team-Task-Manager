const db =
require("../db/database");

const logActivity = (message)=>{

  db.run(
    `
    INSERT INTO activities(
      message
    )

    VALUES(?)
    `,
    [message]
  );

};

module.exports =
logActivity;