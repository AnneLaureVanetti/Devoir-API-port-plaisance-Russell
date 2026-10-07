const express = require('express');
const router = express.Router({ mergeParams: true });
const reservationService = require('../services/reservationservice');


router.get('/',reservationService.getAll),
router.get('/:idReservation',reservationService.getById),
router.post('/',reservationService.add),
router.put('/:idReservation',reservationService.update),
router.delete('/:idReservation', reservationService.delete),

module.exports = router;
