const Catway = require("../models/catways");

/**
 * Récupère la liste de tous les catways
 * @param {Object} req - La requête Express
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec la liste des catways (statut 200) ou une erreur (statut 501)
 */

exports.getAll = async (req, res, next) => {
  try {
    let catways = await Catway.find();
    return res.status(200).json(catways);
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Récupère un catway précis à partir de son numéro
 * @param {Object} req - La requête Express, contient le numéro du catway dans req.params.id
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec le catway trouvé (statut 200), ou une erreur si non trouvé (statut 404) ou en cas de problème serveur (statut 501)
 */

exports.getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let catway = await Catway.findOne({ catwayNumber: id });

    if (catway) {
      return res.status(200).json(catway);
    }

    return res.status(404).json("catway_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Ajouter un nouveau catway
 * @param {Object} req - La requête Express, contenant les informations du catway
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec le catway ajouté (statut 201), en cas de problème serveur (statut 501)
 */

exports.add = async (req, res, next) => {
  const temp = {
    catwayNumber: req.body.catwayNumber,
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.create(temp);
    return res.status(201).json(catway);
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Mettre à jour un catway
 * @param {Object} req - La requête Express, contenant l'identifiant et l'état d'un catway
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec le catway mis à jour (statut 200), ou une erreur si non trouvé (statut 404) ou en cas de problème serveur (statut 501)
 */

exports.update = async (req, res, next) => {
  const id = req.params.id;
  const temp = {
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.findOne({ catwayNumber: id });

    if (catway) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          catway[key] = temp[key];
        }
      });

      await catway.save();
      return res.status(201).json(catway);
    }

    return res.status(404).json("catway_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Supprimer un catway
 * @param {Object} req - La requête Express contenant le numéro du catway
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON catway supprimé (statut 204), en cas de problème serveur (statut 501)
 */

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Catway.deleteOne({ catwayNumber: id });
    return res.status(204).json("delete_ok");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Crée un nouveau catway depuis le formulaire
 * @param {Object} req Requête HTTP contenant les informations du catway
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la liste des catways, en cas de problème serveur (statut 501)
 */

exports.createForm = async (req, res, next) => {
  const temp = {
    catwayNumber: req.body.catwayNumber,
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.create(temp);
    return res.redirect("/catways-view");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Mettre à jour un catway depuis le formulaire
 * @param {Object} req Requête HTTP contenant les informations du catway
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la page des catways, en cas de problème serveur (statut 501)
 */

exports.updateForm = async (req, res, next) => {
  const id = req.params.id;
  const temp = {
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.findOne({ catwayNumber: id });

    if (catway) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          catway[key] = temp[key];
        }
      });

      await catway.save();
      return res.redirect("/catways-view/" + id);
    }

    return res.status(404).json("catway_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Supprimer un catway depuis le formulaire
 * @param {Object} req Requête HTTP contenant l'identifiant du catway
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la page des catways, en cas de problème serveur (statut 501)
 */

exports.deleteForm = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Catway.deleteOne({ catwayNumber: id });
    return res.redirect("/catways-view/");
  } catch (error) {
    return res.status(501).json(error);
  }
};
