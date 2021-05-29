const express = require('express');
const router = express.Router();
const historicoSchema = require('../schemas/historicoAutosAlquilados');
const validate = require('../middlewares/validateData');


const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/historicoAutosAlquilados');

router.get('/', getAll);
router.post('/', validate(historicoSchema), createOne);
router.put('/:_id', validate(historicoSchema), updatedOne);
router.delete('/:_id', deleteOne);

module.exports = router;