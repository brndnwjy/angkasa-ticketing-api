/* eslint-disable camelcase */
const uuid = require("uuid");
const pool = require("../../config/db");
const userModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users ORDER BY username ASC", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users where user_id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  nameDetail: (username) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE  username ILIKE '%${username}%'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  // router - insert
  store: (
    username,
    email,
    phone,
    city,
    address,
    postcode,
    password,
    avatar
  ) => {
    return new Promise((resolve, reject) => {
      const user_id = uuid.v4();
      const query = {
        text: `INSERT INTO users
                (   
                    user_id,
                    username,
                    email,
                    phone,
                    city,
                    address,
                    postcode,
                    password,
                    avatar,
                )
                VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                )`,
        values: [
          user_id,
          username,
          email,
          phone,
          city,
          address,
          postcode,
          password,
          avatar,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
      // pool.query(
      //   `
      //       INSERT INTO users ( username, email, phone, city, address, postcode, password, avatar)
      //       VALUES
      //       ('${username}','${email}','${phone}','${city}' ,'${address}','${postcode}','${password}','${avatar}')
      //       `,
      //   (err, res) => {
      //     if (err) {
      //       reject(err);
      //     }
      //     resolve(res);
      //   }
      // );
    });
  },
  register: ({
    username,
    email,
    phone,
    password
  }) => {
    return new Promise((resolve, reject) => {
      const user_id = uuid.v4();
      const query = {
        text: `INSERT INTO users
                (   
                    user_id,
                    username,
                    email,
                    phone,
                    password
                )
                VALUES (
                    $1, $2, $3, $4, $5
                )`,
        values: [
          user_id,
          username,
          email,
          phone,
          password,
        ],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  checkUsername: (username) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from users where username='${username}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  updateAccount: (
    user_id,
    username,
    phone,
    city,
    address,
    postcode,
  ) => {
    return new Promise((resolve, reject) => {
      const updated_at = 'now()';
      pool.query(
        `
        UPDATE users SET
        username = COALESCE ($1, username),
        phone = COALESCE ($2, phone),
        city = COALESCE ($3, city),
        address = COALESCE ($4, address),
        postcode = COALESCE ($5, postcode),
        updated_at = $6
        WHERE user_id = $7
        `,
        [
          username,
          phone,
          city,
          address,
          postcode,
          updated_at,
          user_id,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  deleteUser: (user_id) => {
    return new Promise((resolve, reject) => {
      const query = {
        text: "DELETE FROM users WHERE user_id = $1",
        values: [user_id],
      };
      pool.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  checkUEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE email='${email}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};
module.exports = userModel;
