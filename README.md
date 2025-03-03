# Gerenciamento de Livros e Autores

Este projeto tem como objetivo a criação de uma aplicação que gerencie livros e autores com funcionalidades de CRUD (Create, Read, Update, Delete). A aplicação foi desenvolvida utilizando React e TypeScript.

A aplicação é responsiva e pode ser utilizada tanto em dispositivos móveis quanto em desktop. O gerenciamento de estado e a persistência de dados garantem que a aplicação funcione corretamente em diferentes sessões do navegador.

## Funcionalidades

### Livros:
- Criar um livro (utilizando modal).
- Visualizar todos os livros em uma tabela.
- Visualizar os detalhes de um livro específico em um modal.
- Excluir um livro com confirmação via alerta.

### Autores:
- Criar um autor (utilizando modal).
- Visualizar todos os autores em uma tabela.
- Visualizar os detalhes de um autor específico em um modal.
- Excluir um autor com confirmação via alerta.

### Relacionamento entre livros e autores:
- Um livro deve ter um autor relacionado.

## Tecnologias e Dependências

- **React** (para criação de componentes)
- **Radix** (para criação da UI)
- **TypeScript** (para tipagem estática e melhorar a manutenção do código)
- **React Hook Form** ou **Redux Form** (para gerenciar os formulários de entrada)
- **TanStack Table** (para exibir os dados em tabelas de maneira eficiente)
- **React Context API** (para gerenciar o estado global)
- **Local Storage** (para persistir os dados localmente no navegador)
- **ESLint** (para análise de código e detecção de erros)
- **Prettier** (para formatação do código)

### Dependências:

npm install react react-dom react-scripts typescript @tanstack/react-table react-hook-form

### Dependências:

- `npm install react react-dom react-scripts typescript @tanstack/react-table react-hook-form`

### Dependências de Desenvolvimento:

- `npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks`

## Como Rodar o Projeto

1. **Clone o repositório:**
   - Execute o comando: `git clone https://github.com/leoo1992/biblioteca`

2. **Instale as dependências:**
   - Navegue até a pasta do projeto e execute o comando: `npm install`

3. **Execute o projeto:**
   - Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando: `npm run dev`

4. **Acesse a aplicação:**
   - Abra o navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação em execução.

5. **Se preferir - foi feito o deploy no link abaixo:**

- [https://biblioteca-pi.vercel.app/](https://biblioteca-pi.vercel.app/)