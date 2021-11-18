const passport = require('passport');
const {response} = require('../../locale/messages');
const {ERROR, HTTP_CODES} = require('../../constants/constants');

const passportValidate = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(HTTP_CODES.UNAUTHORIZE).send({ msg : response.unauthorizedUser,  status: ERROR}) }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = passportValidate