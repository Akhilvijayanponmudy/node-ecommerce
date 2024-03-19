const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Adjust the path as needed


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Dummy user data
const userData = [
  {
    username: 'akhil',
    email: 'akhilvijayanponmudy@gmail.com',
    password: 'admin',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2',
  },
  // Add more dummy users as needed
];

// Seed function
const seedUsers = async () => {
  try {
    // Delete existing users
    await User.deleteMany();

    // Hash passwords and create users
    const salt = await bcrypt.genSalt(10);
    const hashedUserData = userData.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, salt),
    }));

    // Insert users into the database
    await User.insertMany(hashedUserData);

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

// Run the seed function
seedUsers();
