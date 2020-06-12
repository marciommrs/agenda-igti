import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import InputText from "../../components/inputs/input-text";

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
            <InputText id="nome" label="Nome" value={nome} change={setNome} />
            <InputText id="email" label="E-mail" value={email} change={setEmail} />
            <InputText id="telefone" label="Telefone" value={telefone} change={setTelefone} />
            <InputText id="endereco" label="Endereco" value={endereco} change={setEndereco}></InputText>
        <button onClick={acao === 'Cadastrar'?handleInsertContato:handleUpdateContato} className="button" type="submit">{acao}</button>
        </form>
      </div>
    </div>
  );
}

export default EditContato;