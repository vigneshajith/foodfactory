import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import bodyparser from 'body-parser'

import {sample_tags, sample_users } from './data';
import foodRouter from './routers/food.router'

import asyncHandler from "express-async-handler";
import { UserModel } from './models/user.model';
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
    
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    
}))
app.use("/api/foods", foodRouter)
app.get('/api/users/seed', asyncHandler(
    async (req, res: any) => {
        const UserCount = await UserModel.countDocuments()
        if (UserCount > 0) {
            res.send("Seed was already done")
        } else {
            await UserModel.create(sample_tags)
            res.send("Seed is done!")
        }
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


