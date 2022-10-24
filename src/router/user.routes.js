const express = require("express");

const {
  listUser,
  destroy,
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
  .get("/name/:username", detailNamegit s)
  .delete("/user/:user_id", remove, destroy)
  .post("/login", login)
  .post("/register", upload, register)
  .put("/update/:user_id", remove, upload, update);
module.exports = router;
