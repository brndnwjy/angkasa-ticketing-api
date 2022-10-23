/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const userModel = require("../../models/user.model");
const { failed, success,succesWithToken } = require("../../helper/response.helper");
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
    userModel
      .selectDetail(id)
      .then((result) => {
        success(res, result, "success", "by id user success");
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message, "failed", "by id user failed");
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
  insert: (req, res) => {
    // const user_id = uuidv4();
    // eslint-disable-next-line camelcase
    const avatar = req.file.filename;
    const { username, email, phone, city, address, postcode, password } =
      req.body;
    userModel
      .store(
        username,
        email,
        phone,
        city,
        address,
        postcode,
        password,
        avatar
      )
      .then((result) => {
        res.json("Account added successfully");
      })
      .catch((err) => {
        res.json(err);
      });
  },
  update: (req, res) => {
    const id = req.params.user_id;
    const avatar = req.file.filename;
    // eslint-disable-next-line camelcase
    const { username, email, phone, city, address, postcode, password } =
      req.body;
    const data = {
      id,
      username,
      email,
      phone,
      city,
      address,
      postcode,
      password,
      avatar,
    };
    userModel
      .updateAccount(
        id,
        username,
        email,
        phone,
        city,
        address,
        postcode,
        password,
        avatar
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
  destroy: (req, res) => {
    userModel
      .delete(req.params.user_id)
      .then((result) => {
        res.json("Account Deleted");
      })
      .catch((err) => {
        res.json(err);
      });
  },
  register: (req, res) => {
    try {
      const { username, email, phone, city, address, postcode, password } =
        req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "fail hash password");
        }
        const data = {
          username,
          email,
          phone,
          city,
          address,
          postcode,
          password: hash,
          
        };
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
  login: async (req, res) => {
    const {email, password} = req.body;
    userModel.checkUEmail(email).then((result) => {
        // console.log(res.rows[0]);
        const user = result.rows[0];
        if(result.rowCount > 0) {
            bcrypt.compare(password, result.rows[0].password).then(async (result) => {
                if(result) {
                    const token = await jwtToken({
                      email: user.email,
                        level: user.level
                    });
                    // console.log(token);
                    // delete
                    succesWithToken(res, {token, data:user}, "success", "login success");
                } else {
                    // ketika password salah
                    failed(res, null, "failed", "username or password is wrong");
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
