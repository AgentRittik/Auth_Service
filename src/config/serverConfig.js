const dotenv = require('dotenv');

dotenv.config(); // call our dotenv file

module.exports = {
    PORT : process.env.PORT
}