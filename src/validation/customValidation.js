const {log, response} = require('../../locale/messages');
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message(`"{{#label}}" ${log.error.validMongoIdMessage}`);
    }
    return value;
};

const password = (value, helpers) => {
    if (value.length < 8) {
      return helpers.message(response.passwordMustMessages);
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      return helpers.message(response.passwordMustLimitMessages);
    }
    return value;
};
  
module.exports = {
    objectId,
    password,
};