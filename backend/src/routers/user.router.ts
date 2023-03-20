import { Router } from "express";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { sample_users } from "../data";
import { BAD_REQ } from "../constance/http_status";
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
        
        const user = await UserModel.findOne({ email })
        if (user && await bcrypt.compare(password,user.password)) {
            res.send(generateTokenResponse(user))
        } else {
            res.status(BAD_REQ).send("User name or password is not valid"!)
        }
    }
))

router.get("/allUser", asyncHandler(async (req: any, res: any) => {
    // await UserModel.deleteOne({ email: "ajithajith@gmail.com" }).then(
    //     () => { console.log("deleted") },
    //     (err)=>{console.log(err)}
    // )
    const allUser = await UserModel.find()
    res.send(allUser)
}))
router.post("/register", asyncHandler(

    async (req: any, res: any) => {
        const { name, email, password, address } = req.body;
        const existUser = await UserModel.findOne({email})
        if (existUser) {
            res.status(BAD_REQ).send("User is already exist, please try to Login");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser:User = {
            id: "",
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser))
    }
))
const generateTokenResponse = (user: any) => {
    const token = jwt.sign(
        {
        id:user.id,
        email: user.email,
        isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET!, { expiresIn: "30d" });
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

