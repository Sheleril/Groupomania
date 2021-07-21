const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'qsfqizugzpierguauzrç"égirdh^fsdoifjspiudgqpzûezgruf1654815213';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    JWT_SECRET_KEY,
    {
      expiresIn: '5h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    let userId = -1;
    let token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SECRET_KEY);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}