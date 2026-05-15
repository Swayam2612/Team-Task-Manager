const express =
require("express");

const app =
express();

/* =========================
   DATABASE
========================= */

require("./db/database");

/* =========================
   MANUAL CORS FIX
========================= */

app.use((req,res,next)=>{

  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if(req.method === "OPTIONS"){

    return res.sendStatus(200);

  }

  next();

});

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

/* =========================
   ROUTES
========================= */

const authRoutes =
require("./routes/authRoutes");

const projectRoutes =
require("./routes/projectRoutes");

const teamRoutes =
require("./routes/teamRoutes");

const taskRoutes =
require("./routes/taskRoutes");

const activityRoutes =
require("./routes/activityRoutes");

const commentRoutes =
require("./routes/commentRoutes");

const attachmentRoutes =
require("./routes/attachmentRoutes");

const notificationRoutes =
require("./routes/notificationRoutes");

/* =========================
   API ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/teams",
  teamRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/activities",
  activityRoutes
);

app.use(
  "/api/comments",
  commentRoutes
);

app.use(
  "/api/attachments",
  attachmentRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

/* =========================
   HEALTH CHECK
========================= */

app.get("/",(req,res)=>{

  res.send(
    "Team Task Manager API Running"
  );

});

/* =========================
   SERVER
========================= */

const PORT =
process.env.PORT || 5000;

app.listen(

  PORT,

  "0.0.0.0",

  ()=>{

    console.log(
      `Server running on ${PORT}`
    );

  }

);