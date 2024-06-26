const User = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const token = require ("../helpers/token");

/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */
const userPost = async (req, res) => {
    const { password, ...userData } = req.body;
    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ ...userData, password: encryptedPassword });
    const bodyToken = {
        name: req.body.name,
        email: req.body.email,
        role: "user",
      };
  
    const tokenSession = await token.tokenSing(bodyToken, '1d');
    await newUser.save()
        .then(user => {
            res.status(201); // CREATED
            res.header({
                'location': `/api/users/?id=${user.id}`
            });
            res.json( {user, tokenSession });
        })
        .catch(err => {
            res.status(422);
            console.log('error while saving the user', err);
            res.json({
                error: 'There was an error saving the user'
            });
        });
};

/**
 * Get all users or one
 *
 * @param {*} req
 * @param {*} res
 */
const userGet = (req, res) => {
    if (req.query && req.query.id) {
        User.findById(req.query.id)
            .then(user => {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404);
                    res.json({ error: "User doesn't exist" });
                }
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    } else {
        User.find()
            .then((users) => {
                res.json(users);
            })
            .catch(err => {
                res.status(422);
                console.log('error while querying the users', err)
                res.json({ error: "Error fetching users" })
            });
    }
};

/**
 * Updates a user
 *
 * @param {*} req
 * @param {*} res
 */
const userPut = async (req, res) => {
    
    if (!req.params.id) {
        res.status(400);
        res.json({ error: "Missing ID parameter" });
        return;
    }
    const { password, ...userData } = req.body;
    const encryptedPassword = bcryptjs.hashSync(password, 10);
    User.findByIdAndUpdate(req.params.id, { ...userData, password: encryptedPassword }, { new: true })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404);
                res.json({ error: "User doesn't exist" });
            }
        })
        .catch(err => {
            res.status(422);
            console.log('error while updating the user', err);
            res.json({ error: "There was an error updating the user" });
        });
};

/**
 * Deletes a user
 *
 * @param {*} req
 * @param {*} res
 */
const userDelete = async (req, res) => {
    if (!req.params.id) {
        res.status(400);
        res.json({ error: "Missing ID parameter" });
        return;
    }

    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (user) {
                res.json({ message: "User successfully deleted" });
            } else {
                res.status(404);
                res.json({ error: "User doesn't exist" });
            }
        })
        .catch(err => {
            res.status(422);
            console.log('error while deleting the user', err);
            res.json({ error: "There was an error deleting the user" });
        });
};

module.exports = {
    userPost,
    userGet,
    userPut,
    userDelete
}