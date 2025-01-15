const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample food items data
const foodItems = [
    { id: 1, name: 'Paneer Butter Masala', price: 250, category: 'Main Course' },
    { id: 2, name: 'Veg Biryani', price: 200, category: 'Rice' },
    { id: 3, name: 'Masala Dosa', price: 120, category: 'Breakfast' },
    { id: 4, name: 'Pav Bhaji', price: 150, category: 'Snacks' },
    { id: 5, name: 'Chole Bhature', price: 180, category: 'Main Course' },
    { id: 6, name: 'Rajma Chawal', price: 160, category: 'Main Course' },
    { id: 7, name: 'Aloo Paratha', price: 100, category: 'Breakfast' },
    { id: 8, name: 'Gulab Jamun', price: 90, category: 'Dessert' },
    { id: 9, name: 'Samosa', price: 20, category: 'Snacks' },
    { id: 10, name: 'Paneer Tikka', price: 220, category: 'Starter' }
];

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Food API!');
});

// Get all food items
app.get('/food', (req, res) => {
    res.json(foodItems);
});

// Get a specific food item by ID
app.get('/food/:id', (req, res) => {
    const foodId = parseInt(req.params.id);
    const foodItem = foodItems.find(item => item.id === foodId);

    if (foodItem) {
        res.json(foodItem);
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
});

// Add a new food item (POST route)
app.post('/food', (req, res) => {
    const newFood = req.body;

    // Generate a new ID based on the current list length
    newFood.id = foodItems.length + 1;

    foodItems.push(newFood);
    res.status(201).json({ message: 'Food item added successfully', food: newFood });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
