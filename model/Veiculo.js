const mongoose = require('mongoose')

const VeiculoSchema = mongoose.Schema({
    marca: {type: String},
    modelo: {type: String},
    ano: {type: Number},
    cor: {type: String},
    placa: {type: String},
    status: {type: String, enum: ['ativo','inativo'], default: 'ativo'}

},{timestamps: true})