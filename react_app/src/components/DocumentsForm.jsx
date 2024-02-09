import React, { useState } from "react";

function DocumentForm({ handleAddDocument }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("texto"); // Initialize tipo with "texto"
  const [file, setFile] = useState(null); // State to store the selected file

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append nome to the form data
      if (!nome) {
        alert("Por favor, preencha o campo Nome.");
        return;
      }
      formData.append("nome", nome);

      // Append tipo to the form data
      if (!tipo) {
        alert("Por favor, selecione um tipo.");
        return;
      }
      formData.append("tipo", tipo);

      // Handle file upload
      if (!file) {
        // Prompt for file selection if tipo is not "texto" and no file is chosen
        alert("Por favor, selecione um arquivo para upload.");
        return;
      }
      formData.append("conteudo", file);

      handleAddDocument(formData);

      setFile(null); // Clear the file state after successful upload
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar documento: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome:</label>
      <input
        type="text"
        id="nome"
        name="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="tipo">Tipo:</label>
      <select
        id="tipo"
        name="tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="texto">Texto</option>
        <option value="imagem">Imagem</option>
        <option value="video">Vídeo</option>
        <option value="audio">Áudio</option>
      </select>
      <br />
      <br />
      <label htmlFor="conteudo">Conteúdo:</label>
      <input
        type="file"
        id="conteudo"
        name="conteudo"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <br />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default DocumentForm;
