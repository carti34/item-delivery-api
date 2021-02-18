const express = require('express');
const router = express.Router();
const {Cliente} = require('../models');

router.get('/', async (req, res) => {
    try{
        const resultado = await Cliente.findAll();
        res.send(resultado);
    } catch (error){
        res.send(`Error: ${error}`);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const resultado = await Cliente.findAll({
            where:{
                id: req.params.id
            }
        });
        res.send(resultado);
    } catch (error){
        res.send(`Error: ${error}`);
    }
});

router.post('/login', async (req, res) => {
    try{
        const resultado = await Cliente.findAll({
            where:{
                email: req.body.email
            }
        });
        res.send(resultado);
    } catch (error){
        res.send(`Error: ${error}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const resultado = await Cliente.create(req.body);
        res.send(`Cliente cadastrado com sucesso, com ID: ${resultado.id}`);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const resultado = await Cliente.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.send('Cliente atualizado com sucesso');
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const resultado = await Cliente.destroy({
            where:{
                id: req.params.id
            }
        })
        res.send('Cliente removido com sucesso');
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

module.exports = router;