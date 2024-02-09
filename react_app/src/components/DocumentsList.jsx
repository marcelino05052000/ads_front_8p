import React from "react";

function DocumentsList({ documents, onEdit, onDelete }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Conteúdo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.nome}</td>
              <td>{document.tipo}</td>
              <td>{document.conteudo}</td>
              <td>
                <button onClick={() => onEdit(document.id, document)}>
                  Editar
                </button>
                <button onClick={() => onDelete(document.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentsList;
