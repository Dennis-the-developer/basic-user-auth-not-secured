import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import expressOasGenerator from "express-oas-generator";
import { dbconnection } from "./config/db.js";


// Connect to express app
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    mongooseModels: mongoose.modelNames(),
});

// Database connection
dbconnection();

app.use(express.json());

// Use routes
app.use(userRouter);
// API DOCS
expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect('/api-docs/'));


const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
