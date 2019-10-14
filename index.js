const express = require('express'); //Importa o express

const server = express(); //Executa o express

server.use(express.json()); //Faz o express utilizar JSON

const projetos = [];

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

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const tasks = [];
  projetos.push({id, title, tasks});

  return res.json(projetos);
});

server.get('/projects', (req, res) => {
  return res.json(projetos);
})

server.put('/projects/:id', verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projetos.find(p => p.id == id);

  project.title = title;

  return res.json(projetos);
})

server.delete('/projects/:id', verifyProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projetos.findIndex(p => p.id == id);

  projetos.splice(project, 1);

  return res.json(projetos);
})

server.post('/projects/:id/tasks', verifyProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projetos.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
})

server.listen(3000); //Escuta a porta 3000