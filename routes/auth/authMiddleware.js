const jwt = require("jsonwebtoken");
const secret = 'd3123u12buibduwub32u12b31u2b31iu2beib12o3b';

function authMiddleware(req, res, next) {
  const requestType = req.type
  const success = isAuthenticated(req);
  const token = req.cookies.token;

  if (!success) {
    if (requestType == 'GET') {
      return res.redirect("/login");
    } else {
      return res.status(401).send('Unauthorised');
    }
  }
  const decoded = jwt.verify(token, secret);
  req.user = decoded.user;
  next();
}

function isAuthenticated (req) {
  const token = req.cookies.token;
  if (!token) {
    console.log("no Token")
    return false;
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    return true;
  } catch (err) {
    console.log(err)
    console.error("Authentication failed");
    return false
  }
}

module.exports = authMiddleware;