const express = require("express");
const { signin, signup } = require("../controllers/userControllers");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);


module.exports = router;
