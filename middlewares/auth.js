const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; //! Bearer {Token}
    if (!authHeader) {
      return res.status(401).json({ err: "Authorization header not found." });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ err: "Token not found." });
    }
    const isVerified = jwt.verify(token, "secret message"); //! object is returned which we have used in payload
    const isUser = await User.findOne({
      where: {
        id: isVerified.user.id,
      },
    });
    if (!isUser) {
      return res.status(404).json({ err: "User not found." });
    }
    req.user = isUser; //! this will enhance performance by not calling db again in isSeller middleware
    next(); // ! call isSeller after this
  } catch (e) {
    return res.status(500).send(e);
  }
};

const isSeller = async (req, res, next) => {
  try {
    if (req.user.dataValues.isSeller) {
      next();
    } else {
      return res.status(404).json({ err: "No, you are not seller" });
    }
  } catch (error) {
    return res.status(500).send(e);
  }
};

module.exports = { isAuthenticated, isSeller };
