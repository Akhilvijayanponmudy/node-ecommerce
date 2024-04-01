const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
mongoose.connect(`mongodb+srv://akhilv:Vth9V8RiALZKLOYq@akhilvijayan.79nyak4.mongodb.net/`)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});