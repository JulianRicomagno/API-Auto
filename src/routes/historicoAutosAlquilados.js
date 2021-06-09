const express = require('express');
const router = express.Router();
const historicoSchema = require('../schemas/historicoAutosAlquilados');
const validate = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');
const validateAdminRole = require('../middlewares/validateAdminRole');


const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/historicoAutosAlquilados');

router.get('/', validateToken(), validateAdminRole(), getAll);
router.post('/', validate(historicoSchema), createOne);
router.put('/:_id', validate(historicoSchema), updatedOne);
router.delete('/:_id', validateToken(), validateAdminRole(), deleteOne);


//asdasdasdasd
module.exports = router;