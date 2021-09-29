//API REST de Veiculos
const express = require('express')
const router = express.Router()

const Veiculo = require('../model/Veiculo')

/********************************
 *  GET /veiculo
 *  Lista todas os veículos
*********************************/
router.get('/', async(req, res) => {
    try{
        const veiculos = await Veiculo.find()
        res.json(veiculos)
    }catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possível obter os veículos!'}]
        })
    }
})

/********************************
 *  POST /veiculo
 *  Lista todas os veiculos
*********************************/
router.post('/', async(req, res) => {
    try{
        let veiculo = new Veiculo(req.body)
        await veiculo.save()
        res.send(veiculo)
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao salvar veículo: ${err.message}`}]
        })
    }
})

module.exports = router