const { firebaseApp } = require("../firebase");

// Middleware to check a request to the API has come from an authenticated user and then store their UID to be used in server controllers
// Returns errors for missing token or invalid token or failure to authorise

function authMiddleware(req, res, next) {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    console.log("Missing Token");
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    console.log("Invalid Token");
  }

  const token = headerToken.split(" ")[1];
  firebaseApp
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      let uid = decodedToken.uid;
      res.locals.uid = uid;
      next();
    })
    .catch(() => {
      // ADD ERROR HANDLING
    });
}

module.exports = authMiddleware;
