const { validationResult } = require("express-validator");
const Notes = require("../model/Notes");

const fetchAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error in fetchAllNotes:", error.message);
    res.status(500).send("Internal server error");
  }
};

const addNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error("Error in addNote:", error.message);
    res.status(500).send("Internal server error");
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    console.error("Error in updateNote:", error.message);
    res.status(500).send("Internal server error");
  }
};

const deleteNote = async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been successfully deleted", note });
  } catch (error) {
    console.error("Error in deleteNote:", error.message);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  fetchAllNotes,
  addNote,
  updateNote,
  deleteNote,
};
