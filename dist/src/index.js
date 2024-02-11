"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodmakerEndPoint_1 = __importDefault(require("./foodmakerEndPoint")); // Use ES6 import syntax
const app = (0, express_1.default)();
app.use('/recipes', foodmakerEndPoint_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map