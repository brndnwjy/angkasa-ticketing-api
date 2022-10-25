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
  .get("/:id", detailPhoto)
  .post("/:id", upload, insertPhoto, isPhotoTrue)
  .put("/update/:user_id", remove, upload, update);
module.exports = router;
