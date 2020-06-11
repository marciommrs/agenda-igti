import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

const EditContato = () => {
  const history = useHistory();
  const id_param = localStorage.getItem('id');

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const [acao, setAcao] = useState('');

  useEffect(() => {
    if (id_param) {
      api.get(`/contatos/${id_param}`)
        .then(response => {
          setId(response.data.id);
          setNome(response.data.nome);
          setEmail(response.data.email);
          setTelefone(response.data.telefone);
          setEndereco(response.data.endereco);
          setAcao('Alterar');
        })
    } else {
      setAcao('Cadastrar');
    }
  }, [id_param]);

  async function handleInsertContato(e: any) {
    e.preventDefault();
    const data = { nome, email, telefone, endereco };
    try {
      await api.post('/contatos/', data);
      localStorage.clear();
      history.push('/contatos');
    } catch (err) {
      alertify.error('Ocorreu um erro ao cadastrar o contato.');
    }
  }

  async function handleUpdateContato(e: any) {
    e.preventDefault();
    const data = { nome, email, telefone, endereco };
    try {
      await api.put(`/contatos/${id}`, data);
      localStorage.clear();
      history.push('/contatos');
    } catch (err) {
      
      alert('Ocorreu um erro ao atualizar o contato.');
    }
  }

  function handleBack(e: any) {
    localStorage.clear();
  }

  return (
    <div className="register-container">
      <header>
        <h2>Cadastrar Contato</h2>
        <Link to="/contatos" onClick={handleBack}> <FiArrowLeft /> Voltar </Link>
      </header>
      <div className="content">
        <form>
          <div className="input-group">
            <label htmlFor="nome" >Nome</label>
            <input value={nome} onChange={e => setNome(e.target.value)}/>
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="telefone">Telefone</label>
            <input value={telefone} onChange={e => setTelefone(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="endereco">Endereço</label>
            <input value={endereco} onChange={e => setEndereco(e.target.value)}/>
          </div>
        <button onClick={acao === 'Cadastrar'?handleInsertContato:handleUpdateContato} className="button" type="submit">{acao}</button>
        </form>
      </div>
    </div>
  );
}

export default EditContato;