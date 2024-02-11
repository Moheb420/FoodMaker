"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose")); // Import Mongoose
const fs_1 = __importDefault(require("fs"));
const recipemodel_1 = __importDefault(require("../recipemodel")); // Import the RecipeModel
const router = express_1.default.Router();
// Set up the MongoDB connection
const uri = 'mongodb://root:example@localhost:27017/'; // Updated connection string
mongoose_1.default.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); // Cast the options to CustomConnectOptions
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    // You can start using your MongoDB database here
});
// Define your Express routes below
// POST /recipes
router.post('/', async (req, res) => {
    try {
        const recipeData = req.body;
        const recipe = await recipemodel_1.default.create(recipeData);
        res.status(201).json(recipe);
    }
    catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await recipemodel_1.default.find();
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /recipes/:id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await recipemodel_1.default.findById(id);
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error('Error fetching recipe by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// PUT /recipes/:id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const recipeData = req.body;
        const recipe = await recipemodel_1.default.findByIdAndUpdate(id, recipeData, { new: true });
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// DELETE /recipes/:id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await recipemodel_1.default.findByIdAndDelete(id);
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.status(204).end();
    }
    catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/seed', async (req, res) => {
    try {
        // Read the JSON file
        const rawData = fs_1.default.readFileSync('recipes.json', 'utf8');
        const recipesData = JSON.parse(rawData);
        // Insert recipes into the database
        await recipemodel_1.default.insertMany(recipesData);
        res.status(200).json({ message: 'Database seeded successfully' });
    }
    catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=foodmakerEndPoint.js.map