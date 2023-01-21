const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateName, validateEmail } = require("../utils/validators");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isSeller } = req.body;
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(403).json({ err: "User already exists." });
    }
    if (!validateName(name))
      return res.status(400).json({ err: "Name validation failed." });
    if (!validateEmail(email))
      return res.status(400).json({ err: "Email validation failed." });
    const hashPswd = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      isSeller,
      password: hashPswd,
    };
    const createUser = await User.create(newUser);
    return res.status(201).json({ message: `Welcome ${createUser.name}` });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length == 0) {
      return res.status(400).json({
        err: "Please provide email.",
      });
    }
    if (password.length == 0) {
      return res.status(400).json({
        err: "Please provide password.",
      });
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({
        err: "Wrong Credentials.",
      });
    }
    const passMatch = await bcrypt.compare(password, userExist.password);
    if (!passMatch) {
      return res.status(400).json({
        err: "Email or password you entered is wrong.",
      });
    }
    const payload = {
      user: {
        id: userExist.id,
      },
    };
    const token = await jwt.sign(payload, "secret message", {
      expiresIn: 500000,
    });
    res.cookie("b", token, {
      expire: new Date() + 5000,
    });
    res.status(200).json({ token });
  } catch (e) {
    console.log(">>>>>>", e);
    return res.status(500).send(e);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("b");
    res.status(200).json({ message: "cookie deleted." });
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
