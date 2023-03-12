import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser'
import foodRouter from './routers/food.router'
import userRouter from './routers/user.router';
import { dbConnect } from './configs/database.config';
dbConnect();


const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
    credentials: true,
    "origin": "http://localhost:4200",
}))

app.use("/api/foods", foodRouter)
app.use("/api/users", userRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Website served on http://localhost:" + PORT);
})


