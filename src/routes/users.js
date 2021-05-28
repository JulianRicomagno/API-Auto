const express = require('express');
const router = express.Router();
const usersSchema = require('../schemas/users');
const validate = require('../middlewares/validateData');


const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/users');

router.get('/', getAll);
router.post('/', validate(usersSchema), createOne);
router.put('/', validate(usersSchema), updatedOne);
router.delete('/:id', deleteOne);

module.exports = router;