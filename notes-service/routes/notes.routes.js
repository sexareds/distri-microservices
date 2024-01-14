const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

const notesController = require("../controllers/notes.controller");

// Ruta para obtener todas las notas del usuario autenticado (GET: "api/notes/fetchallnotes", Se requiere autenticación)
router.get("/fetchallnotes", fetchUser, notesController.fetchAllNotes);

// Ruta para agregar una nota (POST: "api/notes/addnote", Se requiere autenticación)
router.post("/addnote", fetchUser, [
  body("title", "Must contain min 3 letters").isLength({ min: 3 }),
  body("description", "Must contain min 5 letters").isLength({ min: 5 }),
], notesController.addNote);

// Ruta para actualizar una nota (PUT: "api/notes/updatenote/:id", Se requiere autenticación)
router.put("/updatenote/:id", fetchUser, notesController.updateNote);

// Ruta para eliminar una nota (DELETE: "api/notes/deletenote/:id", Se requiere autenticación)
router.delete("/deletenote/:id", fetchUser, notesController.deleteNote);

module.exports = router;
