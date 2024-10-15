const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    nombreTarea: {
        type: String,
        required: true
    },
    estadoTarea: {
        type: Boolean,
        required: false
    }
});

const TareaModel = mongoose.model('Tarea', TareaSchema);

module.exports = {
    TareaModel
}