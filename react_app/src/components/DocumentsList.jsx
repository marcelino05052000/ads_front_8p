import React, { useState } from "react";

function DocumentsList({ documents, onEdit, onDelete }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [nome, setNome] = useState("");
  const [conteudo, setConteudo] = useState("");

  const openEditModal = (id, document) => {
    setSelectedDocument(document);
    setNome(document.nome);
    setConteudo(document.conteudo);
    setEditModalOpen(true);
  };

  console.log(selectedDocument);

  const closeEditModal = () => {
    setSelectedDocument(null);
    setEditModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append nome to the form data
      if (!nome || nome === "" || nome === null) {
        alert("Por favor, preencha o campo Nome.");
        return;
      }
      formData.append("nome", nome);

      // Handle file upload
      if (!conteudo || conteudo === null) {
        alert("Por favor, selecione um arquivo para upload.");
        return;
      }
      formData.append("conteudo", conteudo);

      console.log("Formulário a ser enviado:", formData);
      // await onEdit(selectedDocument.id, formData);

      // Limpar o estado após a submissão bem-sucedida
      setNome("");
      setConteudo(null);

      alert("Formulário enviado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar documento: " + error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setConteudo(file);
    console.log(conteudo);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Conteúdo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.nome}</td>
              <td>
                {document.conteudo && (
                  <img
                    src={`http://localhost:3000/${document.conteudo}`}
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => openEditModal(document.id, document)}>
                  Editar
                </button>
                <button onClick={() => onDelete(document.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Documento</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <label htmlFor="conteudo">Conteúdo:</label>
              <input
                type="file"
                id="conteudo"
                name="conteudo"
                onChange={handleFileChange}
              />
              <button type="submit">Salvar</button>
            </form>
            <button onClick={closeEditModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentsList;
