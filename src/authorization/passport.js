const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config')
const User = require('../models/user')
const {JWT_SECRET} = require('../../constants/constants');
 
module.exports = function (passport) {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.get(JWT_SECRET)
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._id, {"password" : 0, "resetPasswordTokenExpires": 0, "resetPasswordToken": 0}, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
