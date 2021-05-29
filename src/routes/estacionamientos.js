const express = require('express');
const router = express.Router();
const estacionamientoSchema = require('../schemas/estacionamientos');
const validate = require('../middlewares/validateData');

const {createOne, deleteOne, getAll, updatedOne, assingCar, removeCar} = require('../controllers/estacionamientos');

router.get('/', getAll);
router.post('/', validate(estacionamientoSchema), createOne);
router.put('/:_id', validate(estacionamientoSchema), updatedOne);
router.put('/removeCar/:_id', removeCar);
router.put('/assingCar/:_id', assingCar);
router.delete('/:_id', deleteOne);

module.exports = router;