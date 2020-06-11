export interface Contato {
  id: number,
  nome: string,
  email: string,
  telefone: string,
  endereco: string
}

const contatos = <Contato[]>[
  {
    id: 1,
    nome: 'Leandro Barcelos',
    email: 'l.barcelos@gmail.com',
    telefone: '9988-5566',
    endereco: 'SOF Sul'
  },
  {
    id: 2,
    nome: 'Luis Gonzales',
    email: 'luis.gonzales@gmail.com',
    telefone: '98586-6655',
    endereco: 'CSD 05 Casa 10, Taguatinga'
  },
  {
    id: 3,
    nome: 'Maria Henriqueta',
    email: ' mariazinha@gmail.com',
    telefone: '9889-6655',
    endereco: 'QNP 13 Conj. 5 Casa 7, Ceilândia'
  },
  {
    id: 4,
    nome: 'João Batista',
    email: 'basita.j@hotmail.com',
    telefone: '98541-3256',
    endereco: 'Lua, lado claro, cratera n˚ 5'
  },
];

export default contatos;