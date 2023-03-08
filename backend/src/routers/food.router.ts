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
        console.log(food)
    res.send(food)
    }))

router.get('/search/:search', asyncHandler(async (req:any, res:any) => {
    const searchRegex = new RegExp(req.params.search, 'i')
    const food = await FoodModel.find({ name: { $regex: searchRegex } })
    res.send(food)
}))

router.get('/tags', asyncHandler(async (req: any, res: any) => {
    const tags = FoodModel.aggregate([
        {
            $unwind : '$tags'
        }])

    res.send(sample_tags)
}))
router.get('/tag/:tag', (req, res) => {
    const tagName = req.params.tag
    const filter = sample_foods.filter(food => food.tags.includes(tagName))
    res.send(filter)
})
router.get('/:id', (req, res) => {
    const foodId = req.params.id
    const foodById = sample_foods.find(food => food.id === foodId)
    res.send(foodById)
})



export default router
