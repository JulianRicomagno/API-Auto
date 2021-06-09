const express = require('express');
const router = express.Router();
const autosSchema = require('../schemas/autos');
const validate = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');
const validateAdminRole = require('../middlewares/validateAdminRole');
const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/autos');


router.get('/', validateToken(), validateAdminRole(), getAll);
router.post('/', validateToken(), validateAdminRole(), validate(autosSchema), createOne);
router.put('/:_id', validateToken(), validate(autosSchema), updatedOne);
router.delete('/:_id', validateToken(), validateAdminRole(), deleteOne);


//asdasdasdasd
module.exports = router;