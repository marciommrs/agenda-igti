import { Request, Response } from 'express';
import contatos from './samples/contatos';

let sequence = 5;

class ContatosController {

  async index(request: Request, response: Response) {
    return response.json(contatos);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const contato = contatos.find(contato => contato.id == Number(id));
    return response.json(contato);
  }

  async create(request: Request, response: Response) {
    const data = request.body;
    const contato = {
      id: ++sequence,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco
    };
    contatos.push(contato);
    return response.json(contato);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    var index = contatos.findIndex(c => c.id == Number(id));
    contatos.splice(index, 1);
    return response.json("Registro excluído");
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, email, telefone, endereco } = request.body;

    let contato = contatos.find(contato => contato.id == Number(id));
    if (contato) {
      contato.nome = nome;
      contato.email = email;
      contato.telefone = telefone;
      contato.endereco = endereco;
      return response.json({
        message: "Registro alterado.",
        contato: contato
      });
    }
    return response.json("Registro não encontrado.");
  }
}

export default ContatosController;