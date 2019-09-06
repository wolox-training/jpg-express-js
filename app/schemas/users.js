const { checkSchema } = require('express-validator');

exports.registerValidator = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'incorrect name',
    isLength: {
      options: {
        min: 2
      }
    }
  },
  last_name: {
    in: ['body'],
    isString: true,
    errorMessage: 'incorrect last_name',
    isLength: {
      options: {
        min: 2
      }
    }
  },
  password: {
    in: ['body'],
    isString: true,
    errorMessage: 'incorrect password',
    isLength: {
      options: {
        min: 8
      }
    }
  },
  email: {
    in: ['body'],
    errorMessage: 'incorrect email',
    isEmail: true,
    matches: {
      options: [/^[a-zA-Z0-9._-]+@wolox.(co|com.ar|cl|ar|mx)$/],
      errorMessage: 'Is not a valid email domain'
    }
  }
});

exports.sessionValidator = checkSchema({
  password: {
    errorMessage: 'incorrect password',
    type: String,
    required: true,
    length: {
      min: 8
    }
  },
  email: {
    errorMessage: 'incorrect email',
    isEmail: true,
    required: true,
    matches: {
      options: [/^[a-zA-Z0-9._-]+@wolox.(co|com.ar|cl|ar|mx)$/],
      errorMessage: 'Is not a valid email domain'
    }
  }
});
