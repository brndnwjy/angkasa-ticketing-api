const express = require("express");

const {
  listUser,
  deleteUser,
  detailUser,
  update,
  detailName,
  register,
  login,
} = require("../controller/user/user.controller");
const upload = require("../middleware/upload.user");
const remove = require("../middleware/delete.user");
// const {isAdmin,isCustomer} = require("../middleware/auth.middleware");

const router = express.Router();

router
  .get("/", listUser)
  .get("/:id", detailUser)
  .get("/name/:username", detailName)
  .delete("/delete/:id", deleteUser)
  .post("/login", login)
  .post("/register", register)
  .put("/update/:id", update);
module.exports = router;
