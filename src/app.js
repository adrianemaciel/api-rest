import express from "express";
const app = express();

// indicar que o express leia o body em json
app.use(express.json());

// mock
const selecoes = [
  { id: 1, selecao: "Brasil", grupo: "G" },
  { id: 2, selecao: "Suíça", grupo: "G" },
  { id: 3, selecao: "Camarões", grupo: "G" },
  { id: 4, selecao: "Sérvia", grupo: "G" },
];

function buscarSelecaoPorId(id) {
  return selecoes.filter((selecao) => selecao.id == id);
}

// pegar a posicao ou index do elemento no array por id
function buscarIndexSelecao(id) {
  return selecoes.findIndex((selecao) => selecao.id == id);
}

// rota padrão ou raiz
app.get("/", (req, res) => {
  res.send("Curso de Node Js");
});

// buscar selacao por parametro id
app.get("/selecoes/:id", (req, res) => {
  res.json(buscarSelecaoPorId(req.params.id));
});

app.get("/selecoes", (req, res) => {
  res.status(200).send(selecoes);
});

app.post("/selecoes", (req, res) => {
  selecoes.push(req.body);
  res.status(201).send("Seleção cadastrada com sucesso");
});

app.delete("/selecoes/:id", (req, res) => {
  let index = buscarIndexSelecao(req.params.id);
  selecoes.splice(index, 1);
  res.send(`Seleção com id ${req.params.id} excluída com sucesso!`);
});

export default app;
