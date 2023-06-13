const express = require("express");
const router = new express.Router();

const MensRanking = require("../models/mens");

//will handle post req
router.post("/mens", async (req, res) => {
  try {
    const addingMensRecord = new MensRanking(req.body);
    console.log(req.body);
    const insertMen = await addingMensRecord.save();
    res.status(201).send(insertMen);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/mens", async (req, res) => {
  try {
    const getMens = await MensRanking.find({});
    res.send(getMens);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get request for individual
router.get("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getMen = await MensRanking.findById({ _id }).sort({ ranking: 1 });
    res.send(getMen);
  } catch (e) {
    res.status(400).send(e);
  }
});

//updating by patch
router.patch("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getMen = await MensRanking.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    });
    res.send(getMen);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete request
router.delete("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getMen = await MensRanking.findByIdAndDelete(_id);
    res.send(getMen);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
