exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    session: {
      secret: 'some-super-secret'
    },
    resources: {
      urlApi: 'https://jsonplaceholder.typicode.com',
      expiration: 1
    }
  }
};
