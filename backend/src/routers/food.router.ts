import { Router } from "express";
import asyncHandler from "express-async-handler";
import { sample_foods, sample_tags } from "../data";
import { FoodModel } from "../models/food.model";
const router = Router();


router.get('/seed', asyncHandler(
    async (req, res: any) => {
        const foodCount = await FoodModel.countDocuments()
        if (foodCount > 0) {
            res.send("Seed was already done")
        } else {
             await FoodModel.create(sample_foods)
            res.send("Seed is done!")
        }
    }))

router.get('/', asyncHandler(
    async (req, res: any) => {
        const food = await FoodModel.find()
    res.send(food)
    }))

router.get('/search/:search', asyncHandler(async (req:any, res:any) => {
    const searchRegex = new RegExp(req.params.search, 'i')
    const food = await FoodModel.find({ name: { $regex: searchRegex } })
    res.send(food)
}))

router.get('/tags', asyncHandler(async (req: any, res: any) => {
    const tags = await FoodModel.aggregate([
        {
            $unwind : '$tags'
        }, {
            $group: {
                _id: '$tags',
                count:{$sum:1}
            }
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                count:'$count'
            }
        }
    ]).sort({ count: -1 })
    
    const all = {
        name: 'All',
        count: await FoodModel.countDocuments()
    }
    tags.unshift(all);
    res.send(tags)
}))
router.get('/tag/:tag', asyncHandler(
    async (req:any, res:any) => {
    const foods = await FoodModel.find({tags:req.params.tag})
    res.send(foods)
}))
router.get('/:id', asyncHandler(
    async (req: any, res: any) => {
        const foods = await FoodModel.findById(req.params.id)
    res.send(foods)
    }
))





export default router
