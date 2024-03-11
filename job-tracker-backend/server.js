import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./src/routes/user.route.js";
import jobsRouter from "./src/routes/jobs.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());

// Configure CORS
const corsOptions = {
    origin: "http://localhost:3000", // Replace with frontend domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies and other credentials
};

app.use(cors(corsOptions)); // TODO: after frontend
//app.use(cors());
app.use(express.json());

// Use the user and jobs routers
app.use("/user", userRouter);
app.use("/jobs", jobsRouter);

app.get("/", (req, res) => {
    res.json({ 0: "hello world" });
});

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// Connect to MongoDB using Mongoose
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "main",
    })
    .then(() => {
        console.log("Connected to MongoDB");

        // Start the Express server after connecting to the database
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error(`Failed to connect to MongoDB: ${err}`);
        process.exit(1);
    });
