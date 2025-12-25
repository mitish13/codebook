import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import cors from "cors";
import responseTime from "response-time";
dotenv.config();

const app = express();

//Middlewares are the core part of express
// It is basically 5 diff version

app.use(express.json({ limit: "50mb" }));
// app.use(cors());
//const allowedOrigins = ["https://d2z1wkwnktfscs.cloudfront.net"]; // frontend CloudFront URL
const allowedOrigins = [
  "http://localhost:3000",                      // local frontend
  "https://d2z1wkwnktfscs.cloudfront.net"      // deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server and CloudFront preflight requests (origin==null)
    if (!origin) return callback(null, true);

    // Compare base domain because CloudFront may vary subdomains
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    if (isAllowed) return callback(null, true);

    // Instead of throwing an error → explicitly block with no CORS headers
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// Preflight for all routes
app.options("*", cors());

app.use(
  responseTime(function (req, res, time) {
    var stat = (req.method + req.url)
      .toLowerCase()
      .replace(/[:.]/g, "")
      .replace(/\//g, "_");

    console.log(stat, time);
  })
);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

app.get("/api", (req, res) => {
  res.send("App is running");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT || 8008))
  .then(() => console.log(`Server running on port ${process.env.PORT?process.env.PORT : 8008 }`))
  .catch((err) => console.log(err));
