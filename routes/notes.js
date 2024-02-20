const express = require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/notesController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth,  getNote);
router.post("/", auth,createNote );
router.delete("/:id", auth, deleteNote);
router.put("/:id", auth, updateNote);

module.exports = router;
