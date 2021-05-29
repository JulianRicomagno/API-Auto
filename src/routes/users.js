const express = require('express');
const router = express.Router();
const usersSchema = require('../schemas/users');
const validate = require('../middlewares/validateData');


const {createOne, deleteOne, getAll, updatedOne} = require('../controllers/users');

router.get('/', getAll);
router.post('/', validate(usersSchema), createOne);
router.put('/:_id', validate(usersSchema), updatedOne);
router.delete('/:_id', deleteOne);

module.exports = router;