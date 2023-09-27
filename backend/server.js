import express from "express";
import cors from "cors";
import mongodb from "mongodb";
import dotenv from "dotenv";

import user from "./src/routes/user.route.js";
import UserModel from "./src/model/user.model.js";
import jobs from "./src/routes/jobs.route.js";
import JobsModel from "./src/model/jobs.model.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Configure CORS
const corsOptions = {
    origin: "http://yourfrontenddomain.com", // Replace with frontend domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies and other credentials
};

app.use(cors());
app.use(express.json());

app.use("/user", user);
app.use("/jobs", jobs);
app.get("/", (req, res) => { res.json({ 0: "hello world" }) });
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

const MongoClient = mongodb.MongoClient;
MongoClient.connect(
    process.env.MONGODB_URI,
    {
        maxPoolSize: 50,
    }
)
.catch(err => {
    console.log(`failed to connect to MongoDB: \n${err.stack}`)
    process.exit(1);
})
.then(async client => {
    await UserModel.injectDB(client);
    await JobsModel.injectDB(client);
    console.log(`connected to ${client.options.srvHost}`);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
});
