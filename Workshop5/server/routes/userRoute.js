const express = require('express');
const router = express.Router();
const { userPost, userGet, userPut, userDelete } = require('../controllers/userController');

// Crear un nuevo usuario
router.post('/api/users', userPost);

// Obtener todos los usuarios o uno específico
router.get('/api/users', userGet);

// Actualizar un usuario
router.put('/api/users/:id', userPut);

// Eliminar un usuario
router.delete('/api/users/:id', userDelete);

module.exports = router;