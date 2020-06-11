import express from 'express';
import ContatosController from './controllers/ContatoController';

const routes = express.Router();

const contatosController = new ContatosController();
routes.get('/contatos', contatosController.index);
routes.get('/contatos/:id', contatosController.show);
routes.post('/contatos', contatosController.create);
routes.delete('/contatos/:id', contatosController.delete);
routes.put('/contatos/:id', contatosController.update);

export default routes;