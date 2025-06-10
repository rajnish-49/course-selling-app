/**
 * Database configuration file
 * Sets up MongoDB connection and defines all data models for the course selling application
 */
const mongoose = require("mongoose");

// Connect to MongoDB Atlas cloud database
// The connection string includes username, password, and cluster information
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajnish_007:25pXn7GtQxnMcQEycluster0.lklmt48.mongodb.net/",
      {
        useNewUrlParser: true, // Use new URL parser to avoid deprecation warnings
        useUnifiedTopology: true, // Use new server discovery and monitoring engine
      }
    );
    console.log("Connected to MongoDB"); // Log success message when connection established
  } catch (err) {
    console.error("MongoDB connection error:", err); // Log any connection errors
  }
};

connectToDatabase();

/**
 * User Schema
 * Represents regular users who can browse and purchase courses
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true, // Ensures no duplicate email addresses
    trim: true, // Removes whitespace from both ends
  },
  password: {
    type: String,
    required: true, // Password is mandatory
  },
  firstName: {
    type: String,
    required: true, // First name is mandatory
    trim: true, // Removes whitespace from both ends
  },
  lastName: {
    type: String,
    required: true, // Last name is mandatory
    trim: true, // Removes whitespace from both ends
  },
});

/**
 * Admin Schema
 * Represents administrators who can create and manage courses
 */
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true, // Ensures no duplicate email addresses
    trim: true, // Removes whitespace from both ends
  },
  password: {
    type: String,
    required: true, // Password is mandatory
  },
  firstName: {
    type: String,
    required: true, // First name is mandatory
    trim: true, // Removes whitespace from both ends
  },
  lastName: {
    type: String,
    required: true, // Last name is mandatory
    trim: true, // Removes whitespace from both ends
  },
});

/**
 * Course Schema
 * Represents courses that can be created by admins and purchased by users
 */
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
    trim: true, // Removes whitespace from both ends
  },
  description: {
    type: String,
    required: true, // Description is mandatory
  },
  price: {
    type: Number, // Stored as a number for easy calculations
    required: true, // Price is mandatory
  },
  imageUrl: {
    type: String, // Optional image URL for course thumbnail
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Admin document
    ref: "Admin", // Points to Admin model
    required: true, // Course must have a creator
  },
});

/**
 * Purchase Schema
 * Represents a relationship between users and courses they've purchased
 * Used to track which users have access to which courses
 */
const purchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Course document
    ref: "Course", // Points to Course model
    required: true, // Purchase must be for a specific course
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User document
    ref: "User", // Points to User model
    required: true, // Purchase must be made by a specific user
  },
  // Could add additional fields like purchaseDate, paymentMethod, etc.
});

// Create Mongoose models from schemas
const User = mongoose.model("User", userSchema); // Collection name will be 'users'
const Admin = mongoose.model("Admin", adminSchema); // Collection name will be 'admins'
const Course = mongoose.model("Course", courseSchema); // Collection name will be 'courses'
const Purchase = mongoose.model("Purchase", purchaseSchema); // Collection name will be 'purchases'

// Export models for use in route handlers and controllers
module.exports = {
  User,
  Admin,
  Course,
  Purchase,
};
