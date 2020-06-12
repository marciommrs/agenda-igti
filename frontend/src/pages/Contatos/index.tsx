import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FiTrash2, FiEdit2, FiBook} from 'react-icons/fi';


import api from '../../services/api';

import './styles.css';
import EnhancedTable from "../../components/data-table/data-table";

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
            });
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

    async function handleDeleteMultiple(ids: number[]) {
        console.log(ids);
        try {
            await api.delete(`contatos/${ids.join(';')}`);

            setContatos(contatos.filter(contato => {
                for(let id of ids) {
                    return contato.id !== id
                }
            }));
        } catch (err) {
            alert('Erro ao deletar contato, tente novamente');
        }
    }

    return (
        <EnhancedTable data={contatos} deleteMultiple={handleDeleteMultiple} deleteAction={handleDeleteContato} editAction={handleUpdateContato}>
        </EnhancedTable>
    );
}

export default Contatos;