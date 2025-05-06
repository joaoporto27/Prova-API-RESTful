const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const apiKeyMiddleware = require("../config/apiKey");
const upload = require("../config/upload.js");

router.use(apiKeyMiddleware);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", upload.single("photo"), userController.createUser);
router.put("/:id", upload.single("photo"), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;