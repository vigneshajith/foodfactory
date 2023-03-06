import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import bodyparser from 'body-parser'

import {sample_users } from './data';
import foodRouter from './routers/food.router'


import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();

app.use("/api/foods", foodRouter)

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))





app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;

    const user = sample_users.find(user => user.email == email && user.password == password);
    if (user) {
        res.send(generateTokenResponse(user))
    } else {
        res.status(400).send("User name or password is not valid"!)
    }
})
const generateTokenResponse = (user: any)=>{
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "dontChangeThis", { expiresIn: "30d" });
    user.token = token;
    return user;
}
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Website served on http://localhost:" + PORT);
})