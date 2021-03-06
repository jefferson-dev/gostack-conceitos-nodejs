const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie)

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoreId = repositories.find(repoId => repoId.id === id)

  if (!repositoreId) {
    return response.status(400).json({ error: 'Repositorie Invalid.'})
  }

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositoreId.likes,
  }

  repositories[repositories.findIndex(repoId => repoId.id === id)] = repo

  return response.json(repo)  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoreId = repositories.findIndex(repoId => repoId.id === id)

  if (repositoreId < 0 ) {
    return response.status(400).json({ error: 'Repositorie Invalid.'})
  }

  repositories.splice(repositoreId, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoreId = repositories.find(repoId => repoId.id === id)

  if (!repositoreId) {
    return response.status(400).json({ error: 'Repositorie Invalid.'})
  }

  const repo = {
    ...repositoreId,
    likes: repositoreId.likes+1
  }

  repositories[repositories.findIndex(repoId => repoId.id === id)] = repo
  
  return response.json(repo)
});

module.exports = app;
