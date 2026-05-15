const db =
require("../db/database");

const createActivity = (
  message
)=>{

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
createActivity;