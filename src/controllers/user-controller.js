const express = require("express");
const router = express.Router();
const dbContext = require('../contexts/dbcontext');

// Get all users
router.get("/getall", async(req, res) => {

    let getAllTSQL = "SELECT * FROM ProgEksamen.Users"
    let result = await dbContext.executeSQL(getAllTSQL, null)

    res.status(200).json(result);
});

// Get first
router.get("/getfirst", async(req, res) => {

    let getAllTSQL = "SELECT TOP(1) * FROM ProgEksamen.Users"
    let result = await dbContext.executeSQL(getAllTSQL, null)

    res.status(200).json(result);
});

// // create user
// router.post("/create", (req, res) => {
//   let user = new userModel(req.body.email, req.body.password, req.body.userId);
//   db.saveUser(user);
//   res.status(200).send(true);
// });

module.exports = router;