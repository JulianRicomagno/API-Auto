const express = require('express');
const router = express.Router();
const historicoSchema = require('../schemas/historicoAutosAlquilados');
const validate = require('../middlewares/validateData');


const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/historicoAutosAlquilados');

router.get('/', getAll);
router.post('/', validate(historicoSchema), createOne);
router.put('/', validate(historicoSchema), updatedOne);
router.delete('/:id', deleteOne);

module.exports = router;