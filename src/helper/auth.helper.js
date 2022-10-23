const jwt = require("jsonwebtoken");


module.exports = async (payload)=> {
    // const token = await jwt.sign(payload, JWT_SECRET,{expiresIn: 10});
    const token = await jwt.sign(payload, process.env.SECRET_KEY_JWT);
    return token;
};