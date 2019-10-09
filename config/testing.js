exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    session: {
      secret: 'some-super-secret',
      expiration: 10800,
      type: 'seconds'
    },
    resources: {
      urlApi: 'https://jsonplaceholder.typicode.com'
    }
  }
};
