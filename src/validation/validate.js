const Joi = require('@hapi/joi');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logging');
const {log} = require('../../locale/messages');
const {PARAM,QUERY,BODY,HTTP_CODES} = require('../../constants/constants');

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, [PARAM, QUERY, BODY]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    logger.error({error: error.message}, log.error.validation);
    const errorMessage = error.details.map((details) => details.message).join(', ');
    throw new ApiError(errorMessage, HTTP_CODES.BADREQUEST);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
