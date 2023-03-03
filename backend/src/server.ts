import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import bodyparser from 'body-parser'
import { sample_foods, sample_tags, sample_users } from './data';


const app = express();
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
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

app.get('/api/foods/tags', (req, res) => {
    res.send(sample_tags)
})
app.get('/api/foods/tag/:tag', (req, res) => {
    const tagName = req.params.tag
    const filter = sample_foods.filter(food => food.tags.includes(tagName))
    res.send(filter)
})
app.get('/api/foods/:id', (req, res) => {
    const foodId = req.params.id
    const foodById = sample_foods.find(food => food.id === foodId)
    res.send(foodById)
})

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