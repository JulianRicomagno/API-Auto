const express = require('express');
const router = express.Router();
const autosSchema = require('../schemas/autos');
const validate = require('../middlewares/validateData');
// const validateToken = require('../middlewares/validateToken');

const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/autos');

router.get('/',  getAll);
router.post('/', validate(autosSchema), createOne);
router.put('/:_id', validate(autosSchema), updatedOne);
router.delete('/:_id', deleteOne);

module.exports = router;