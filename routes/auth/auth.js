const express = require("express")
const authRouter = express.Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const salt = bcrypt.genSaltSync(10);
const secret = 'd3123u12buibduwub32u12b31u2b31iu2beib12o3b';

authRouter.route("/register").post(async (req,res) => {
    const {username,password} = req.body;
    try{
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // A user with this username already exists
            return res.status(409).json({ error: 'Username already taken' });
        }
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        });
        res.redirect("/login");
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
    }
});

authRouter.route("/login").post(async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});

    if (!userDoc) {
        return res.status(400).json('Wrong credentials. There is no username like this');
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('wrong credentials');
    }
});

authRouter.route("/logout").post(async (req,res) => {
    res.cookie('token', '').json('ok');
});


module.exports = authRouter