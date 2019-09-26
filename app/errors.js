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

exports.USER_EXISTS_ERROR = 'user_exists_error';
exports.userExistsError = message => internalError(message, exports.USER_EXISTS_ERROR);

exports.USER_NOT_EXISTS_ERROR = 'user_not_exists_error';
exports.userNotExistsError = message => internalError(message, exports.USER_NOT_EXISTS_ERROR);

exports.INVALID_DATA_ERROR = 'invalid_data_error';
exports.invalidData = message => internalError(message, exports.INVALID_DATA_ERROR);

exports.INVALID_ACCSESS_TOKEN = 'invalid_token_error';
exports.invalidToken = message => internalError(message, exports.INVALID_ACCSESS_TOKEN);

exports.NOT_FOUND_ERROR = 'not_found_error';
exports.notFoundError = message => internalError(message, exports.NOT_FOUND_ERROR);
