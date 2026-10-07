const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

/**
 * Vérifie si il y a un token et sa validité.
 * @param {Object} req - La requête Express
 * @param {Object} res - La réponse Express
 * @param {Function} next Passe la main au middleware ou à la route suivante si le token est valide
 * @returns {Object} Réponse JSON si aucun token, ou non valide (statut 401)
 */

exports.checkJWT = async (req, res, next) => {
  let token =
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    req.session.token;

  if (!!token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("token_not_valid");
      } else {
        req.decoded = decoded;

        const expiresIn = 24 * 60 * 60;
        const newToken = jwt.sign(
          {
            user: decoded.user,
          },
          JWT_KEY,
          {
            expiresIn: expiresIn,
          },
        );

        res.header("Authorization", "Bearer " + newToken);
        next();
      }
    });
  } else {
    return res.status(401).json("token_required");
  }
};
