const express = require("express");
const router = express.Router();
var TYPES = require('tedious').TYPES;
const dbContext = require('../contexts/dbcontext');

// Get all users
router.get("/getall", async(req, res) => {

    let getAllTSQL = "SELECT * FROM ProgEksamen.Users"
    let result = await dbContext.executeQuery(getAllTSQL, null)

    res.status(200).json(result);
});

// Get first
router.get("/getfirst", async(req, res) => {

    let getAllTSQL = "SELECT TOP(1) * FROM ProgEksamen.Users"
    let result = await dbContext.executeQuery(getAllTSQL, null)

    res.status(200).json(result);
});

// Create user
router.post("/create", async(req, res) => {
    var username = req.body?.username ?? null;
    var password = req.body?.password ?? null;
    var email = req.body.email ?? null;
    var userlevel = req.body?.userlevel ?? null;
    var followedads = req.body?.followedads ?? null;

    if (username === null || password === null || email === null || userlevel === null || followedads === null) res.status(500).send('ERROR IN BODY');

    let createUserTSQL = "INSERT INTO ProgEksamen.Users (ID, Username, Password, Email, Userlevel, Followed_ads) VALUES ((SELECT TOP(1) ID FROM [ProgEksamen].[Users] ORDER BY ID DESC) + 1, @username, @password, @email, @userlevel, @followedads)"
    let result = await dbContext.executeNonQuery(createUserTSQL, [
        ['username', TYPES.Text, username],
        ['password', TYPES.Text, password],
        ['email', TYPES.Text, email],
        ['userlevel', TYPES.Int, userlevel],
        ['followedads', TYPES.Int, followedads]
    ])

    res.status(200).json(result);
});

module.exports = router;