const express = require("express");

const {
  listUser,
  destroy,
  detailUser,
  insert,
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
  .get("/user/:id", detailUser)
  .get("/user/name/:username", detailName)
  .post("/user/", upload, insert)
  .put("/user/:user_id", remove, upload, update)
  .delete("/user/:user_id", remove, destroy)
  .post("/Register", upload, register)
  .post("/Login", login);
module.exports = router;
