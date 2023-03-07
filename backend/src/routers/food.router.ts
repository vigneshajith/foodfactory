import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
const router = Router();

router.get('/', (req, res) => {  
    res.send(sample_foods)
})
router.get('/search/:search', (req, res) => {
    const searchTerm = req.params.search;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    res.send(foods)
})

router.get('/tags', (req, res) => {
    res.send(sample_tags)
})
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
