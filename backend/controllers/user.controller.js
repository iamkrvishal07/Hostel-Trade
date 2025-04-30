const jwt = require('jsonwebtoken');
const User = require('./../models/user.model.js');

// Add a user 
async function addUser(req, res) {
    try {
        let newUser = req.body;
        let user = await User.create(newUser);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Retrieve all users
async function allUsers(req, res) {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Retrieve user based on ID
async function getUserById(req, res) {
    try {
        let { id } = req.params;
        let user = await User.findOne({ _id: id });
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Get user by SIC, number, or email
async function getUserByQuery(req, res) {
    try {
        let { data } = req.params;
        let user = await User.findOne({
            $or: [{ sic: data }, { email: data }, { mobile: data }]
        });

        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Update user by SIC
async function updateUserBySIC(req, res) {
    try {
        let user = req.body;
        let updatedUser = await User.findOneAndUpdate(
            { sic: req.params.sic },
            user,
        );

        if (updatedUser) {
            res.status(200).send(updatedUser);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Delete user by SIC
async function deleteUserBySIC(req, res) {
    try {
        let user = await User.findOneAndDelete({ sic: req.params.sic });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Login User
async function login(req, res) {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } 
        );

        res.send({
            token,
            name: user.name,
            email: user.email,
            id: user._id
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    addUser,
    allUsers,
    getUserById,
    getUserByQuery,
    updateUserBySIC,
    deleteUserBySIC,
    login
};
