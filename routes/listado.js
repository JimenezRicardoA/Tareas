var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const {
    CrearTarea,
    ConcluirTarea,
    EliminarTarea,
    Listado,
    Saludos
} = require('../controllers/model.controler');

router.get('/Mandar-Saludo', Saludos);
router.get('/Listado-Tareas', Listado);
router.post('/Crear-Tarea', CrearTarea);
router.post('/Concluir-Tarea', ConcluirTarea);
router.post('/Eliminar-Tarea', ConcluirTarea, EliminarTarea);

module.exports = router;
