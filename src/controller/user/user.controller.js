/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const userModel = require("../../model/user/user.model");
const { failed, success, succesWithToken } = require("../../helper/response.helper");
const bcrypt = require("bcryptjs");
const jwtToken = require("../../helper/auth.helper");

const userController = {
  // method
  listUser: (req, res) => {
    userModel
      .selectAll()
      .then((result) => {
        success(res, result, "success", "get all user succes");
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message, "failed", "get all user failed");
      });
  },
  detailUser: (req, res) => {
    const id = req.params.id;
    console.log(id)
    userModel
      .selectDetail(id)
      .then((result) => {
        success(res, result, "success", "request by id user success");
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message, "failed", "request by id user failed");
      });
  },
  detailName: (req, res) => {
    const name = req.params.username;
    userModel
      .nameDetail(name)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  register: (req, res) => {
    try {
      const { username, email, phone, password } = req.body;

      console.log(username + " " + email + " " + phone + " " + password)
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "fail hash password");
        }
        console.log("ini di controller")

        const data = {
          username,
          email,
          phone,
          password: hash,
        };
        console.log(username + " " + email + " " + phone + " " + password)
        userModel
          .register(data)
          .then((result) => {
            success(res, result, "success", "register success");
          })
          .catch((err) => {
            failed(res, err.message, "failed", "register fail");
          });
      });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
  update: (req, res) => {
    const user_id = req.params.id;
    // eslint-disable-next-line camelcase
    const {
      username,
      phone,
      city,
      address,
      postcode, } = req.body;
    const data = {
      user_id,
      username,
      phone,
      city,
      address,
      postcode,
    };
    userModel
      .updateAccount(
        user_id,
        username,
        phone,
        city,
        address,
        postcode,
      )
      .then((results) => {
        if (Object.keys(data).length >= 1) {
          success(res, data, "success", "data has been update");
        } else {
          failed(res, "failed", "failed to update data");
        }
      })
      .catch((err) => {
        // res.json(err);
        failed(res, err.message, "failed", "internal server error");
      });
  },
  deleteUser: (req, res) => {
    const user_id = req.params.id;
    userModel
      .deleteUser(user_id)
      .then(() => {
        console.log('success')
        success(res, "success", "data has been deleted");
      })
      .catch((err) => {
        console.log('gagal')
        failed(res, err.message, "failed", "internal server error");
      });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(email +" "+ password)
    userModel.checkUEmail(email)
    .then((result) => {
      // console.log(res.rows[0]);
      const user = result.rows[0];
      console.log(user)
      if (result.rowCount > 0) {
        bcrypt.compare(password, result.rows[0].password).then(async (result) => {
          if (result) {
            const token = await jwtToken({
              email: user.email,
              level: user.level
            });
            // console.log(token);
            // delete
            succesWithToken(res, { token, data: user }, "success", "login success");
          } else {
            // ketika password salah
            failed(res, null, "failed", "email or password is wrong");
          }
        });
      } else {
        //ketika username salah
        failed(res, null, "failed", "username wrong");
      }
    }).catch((err) => {
      failed(res, err, "failed", "internal server error");
    });
  }
};

module.exports = userController;
