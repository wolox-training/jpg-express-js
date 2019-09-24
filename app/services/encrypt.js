const bcrypt = require('bcrypt');

exports.encrypt = password => bcrypt.hashSync(password, 10);

exports.decrypt = (pass, hash) => bcrypt.compare(pass, hash);
