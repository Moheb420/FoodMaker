import mongoose, { Schema, Document } from 'mongoose';

// Define the Nutrients interface
interface Nutrients {
    kcal?: string;
    fat?: string;
    saturates?: string;
    carbs?: string;
    sugars?: string;
    fibre?: string;
    protein?: string;
    salt?: string;
}

// Define the Times interface
interface Times {
    Preparation: string;
    Cooking: string;
}

// Define the Recipe interface extending from Document
interface Recipe extends Document {
    id: string;
    url: string;
    image: string;
    name: string;
    description: string;
    author: string;
    ratings: number;
    ingredients: string[];
    steps: string[];
    nutrients: Nutrients;
    times: Times;
    serves: number;
    difficult: string;
    vote_count: number;
    subcategory: string;
    dish_type: string;
    maincategory: string;
}

// Create a new Mongoose schema for Recipe
const recipeSchema = new Schema<Recipe>({
    id: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    ratings: { type: Number, required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    nutrients: { type: Object, required: true },
    times: { type: Object, required: true },
    serves: { type: Number, required: true },
    difficult: { type: String, required: true },
    vote_count: { type: Number, required: true },
    subcategory: { type: String, required: true },
    dish_type: { type: String, required: true },
    maincategory: { type: String, required: true }
});

// Create the Recipe model
const RecipeModel = mongoose.model<Recipe>('Recipe', recipeSchema);

export default RecipeModel;
