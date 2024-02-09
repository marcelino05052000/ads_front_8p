import React, { useEffect, useState } from "react";
import axios from "axios";
import DocumentForm from "./DocumentsForm";
import DocumentsList from "./DocumentsList";

function CrudScreen() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/documentos");
      setDocuments(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleAddDocument = async (document) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/documentos",
        document,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDocuments([...documents, response.data]);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDocument = async (id, document) => {
    try {
      await axios.put(`http://localhost:3000/documentos/${id}`, document);
      const updatedDocuments = documents.map((doc) =>
        doc.id === id ? document : doc
      );
      setDocuments(updatedDocuments);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/documentos/${id}`);
      const filteredDocuments = documents.filter((doc) => doc.id !== id);
      setDocuments(filteredDocuments);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    setDocuments([]);
    window.history.back();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Gerenciar Documentos</h1>
        <DocumentForm handleAddDocument={handleAddDocument} />
        <br />
        <button onClick={handleGoBack}>Voltar</button>
        <br />
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <DocumentsList
            documents={documents}
            onEdit={handleEditDocument}
            onDelete={handleDeleteDocument}
          />
        )}
      </div>
    </div>
  );
}

export default CrudScreen;
