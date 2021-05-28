const express = require('express');
const router = express.Router();
const autosSchema = require('../schemas/autos');
const validate = require('../middlewares/validateData');

const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/autos');

router.get('/', getAll);
router.post('/', validate(autosSchema), createOne);
router.put('/', validate(autosSchema), updatedOne);
router.delete('/:id', deleteOne);

module.exports = router;