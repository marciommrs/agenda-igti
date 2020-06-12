import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import InputText from "../../components/inputs/input-text";
import {createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
            maxWidth: 500,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);


const EditContato = () => {
    const classes = useStyles();
    const theme = useTheme();

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
        const data = {nome, email, telefone, endereco};
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
        const data = {nome, email, telefone, endereco};
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
                <Link to="/contatos" onClick={handleBack}> <FiArrowLeft/> Voltar </Link>
            </header>

            <form>
                <div className="alignCenter">
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputText className={classes.formControl} id="nome" label="Nome" value={nome}
                                       change={setNome}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputText className={classes.formControl} id="email" label="E-mail" value={email}
                                       change={setEmail}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputText className={classes.formControl} id="telefone" label="Telefone" value={telefone}
                                       change={setTelefone}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputText className={classes.formControl} id="endereco" label="Endereco" value={endereco}
                                       change={setEndereco}></InputText>
                        </FormControl>
                    </div>
                    <button onClick={acao === 'Cadastrar' ? handleInsertContato : handleUpdateContato}
                            className="button" type="submit">{acao}</button>
                </div>
            </form>

        </div>
    );
}

export default EditContato;