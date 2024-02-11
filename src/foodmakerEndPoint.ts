import express, { Request, Response } from 'express';
import mongoose from 'mongoose'; // Import Mongoose
import fs from 'fs';
import RecipeModel from '../recipemodel'; // Import the RecipeModel

const router = express.Router();

// Define custom ConnectOptions type
interface CustomConnectOptions extends mongoose.ConnectOptions {
    useNewUrlParser?: boolean;
}

// Set up the MongoDB connection
const uri = 'mongodb://root:example@localhost:27017/'; // Updated connection string
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as CustomConnectOptions); // Cast the options to CustomConnectOptions

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    // You can start using your MongoDB database here
});

// Define your Express routes below

// POST /recipes
router.post('/', async (req: Request, res: Response) => {
    try {
        const recipeData = req.body;
        const recipe = await RecipeModel.create(recipeData);
        res.status(201).json(recipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /recipes
router.get('/', async (req: Request, res: Response) => {
    try {
        const recipes = await RecipeModel.find();
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /recipes/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recipe = await RecipeModel.findById(id);
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /recipes/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recipeData = req.body;
        const recipe = await RecipeModel.findByIdAndUpdate(id, recipeData, { new: true });
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE /recipes/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recipe = await RecipeModel.findByIdAndDelete(id);
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/seed', async (req: Request, res: Response) => {
    try {
        // Read the JSON file
        const rawData = fs.readFileSync('recipes.json', 'utf8');
        const recipesData = JSON.parse(rawData);

        // Insert recipes into the database
        await RecipeModel.insertMany(recipesData);

        res.status(200).json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default router;
