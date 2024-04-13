const express = require("express");
const { Account } = require("../db");
const mongoose = require("mongoose");
const authmiddleware = require("../middlewares/authmiddle");
const router = express.Router();

router.get("/balance", authmiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  res.status(200).json({ balance: account.balance });
});

router.post("/transfer", authmiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: to }).session(session);
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Invalid account" });
  }
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } } //increament
  ).session(session);
  await session.commitTransaction();
  res.json({ message: "Transfer successful" });
});

module.exports = router;
