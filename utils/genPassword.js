const bcrypt = require('bcrypt')
const salt = require('../config').salt
module.exports = async (input) => {
    try {
        let newPassword = await bcrypt.hash(input, 10);
        console.log(newPassword);
        return newPassword;
    } catch (err) {
        console.log(err);
    }
}