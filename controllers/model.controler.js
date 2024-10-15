var express = require('express');
var router = express.Router();
const {
    TareaModel
} = require('../models/tarea.model');

async function CrearTarea(req, res) {
    const nombreTarea = req.body.nombreTarea;

    if (!nombreTarea || nombreTarea <=  0) {
        return res.status(400).json('Es requerido un nombre para la tarea');
    } 

    try {
        const nuevaTarea = new TareaModel({
            nombreTarea: nombreTarea,
            estadoTarea: false
        });
        await nuevaTarea.save();
        return res.status(201).json(nuevaTarea);
    } catch (error) {
        return res.status(500).json('Error al crear la tarea', error);
    }
}

async function ConcluirTarea(req, res) {
    const idTarea = req.body.idTarea;

    try{
        const tarea = await TareaModel.findOne(_id = idTarea);

        if (!tarea) {
            return res.status(404).json('Tarea no encontrada');
        }

        tarea.estadoTarea = true;
        await tarea.save();
        return res.status(200).json({mensaje: 'Tarea Concluida exitosamente', tarea});
    } catch (error) {
        return res.status(500).json({mensaje: 'Error al concluir la tarea', error});
    }
}

async function EliminarTarea(req, res) {
    const idTarea = req.body.idTarea;

    try{
        const tarea = await TareaModel.findOne(_id = idTarea);

        if (!tarea) {
            return res.status(404).json('Tarea no encontrada');
        }

        await tarea.delete();
        return res.status(200).json({mensaje: 'Tarea eliminada exitosamente'});
    } catch (error) {
        return res.status(500).json({mensaje: 'Error al eliminar la tarea', error});
    }
}

async function Listado(req,res) {
    const Tareas = req.body.Tareas;

    if (!Tareas || Tareas.length <= 0) {
        return res.status(400).json('Es requerido al menos una tarea');
    }

    try{
        const NuevoListado = new TareaModel({
            Tareas: Tareas
        });
        await nuevaTarea.save();
        return res.status(201).json({NuevoListado});
    } catch (error) {
        return res.status(500).json('Error al crear el listado', error);
    }
    
}

function DiaActual() {
    const dia = { weekday: 'long' };
    return new Date().toLocaleDateString('es-ES', dia);
  }

async function Saludos(req,res) {
    const dia = DiaActual();

    const Saludos = [
        `Pasala Genial en tu ${dia}`,
        `Disfruta mucho tu ${dia}`,
        `Te deseo un gran ${dia}`
    ]

    const saludoAleatorio = Saludos[Math.floor(Math.random() * Saludos.length)];
    res.send(saludoAleatorio);
}

module.exports = {
    CrearTarea,
    ConcluirTarea,
    EliminarTarea,
    Listado,
    Saludos
}