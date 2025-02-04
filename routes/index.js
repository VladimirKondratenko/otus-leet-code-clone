const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const problemController = require('../controllers/problemController');
const taskRoutes = require('./task.routes'); // Подключаем маршруты задач
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // Убедись, что у тебя есть swagger.json

// Маршруты пользователей
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

// Маршруты проблем
router.get('/problems', problemController.getProblems);
router.post('/problems', problemController.createProblem);

// Маршруты задач
router.use('/tasks', taskRoutes);

// Swagger-документация
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
