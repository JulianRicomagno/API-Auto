const express = require('express');
const router = express.Router();
const usersSchema = require('../schemas/users');
const userLoginSchema = require('../schemas/userLogin');
const validate = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');
const validateAdminRole = require ('../middlewares/validateAdminRole');



const {createOne, deleteOne, getAll, updatedOne, alquilarAuto ,terminarAlquiler, signIn, signUp} = require('../controllers/users');

router.get('/', validateToken(), validateAdminRole(), getAll);
// router.post('/', validate(usersSchema), createOne); ??? < Remover ya que existe "SignUp" - consulta.
router.put('/:_id', validate(usersSchema), updatedOne);

// Register(SignUp) / Login(SignIn)
router.post('/SignUp/', validate(usersSchema), signUp);
router.post('/SignIn/', validate(userLoginSchema), signIn);

//Alquilar Autos
router.put('/alquilarAuto/:_id',validateToken(), alquilarAuto);
router.put('/terminarAlquiler/:_id',validateToken(), terminarAlquiler);


router.delete('/:_id',validateToken() , validateAdminRole() , deleteOne);



module.exports = router;
