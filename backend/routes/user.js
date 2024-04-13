const express = require("express");
const router = express.Router();
const { userSchema, SignSchema, updateSchema } = require("../validation/zod");

const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const authmiddleware = require("../middlewares/authmiddle");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const data = req.body;
  console.log(data);

  const { success } = userSchema.safeParse(data);

  if (!success) {
    return res.status(400).json({ error: "Invalid data" });
  }
  const user = await User.findOne({
    username: data.username,
  });

  if (user) {
    return res.json({
      message: "email already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(data.password, salt);

  const dbUser = await User.create({
    username: data.username,
    password: hashpassword,
    firstName: data.firstName,
    lastName: data.lastName,
  });
  console.log(dbUser);

  /// ----- Create new account ------

  await Account.create({
    userId: dbUser._id,
    balance: 1 + Math.random() * 10000,
  });

  /// -----

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "user created successfully",
    token: token,
    db: dbUser,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = SignSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: "Invalid data" });
  }
  const user = await User.findOne({
    username: req.body.username,
  });
  console.log(user);

  if (!user) {
    return res.json({
      message: "Invalid username ",
    });
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "user signed in successfully",
    token: token,
  });
});

router.put("/", authmiddleware, async (req, res) => {
  const data = req.body;
  const { success } = updateSchema.safeParse(data);
  if (!success) {
    return res.status(400).json({ error: "wrong input data" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(data.password, salt);
  const updateUserData = await User.updateOne(
    { _id: req.userId },
    {
      password: hashpassword,
      firstName: data.firstName,
      lastName: data.lastName,
    }
  );
  res.status(200).json({ message: "user updated successfully" });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
