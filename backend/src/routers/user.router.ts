import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
import jwt from 'jsonwebtoken'
import { sample_users } from "../data";
const router = Router()

router.get('/seed', asyncHandler(
    async (req, res: any) => {
        const UserCount = await UserModel.countDocuments()
        if (UserCount > 0) {
            res.send("Seed was already done")
        } else {
            await UserModel.create(sample_users)
            res.send("Seed is done!")
        }
    }))

router.post("/login", asyncHandler(
   async (req:any, res:any)=> {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email, password })
        if (user) {
            console.log(generateTokenResponse(user));

            res.send(generateTokenResponse(user))
        } else {
            res.status(400).send("User name or password is not valid"!)
        }
    }
))
const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "dontChangeThis", { expiresIn: "30d" });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    }
}

export default router;

