import React, { useState } from "react";

function DocumentForm({ handleAddDocument }) {
  const [nome, setNome] = useState("");
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
      <label htmlFor="arquivo">Arquivo:</label>
      <input
        type="file"
        id="arquivo"
        name="arquivo"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <br />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default DocumentForm;
