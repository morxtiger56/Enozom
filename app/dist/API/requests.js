"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Endpoint for user registration
app.post('/register', (req, res) => {
    // Retrieve the incoming data from the request body
    const { username, password } = req.body;
    // Perform your registration logic here, such as saving the user to a database
    // For simplicity, let's assume the registration always succeeds
    // You can replace this logic with your own implementation, like connecting to a database and saving the user information
    // Return a response to the front end based on the registration result
    const message = 'Successfully added the user'; // Success message
    res.status(200).json({ message }); // Send the response as JSON
});
// Endpoint for user sign-in
app.post('/signIn', (req, res) => {
    // Retrieve the incoming data from the request body
    const { username, password } = req.body;
    console.log('sign in');
    const message = 'Successfully signed in'; // Success message
    res.status(200).json({ message }); // Send the response as JSON
});
// Endpoint for user sign-out
app.get('/signout', (req, res) => {
    // Perform sign-out logic here
    // For example, clear session data or delete authentication tokens
    // Assuming sign-out is successful, send a response indicating success
    res.status(200).send('Successfully signed out');
});
// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
//# sourceMappingURL=requests.js.map