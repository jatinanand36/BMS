const {ERROR,HTTP_CODES} = require('../../constants/constants');
const errorHandler = (err, req, res, next) => {
    let { statusCode , message} = err;
    res.status(statusCode).send({
      status: ERROR,
      statusCode: statusCode || HTTP_CODES.INTERNALERROR,
      msg: message,
    });
};

module.exports = errorHandler;