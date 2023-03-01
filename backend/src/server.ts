import express from 'express';
import cors from 'cors';
import { sample_foods, sample_tags } from './data';


const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.get('/api/foods', (req, res) => {
    res.send(sample_foods)
})
app.get('/api/foods/search/:search', (req, res) => {
    const searchTerm = req.params.search;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    res.send(foods)
})

app.get('/api/tags', (req, res) => {
    res.send(sample_tags)
})
app.get('/api/foods/tags/:tags', (req, res) => {
    const tagName = req.params.tags
    const filter = sample_foods.find(food => food.tags?.includes(tagName))
    res.send(filter)
})
app.get('.api/foods/:id', (req, res) => {
    const foodId = req.params.id
    const foodById = sample_foods.find(food => food.id === foodId)
    res.send(foodById)
})
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Website served on http://localhost:" + PORT);
})