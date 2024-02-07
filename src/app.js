import express from "express";
import conexao from "../infra/conexao.js";

const app = express();

// indicar que o express leia o body em json
app.use(express.json());

function buscarSelecaoPorId(id) {
  return selecoes.filter((selecao) => selecao.id == id);
}

// pegar a posicao ou index do elemento no array por id
function buscarIndexSelecao(id) {
  return selecoes.findIndex((selecao) => selecao.id == id);
}

// ROTAS
app.get("/selecoes", (req, res) => {
  const sql = "SELECT * FROM selecoes;";
  conexao.query(sql, (erro, resultado) => {
    if (erro) {
      res.status(404).json({ erro: erro });
    } else {
      res.status(200).json(resultado);
    }
  });
});

// buscar selacao por parametro id
app.get("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM selecoes WHERE id=?;";
  conexao.query(sql, id, (erro, resultado) => {
    const linha = resultado[0];
    if (erro) {
      res.status(404).json({ erro: erro });
    } else {
      res.status(200).json(linha);
    }
  });
});

app.post("/selecoes", (req, res) => {
  const selecao = req.body;
  const sql = "INSERT INTO selecoes SET ?;";
  conexao.query(sql, selecao, (erro, resultado) => {
    if (erro) {
      res.status(400).json({ erro: erro });
    } else {
      res.status(201).json(resultado);
    }
  });
});

app.delete("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM selecoes WHERE id=?;";
  conexao.query(sql, id, (erro, resultado) => {
    if (erro) {
      res.status(404).json({ erro: erro });
    } else {
      res.status(200).json(resultado);
    }
  });
});

app.put("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const selecao = req.body;
  const sql = "UPDATE selecoes SET ? WHERE id=?;";
  conexao.query(sql, [selecao, id], (erro, resultado) => {
    if (erro) {
      res.status(400).json({ erro: erro });
    } else {
      res.status(200).json(resultado);
    }
  });
});

export default app;
