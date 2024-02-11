import express from "express";
import recipeRouter from './foodmakerEndPoint'; // Use ES6 import syntax

const app = express();

app.use('/recipes', recipeRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
