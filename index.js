const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const porta = 4000;
const clientesRouter = require('./routes/clientes');
const {Tarefa} = require('./models');

app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/clientes', clientesRouter);

app.get('/', async (req, res) => {
    //res.send({express: 'Hello'});
    try{
        const tarefas = await Tarefa.findAll();
        res.send(tarefas);
    } catch (error){
        res.send(`Error: ${error}`);
    }
});

app.get('/:tarefaId', async (req, res) => {
    try {
        const tarefa = await Tarefa.findAll({
            where:{
                id: req.params.tarefaId
            }
        });
        res.send(tarefa);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

app.post('/', async (req, res) =>{
    try{
        const resultado = await Tarefa.create(req.body);
        res.send(`Tarefa cadastrada com sucesso, com ID: ${resultado.id}`);
    } catch(error){
        res.send(`Error: ${error}`);
    }
});

app.put('/:tarefaId', async (req, res) => {
    try {
        const resultado = await Tarefa.update(req.body, {
            where:{
                id: req.params.tarefaId
            }
        });
        res.send('Tarefa atualizada com sucesso');
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

app.put('/concluiTarefa/:tarefaId', async (req, res) => {
    try {
        const resultado = await Tarefa.update({status: true}, {
            where:{
                id: req.params.tarefaId
            }
        });
        res.send('Tarefa atualizada com sucesso');
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

app.delete('/:tarefaId', async (req, res) => {
    try {
        const resultado = await Tarefa.destroy({
            where:{
                id: req.params.tarefaId
            }
        })
        res.send('Tarefa removida com sucesso');
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

app.listen(porta);