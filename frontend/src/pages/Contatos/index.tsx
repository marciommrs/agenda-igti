import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit2, FiBook } from 'react-icons/fi';


import api from '../../services/api';

import './styles.css';

interface Contato {
  id: number,
  nome: string,
  email: string,
  telefone: string,
  endereco: string
}

const Contatos = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);

  useEffect(() => {
    api.get('/contatos')
      .then(response => {
        setContatos(response.data);
      })
  }, [contatos]);

  async function handleDeleteContato(id: Number) {
    try {
      await api.delete(`contatos/${id}`);
      setContatos(contatos.filter(contat => contat.id !== id));
    } catch (err) {
      alert('Erro ao deletar contato, tente novamente');
    }
  }

  async function handleUpdateContato(id: Number) {
    localStorage.setItem('id', `${id}`);
  }

  return (
    <div className="list-container">
      <header>
        <h2>Agenda</h2>
        <Link to="/editContato"><FiBook />Cadastrar</Link>
      </header>
      <div className="content">
        <table>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th colSpan={2}>Ações</th>
          </tr>
          {contatos.map(contato => (
            <tr key={contato.id}>
              <td>{contato.nome}</td>
              <td>{contato.email}</td>
              <td>{contato.telefone}</td>
              <td>{contato.endereco}</td>
              <td>
                <button onClick={() => handleDeleteContato(contato.id)} type="button">
                  <FiTrash2 />
                </button>
              </td>
              <td>
                <Link to="/editContato" onClick={() => handleUpdateContato(contato.id)} >
                  <FiEdit2 />
                </Link>
              </td>
            </tr>
          )
          )}
        </table>
      </div>
    </div>
  );
}

export default Contatos;