const jwt = require("jsonwebtoken");

module.exports = (req, res, next ) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // this is the secret key which we use to specify how everything should be
    // encoded by jwt
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch(err) {
    res.status(401).json({ message: "Auth failed" });
  }
};
