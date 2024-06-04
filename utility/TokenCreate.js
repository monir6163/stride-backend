const jwt = require("jsonwebtoken");
const TokenCreate = async (email) => {
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

module.exports = { TokenCreate };
