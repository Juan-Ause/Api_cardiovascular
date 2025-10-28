require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
};

const { JWT_SECRET = 'CardiJWTAdmin004' } = process.env;
module.exports = { JWT_SECRET };
