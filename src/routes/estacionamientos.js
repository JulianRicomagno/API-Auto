const express = require('express');
const router = express.Router();
const estacionamientoSchema = require('../schemas/estacionamientos');
const validate = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');
const validateAdminRole = require('../middlewares/validateAdminRole');

const {createOne, deleteOne, getAll, updatedOne, assingCar, removeCar} = require('../controllers/estacionamientos');

router.get('/', validateToken(), validateAdminRole(), getAll);
router.post('/', validate(estacionamientoSchema), validateToken(), validateAdminRole(), createOne);
router.put('/:_id', validate(estacionamientoSchema), validateToken(), validateAdminRole(), updatedOne);
router.put('/removeCar/:_id', removeCar);
router.put('/assingCar/:_id', assingCar);
router.delete('/:_id', validateToken(), validateAdminRole(), deleteOne);

module.exports = router;