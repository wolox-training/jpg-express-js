const { checkSchema } = require('express-validator');

exports.registerValidator = checkSchema({
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'incorrect name'
  },
  last_name: {
    in: ['body'],
    isString: true,
    errorMessage: 'incorrect last_name'
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
    in: ['body'],
    isString: true,
    errorMessage: 'invalid password',
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
