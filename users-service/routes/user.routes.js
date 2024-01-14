const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const userController = require("../controllers/user.controller");

// Ruta para crear un usuario (POST: "api/auth/createuser", No se requiere autenticación)
router.post(
  "/createuser",
  [
    body("name", "Must contain min 3 letters").isLength({ min: 3 }),
    body("email", "Enter the valid Email").isEmail(),
    body("password", "Must contain min 5 letters").isLength({ min: 5 }),
  ],
  userController.createUser
);

// Ruta para iniciar sesión (POST: "api/auth/Login", No se requiere autenticación)
router.post(
  "/login",
  [
    body("email", "Enter the valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  userController.login
);

// Ruta para obtener detalles del usuario autenticado (POST: "api/auth/getuser", Se requiere autenticación)
router.post("/getuser", fetchUser, userController.getUser);

module.exports = router;
