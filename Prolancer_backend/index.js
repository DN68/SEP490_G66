//import express
import express from "express";

//import cors
import cors from "cors"

//import routes
import Router from "./routes/route.js";

//init express
const app = express();

//use express json
app.use(express.json());

//use cors
app.use(cors());

//use router
app.use(Router);

//protected
app.listen(3000, () => {
    console.log("Listening on port 3000");
})