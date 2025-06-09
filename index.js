import express from 'express';
import cors from "cors"
import connectToMongo from './config/db.js';
import router from './routes/blog.js';
const app = express();
const port = 9000;
connectToMongo();
app.use(cors());
app.use(express.json());

app.use(express.static("public/upload"))

app.get("/", (req,res) => {
    res.send("running");
} );

//routes

app.use("/api/v1", router)

app.listen(port, () =>{
    console.log("listening on port 9000");
})
