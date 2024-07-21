const User = require("../models/User");
const Exercise = require("../models/Exercise");
const { ObjectId } = require("mongodb");

const createExercise = async (req, res) => {
    const { _id } = req.params;
    const { date, duration, description } = req.body;

    try {
        // Ensure the provided ID is a valid ObjectId
        if (!ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const existingUser = await User.findById(_id);

        if (!existingUser) {
            return res.status(404).json({ message: "No user exists with that ID" });
        }

        let formattedDate;
        if (!date) {
            const d = new Date();
            formattedDate = d.toDateString();
        } else {
            formattedDate = new Date(date).toDateString();
        }

        // Create new exercise
        const newExercise = new Exercise({
            username: existingUser.username,
            date: formattedDate,
            duration,
            description,
        });

        await newExercise.save();
        res.status(200).json( newExercise );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the exercise" });
    }
};

module.exports = { createExercise };
