const express = require('express');
const router = express.Router();
const usersSchema = require('../schemas/users');
const userLoginSchema = require('../schemas/userLogin');
const {validate} = require('../middlewares/validateData');


const {createOne, deleteOne, getAll, updatedOne, alquilarAuto ,terminarAlquiler, signIn, signUp} = require('../controllers/users');

router.get('/', getAll);
// router.post('/', validate(usersSchema), createOne);
router.put('/:_id', validate(usersSchema), updatedOne);

// Register(SignUp) / Login(SignIn)
router.post('/SignUp/', validate(usersSchema), signUp);
router.post('/SignIn/', validate(userLoginSchema), signIn);

//Alquilar Autos
router.put('/alquilarAuto/:_id', alquilarAuto);
router.put('/terminarAlquiler/:_id', terminarAlquiler);


router.delete('/:_id', deleteOne);

module.exports = router;