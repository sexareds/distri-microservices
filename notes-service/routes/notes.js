const express = require("express");
const router = express.Router();
const Notes = require("../model/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : Fetching all the notes  using GET : "api/notes/fetchallnotes" Login required

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    //Find the note of requested user id
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //another error as internal server error
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2 : Adding Note  using POST : "api/notes/addnote" Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Must contain min 3 letters").isLength({ min: 3 }),
    body("description", "Must contain min 5 letters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const result = validationResult(req);
      //if Details are not valid
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      //another error as internal server error
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3 : Updatinging Note  using PUT : "api/notes/updatenote/:id" Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      //Find the note to update and update it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allow");
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    }
  } catch (error) {
    //another error as internal server error
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 3 : Deleting Note  using DELETE : "api/notes/deletenote/:id" Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  //Find the note to update and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allow");
  }
  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ success: "note has been succesfully deleted", note: note });
});

module.exports = router;
