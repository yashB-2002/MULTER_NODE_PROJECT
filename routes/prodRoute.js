const express = require("express");
const router = express.Router();
const uploadFile = require("../utils/uploadFile");
const { isAuthenticated, isSeller } = require("../middlewares/auth");
router.post("/create", isAuthenticated, isSeller, async (req, res) => {
  uploadFile(req, res, async (err) => {
    if (err) {
      console.log(">>>", err);
      return res.status(500).send(err);
    }
    const { name, price } = req.body;
    if (!name || !price || !req.file) {
      return res.status(400).json({ err: "All details required." });
    }
    if (Number.isNaN(price)) {
      return res.status(400).json({ err: "Price should be numeric." });
    }
    let prodDetails = {
      name,
      price,
      content: req?.file?.path,
    };
    return res.status(200).json({
      status: "ok",
      prodDetails,
    });
  });
});

module.exports = router;
