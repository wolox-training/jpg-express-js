const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.REQUEST_ERROR = 'request_error';
exports.requestError = message => internalError(message, exports.REQUEST_ERROR);

exports.EMPTY_ERROR = 'empty_error';
exports.emptyData = message => internalError(message, exports.EMPTY_ERROR);

exports.INVALID_DATA_ERROR = 'invalid_data_error';
exports.invalidData = message => internalError(message, exports.INVALID_DATA_ERROR);
