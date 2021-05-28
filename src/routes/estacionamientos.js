const express = require('express');
const router = express.Router();
const estacionamientoSchema = require('../schemas/estacionamientos');
const validate = require('../middlewares/validateData');

const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/estacionamientos');

router.get('/', getAll);
router.post('/', validate(estacionamientoSchema), createOne);
router.put('/', validate(estacionamientoSchema), updatedOne);
router.delete('/:id', deleteOne);

module.exports = router;