const express = require('express'); //Importa o express

const server = express(); //Executa o express

server.use(express.json()); //Faz o express utilizar JSON

const projetos = [];
var count = 0;

function verifyProjectExists(req, res, next){
  const { id } = req.params;
  if(!projetos.find( p => p.id == id )){
    return res.status(400).json({
      error: 'Project does not exist'
    });
  }else{
    return next();
  }
}

function counterRequests(req, res, next){
  count++;
  console.log(`${count} requisições feitas`);
  return next();
}

server.post('/projects', counterRequests, (req, res) => {
  const { id, title } = req.body;
  const tasks = [];
  projetos.push({id, title, tasks});

  return res.json(projetos);
});

server.get('/projects', counterRequests, (req, res) => {
  return res.json(projetos);
})

server.put('/projects/:id', counterRequests, verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projetos.find(p => p.id == id);

  project.title = title;

  return res.json(projetos);
})

server.delete('/projects/:id', counterRequests, verifyProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projetos.findIndex(p => p.id == id);

  projetos.splice(project, 1);

  return res.json(projetos);
})

server.post('/projects/:id/tasks', counterRequests, verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projetos.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
})

server.listen(3000); //Escuta a porta 3000