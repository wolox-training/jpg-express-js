const { checkSchema } = require('express-validator');

exports.registerValidator = checkSchema({
  name: {
    errorMessage: 'incorrect name',
    type: String,
    required: true,
    length: {
      min: 2
    }
  },
  last_name: {
    errorMessage: 'incorrect last_name',
    type: String,
    required: true,
    length: {
      min: 2
    }
  },
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
