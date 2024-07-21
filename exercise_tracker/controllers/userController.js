const User = require("../models/User");
const Exercise = require("../models/Exercise");
const { ObjectId } = require("mongodb");

const createUser = async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ "message": "Enter username in request" });
    }
    const newUser = new User({ username });
    await newUser.save();
    if (newUser) {
        console.log(newUser);
        return res.status(200).json({ "username": newUser.username, "_id": newUser._id });
    }
};

const findAllUsers = async (req, res) => {
    const users = await User.find({});
    return res.status(200).json(users);
};

const getLogs = async (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    try {
        // Ensure the provided ID is a valid ObjectId
        if (!ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Find the user by ID
        const creator = await User.findById(_id);
        if (!creator) {
            return res.status(404).json({ message: "No user exists with that ID" });
        }

        // Build the query for exercises
        let query = { _id };

        if (from || to) {
            query.date = {};
            if (from) query.date.$gte = new Date(from);
            if (to) query.date.$lte = new Date(to);
        }

        // Find exercises based on the query and limit
        let userCises = await Exercise.find(query).limit(parseInt(limit) || 0);

        // Ensure proper formatting and data types
        userCises = userCises.map(exercise => ({
            description: exercise.description,
            duration: exercise.duration,
            date: new Date(exercise.date).toDateString() // Ensure date is in Date API format
        }));

        const uLog = {
            username: creator.username,
            count: userCises.length,
            _id,
            log: userCises
        };

        return res.status(200).json(uLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while retrieving logs" });
    }
};

module.exports = { createUser, findAllUsers, getLogs };
