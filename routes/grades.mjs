// routes/grades.mjs
import express from "express";
import mongoose from "../db/mongoose.js";
import Grade from "../db/grade.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (data.student_id) {
      data.learner_id = data.student_id;
      delete data.student_id;
    }
    const result = await Grade.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Grade.findById(req.params.id);
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:id/add", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(
      req.params.id,
      { $push: { scores: req.body } },
      { new: true }
    );
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:id/remove", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(
      req.params.id,
      { $pull: { scores: req.body } },
      { new: true }
    );
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Grade.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/student/:id", (req, res) => {
  res.redirect(`/learner/${req.params.id}`);
});

router.get("/learner/:id", async (req, res) => {
  try {
    const query = { learner_id: Number(req.params.id) };
    if (req.query.class) query.class_id = Number(req.query.class);
    const result = await Grade.find(query);
    if (!result.length) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/learner/:id", async (req, res) => {
  try {
    const result = await Grade.deleteOne({ learner_id: Number(req.params.id) });
    if (!result.deletedCount) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/class/:id", async (req, res) => {
  try {
    const query = { class_id: Number(req.params.id) };
    if (req.query.learner) query.learner_id = Number(req.query.learner);
    const result = await Grade.find(query);
    if (!result.length) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/class/:id", async (req, res) => {
  try {
    const result = await Grade.updateMany(
      { class_id: Number(req.params.id) },
      { $set: { class_id: req.body.class_id } }
    );
    if (!result.modifiedCount) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/class/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({ class_id: Number(req.params.id) });
    if (!result.deletedCount) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
