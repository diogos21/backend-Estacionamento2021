const express = require('express')
require('dotenv').config() 
const InicializaMongoServer = require('./config/db')

InicializaMongoServer()
const app = express()


app.use(express.json()) 

const PORT = process.env.PORT

//Definindo a primeira rota do servidor
app.get("/",(req, res) => {
    res.json({
        mensagem: 'API 100% funcional! 🤖',
        vesao: '1.0.0'
    })
})

//Rota para tratamento de erro 404
app.use(function(req, res) {
    res.status(404).json({
        mensagem: `🚫 A rota ${req.originalUrl} não existe!`
    })
})

app.listen(PORT, (req, res) => {
    console.log(`🚀 Servidor WEB rodando na porta ${PORT}`)
})