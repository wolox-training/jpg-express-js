exports.mockUser = () => ({
  name: 'juan',
  last_name: 'gomes',
  password: '12345678',
  email: 'darvan@woloxer.co',
  lastName: 'gomes'
});

exports.expectedResponse = () => ({
  name: 'juan',
  lastName: 'gomes'
});
