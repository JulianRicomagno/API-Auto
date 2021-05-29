const express = require('express');
const router = express.Router();
const usersSchema = require('../schemas/users');
const validate = require('../middlewares/validateData');


const {createOne, deleteOne, getAll, updatedOne, alquilarAuto ,terminarAlquiler} = require('../controllers/users');

router.get('/', getAll);
router.post('/', validate(usersSchema), createOne);
router.put('/:_id', validate(usersSchema), updatedOne);

//Alquilar Autos
router.put('/alquilarAuto/:_id', alquilarAuto);
router.put('/terminarAlquiler/:_id', terminarAlquiler);


router.delete('/:_id', deleteOne);

module.exports = router;