const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Récupère la liste de tous les utilisateurs
 * @param {Object} req - La requête Express
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec la liste des utilisateurs (statut 200) ou une erreur (statut 501)
 */

exports.getAll = async (req, res, next) => {
  try {
    let users = await User.find();
    return res.status(201).json(users);
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Récupère un utilisateur précis à partir de son numéro
 * @param {Object} req - La requête Express, contient l'identifiant de l'utilisateur
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec l'utilisateur trouvé (statut 200), ou une erreur si non trouvé (statut 404) ou en cas de problème serveur (statut 501)
 */

exports.getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let user = await User.findById(id);

    if (user) {
      return res.status(201).json(user);
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Ajouter un nouvel utilisateur
 * @param {Object} req - La requête Express, contenant les informations de l'utilisateur
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec l'utilisateur ajouté (statut 201), en cas de problème serveur (statut 501)
 */

exports.add = async (req, res, next) => {
  const temp = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.create(temp);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Mettre à jour un utilisateur
 * @param {Object} req - La requête Express, contenant les informations de l'utilisateur
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec l'utilisateur mis à jour (statut 200), ou une erreur si non trouvé (statut 404) ou en cas de problème serveur (statut 501)
 */

exports.update = async (req, res, next) => {
  const id = req.params.id;

  const temp = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.findById(id);
    if (user) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          user[key] = temp[key];
        }
      });

      await user.save();
      return res.status(201).json(user);
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Supprimer un utilisateur
 * @param {Object} req - La requête Express contenant les informations de l'utilisateur
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON utilisateur supprimé (statut 201), en cas de problème serveur (statut 501)
 */

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    let user = await User.deleteOne({ _id: id });
    if (user) {
      return res.status(201).json("delete_ok");
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};

/**
 * Authentifie un utilisateur et crée une session
 * @param {Object} req Requête HTTP contenant l'email et le mot de passe
 * @param {Object} res Réponse HTTP avec redirection vers le tableau de bord
 */

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne(
      { email: email },
      "-__v -createdAt -updatedAt",
    );

    if (!user) {
      return res.status(404).json("user_not_found");
    }

    let isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(403).json("wrong_credentials");
    }

    delete user._doc.password;

    const expireIn = 24 * 60 * 60;
    const token = jwt.sign({ user: user }, process.env.JWT_KEY, {
      expiresIn: expireIn,
    });

    req.session.token = token;
    return res.redirect("/dashboard");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Déconnecte l'utilisateur et détruit sa session
 * @param {Object} req Requête HTTP
 * @param {Object} res Réponse HTTP avec redirection vers l'accueil
 */

exports.logout = async (req, res, next) => {
  req.session = null;
  return res.redirect("/");
};

/**
 * Crée un nouvel utilisateur depuis le formulaire
 * @param {Object} req Requête HTTP contenant les informations de l'utilisateur
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la liste des utilisateurs, en cas de problème serveur (statut 501)
 */

exports.createForm = async (req, res, next) => {
  const temp = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.create(temp);
    return res.redirect("/users-view");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Mettre à jour un utilisateur depuis le formulaire
 * @param {Object} req Requête HTTP contenant les informations de l'utilisateur
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la page des utilisateurs, en cas de problème serveur (statut 501)
 */

exports.updateForm = async (req, res, next) => {
  const id = req.params.id;

  const temp = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.findById(id);
    if (user) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          user[key] = temp[key];
        }
      });

      await user.save();
      return res.redirect("/users-view/" + id);
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Supprimer un utilisateur depuis le formulaire
 * @param {Object} req Requête HTTP contenant l'identifiant de l'utilisateur
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la page des utilisateurs, en cas de problème serveur (statut 501)
 */

exports.deleteForm = async (req, res, next) => {
  const id = req.params.id;

  try {
    let user = await User.deleteOne({ _id: id });
    if (user) {
      return res.redirect("/users-view");
    }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
