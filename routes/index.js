const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const problemController = require('../controllers/problemController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

router.get('/problems', problemController.getProblems);
router.post('/problems', problemController.createProblem);

module.exports = router;