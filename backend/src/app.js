import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

app.use(cookieParser());

app.use(express.static("public"));

// getting the data as json
app.use(
  express.json({
    limit: "24kb",
  })
);

// getting the data from the url
app.use(
  express.urlencoded({
    extended: true,
    limit: "24kb",
  })
);

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import commentRouter from "./routes/comment.routes.js";


app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/comments", commentRouter);


// app.post('/users', (req,res) => {
//     res.status(200).json({
//         message : "ok"
//     });
// })

export { app };
