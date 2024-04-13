const express = require("express");

const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");

router.use("/user", userRouter); // /api/v1/user
router.use("/account", accountRouter); // /api/v1/account

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
