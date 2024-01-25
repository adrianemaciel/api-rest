// importanto expresse atrevés do require
const express = require("express");
const app = express();

// definição de uma porta
const port = 3000;

// rota padrão ou raiz
app.get("/", (req, res) => {
  res.send("Hello World");
});

// escutar a porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando na endereço http://localhost:${port}`);
});
