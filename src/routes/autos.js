const express = require('express');
const router = express.Router();
const autosSchema = require('../schemas/autos');
const validate = require('../middlewares/validateData');
const validateToken = require('../middlewares/validateToken');
const validateAdminRole = require('../middlewares/validateAdminRole');
const {createOne, getAuto, deleteOne, getAll, updatedOne} = require('../controllers/autos');


router.get('/', validateToken(), getAll);
router.get('/:_id', validateToken(), getAuto);
router.post('/', validateToken(), validateAdminRole(), validate(autosSchema), createOne);
router.put('/:_id', validateToken(), validateAdminRole(), validate(autosSchema), updatedOne);
router.delete('/:_id', validateToken(), validateAdminRole(), deleteOne);



module.exports = router;