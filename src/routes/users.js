const express = require('express');
const router = express.Router();
const usersSchema = require('../schemas/users');
const userLoginSchema = require('../schemas/userLogin');
const validate = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');
const validateAdminRole = require ('../middlewares/validateAdminRole');



const {deleteOne, getUsuario, getAll, updatedOne, alquilarAuto ,terminarAlquiler, signIn, signUp, 
    addToFavorites, removeFromFavorites, getAllMyFavorites} = require('../controllers/users');

router.get('/', validateToken(), validateAdminRole(), getAll);
router.get('/getAllMyFavorites/:usuarioID', validateToken(), getAllMyFavorites);
router.get('/:_id', validateToken(), getUsuario)
router.put('/:_id', validate(usersSchema), updatedOne);

// Register(SignUp) / Login(SignIn)
router.post('/SignUp/', validate(usersSchema), signUp);
router.post('/SignIn/', validate(userLoginSchema), signIn);
router.post('/addToFavorites/:usuarioID', validateToken(), addToFavorites);
router.post('/removeFromFavorites/:usuarioID', validateToken(), removeFromFavorites);

//Alquilar Autos
router.put('/alquilarAuto/:_id',validateToken(), alquilarAuto);
router.put('/terminarAlquiler/:_id',validateToken(), terminarAlquiler);

router.delete('/:_id',validateToken() , validateAdminRole() , deleteOne);



module.exports = router;
