const express =
require("express");

const cors =
require("cors");

const app =
express();

/* =========================
   DATABASE
========================= */

require("./db/database");

/* =========================
   MIDDLEWARE
========================= */

app.use(cors({

  origin:[
    "http://localhost:5173",
    "https://task-team-manager.up.railway.app"
  ],

  credentials:true

}));

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

  res.json({

    success:true,

    message:
    "Backend running"

  });

});

/* =========================
   SERVER
========================= */

const PORT =
process.env.PORT || 5000;

app.listen(PORT,()=>{

  console.log(
    `Server running on ${PORT}`
  );

});