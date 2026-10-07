const Reservation = require("../models/reservations");

/**
 * Récupère la liste de toutes les réservations
 * @param {Object} req - La requête Express
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec la liste des réservations (statut 200) ou une erreur (statut 501)
 */

exports.getAll = async (req, res, next) => {
  const catwayNumber = req.params.id;

  try {
    let reservations = await Reservation.find({ catwayNumber: catwayNumber });
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Récupère une réservation précise à partir de son numéro
 * @param {Object} req - La requête Express, contient le numéro du catway
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec la réservation trouvé (statut 200), ou une erreur si non trouvé (statut 404) ou en cas de problème serveur (statut 501)
 */

exports.getById = async (req, res, next) => {
  const catwayNumber = req.params.id;
  const idReservation = req.params.idReservation;
  try {
    let reservation = await Reservation.find({
      catwayNumber: catwayNumber,
      _id: idReservation,
    });

    if (reservation) {
      return res.status(200).json(reservation);
    }
    return res.status(404).json("reservation_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Ajouter une nouvelle réservation
 * @param {Object} req - La requête Express, contenant les informations de la réservation
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec la réservation ajouté (statut 201), en cas de problème serveur (statut 501)
 */

exports.add = async (req, res, next) => {
  const catwayNumber = req.params.id;

  const temp = {
    catwayNumber: catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  try {
    let reservation = await Reservation.create(temp);
    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Mettre à jour une réservation
 * @param {Object} req - La requête Express, contenant les informations de la réservation
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON avec la réservation mis à jour (statut 200), ou une erreur si non trouvé (statut 404) ou en cas de problème serveur (statut 501)
 */

exports.update = async (req, res, next) => {
  const idReservation = req.params.idReservation;

  const temp = {
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  try {
    let reservation = await Reservation.findById(idReservation);

    if (reservation) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          reservation[key] = temp[key];
        }
      });

      await reservation.save();
      return res.status(201).json(reservation);
    }

    return res.status(404).json("reservation_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Supprimer une réservation
 * @param {Object} req - La requête Express contenant les informations de la réservation
 * @param {Object} res - La réponse Express
 * @returns {Object} Réponse JSON réservation supprimée (statut 201), en cas de problème serveur (statut 501)
 */

exports.delete = async (req, res, next) => {
  const idReservation = req.params.idReservation;
  try {
    await Reservation.deleteOne({ _id: idReservation });
    return res.status(201).json("delete_ok");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Crée une nouvelle réservation depuis le formulaire
 * @param {Object} req Requête HTTP contenant les informations de la réservation
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la liste des réservations, en cas de problème serveur (statut 501)
 */

exports.createForm = async (req, res, next) => {
  const catwayNumber = req.body.catwayNumber;
  const temp = {
    catwayNumber: catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  try {
    let reservation = await Reservation.create(temp);
    return res.redirect("/reservations-view");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Mettre à jour une réservation depuis le formulaire
 * @param {Object} req Requête HTTP contenant les informations de la réservation
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la page des réservations, en cas de problème serveur (statut 501)
 */

exports.updateForm = async (req, res, next) => {
  const idReservation = req.params.id;

  const temp = {
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  try {
    let reservation = await Reservation.findById(idReservation);

    if (reservation) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          reservation[key] = temp[key];
        }
      });

      await reservation.save();
      return res.redirect("/reservations-view/" + idReservation);
    }

    return res.status(404).json("reservation_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Supprimer une réservation depuis le formulaire
 * @param {Object} req Requête HTTP contenant l'identifiant de la réservation
 * @param {Object} res Réponse HTTP
 * @returns {Object} Redirection vers la page des réservations, en cas de problème serveur (statut 501)
 */

exports.deleteForm = async (req, res, next) => {
  const idReservation = req.params.id;
  try {
    await Reservation.deleteOne({ _id: idReservation });
    return res.redirect("/reservations-view");
  } catch (error) {
    return res.status(501).json(error);
  }
};
