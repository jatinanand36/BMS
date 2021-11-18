const jwt = require('jsonwebtoken');
const config = require('config'); 
const {JWT_SECRET} = require('../../constants/constants');

const tokenVerification = (token) => {
    token = token.replace('JWT ', '');
    try {
        const decoded = jwt.verify(token, config.get(JWT_SECRET));
        let userInfo = {
            userId: decoded._id,
            userName: decoded.username,
            firstName: decoded.firstname,
            lastName: decoded.lastname,
            userRole: decoded.role,
            userCompany: decoded.company
        }
        return userInfo;
    } catch (err) {
        throw err;
    }
}
module.exports = {
    tokenVerification
}