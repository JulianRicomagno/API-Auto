const express = require('express');
const router = express.Router();
const autosSchema = require('../schemas/autos');
const validate = require('../middlewares/validateData');

const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/autos');
const upload = require('../middlewares/upload');

router.get('/', getAll);
router.post('/', upload.single('imagen'), /*validate(autosSchema),*/ createOne);
router.put('/:_id', validate(autosSchema), updatedOne);
router.delete('/:_id', deleteOne);

module.exports = router;