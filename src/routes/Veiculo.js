//API REST de Veiculos
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Veiculo = require('../model/Veiculo')

const validaVeiculo = [
    check('marca','Nome da marca do veículo é obrigatório').not().isEmpty(),
    check('modelo','Modelo do carro não informado').not().isEmpty(),
    check('ano','Erro! Inserir dado numérico!').not().isString(),
    check('status','Informe um status válido para a categoria.').isIn(['ativo','inativo']),
]

/********************************
 *  GET /veiculos
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
 *  GET /veiculos/:id
 *  Lista o veículo pelo id informado
*********************************/
router.get('/:id', async(req, res)=>{
    try{
        const veiculo = await Veiculo.findById(req.params.id)
        res.json(veiculo)
    }catch (err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter o veículo com o id ${req.params.id}`}]
        })
    }
})

/********************************
 *  POST /veiculos
 *  Inclui um novo veículo
*********************************/
router.post('/', validaVeiculo,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
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

/********************************
 *  PUT /veiculos
 *  Altera um veículo existente
*********************************/
router.put('/', validaVeiculo,
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(({
                errors: errors.array()
            }))
        }
    try{
        let dados = req.body
        await Veiculo.findByIdAndUpdate(req.body._id, {$set: dados}, {new: true})
        .then(veiculo => {
            res.send({message: `Veiculo ${veiculo.marca} ${veiculo.modelo} alterado com sucesso`})
        })
        .catch(err => {
            return res.status(500).send({message: `Erro ao alterar o veiculo com o ID: ${req.body._id}`})
        })
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao alterar veículo: ${err.message}`}]
        })
    }
})

/********************************
 *  DELETE /veiculos/:id
 *  Apaga um veículo pelo id
*********************************/
router.delete('/:id', async(req, res) => {
    await Veiculo.findByIdAndRemove(req.params.id)
    .then(veiculo => {
        res.send({message: `Veiculo ${veiculo.marca} ${veiculo.modelo} removido com sucesso`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{message: `Não foi possível excluir o veículo com o ID: ${req.params.id}`}]
        })
    })
})

module.exports = router