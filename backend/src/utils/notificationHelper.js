const db =
require("../db/database");

const createNotification = (
  message
)=>{

  db.run(
    `
    INSERT INTO notifications(
      message
    )

    VALUES(?)
    `,
    [message]
  );

};

module.exports =
createNotification;