# CRUD Nodejs & Express com Mysql

Exercício da disciplina de WEB do Curso de Especialização em Engenharia de Software 2018-2019.

## INSTAÇÃO E EXECUÇÃO DO PROJETO

**Para que o projeto funcione devidamente será necessário ter instalado os seguintes programas**

* [Nodejs](https://nodejs.org/en/)
* [Xampp Com MySql](https://www.apachefriends.org/pt_br/download.html)
* [Git (para realizar a cópia do projeto)](https://git-scm.com/)
* [Cópia do projeto](https://github.com/MaxsonCM/crud-node-mysql-ufscar)

Para copiar o código fonte com o Git basta usar o comando para clonar o projeto segue o exemplo.
```bash
git clone https://github.com/MaxsonCM/crud-node-mysql-ufscar.git
```

**Após copiado o projeto e instalação do Nodejs entre no terminal `na pasta do projeto` e execute o comando a seguir:**

```bash
npm install
```
A configuração do banco de dados fica no arquivo conexao.js, caso o mysql esteja com outra configuração, só é necessário alterá-lo.

Após a instalação das dependências dos módulos, **ainda no terminal** execute o comando.
```bash
node criaBd.js
```
Esse módulas criará o banco de dados no MySql e também criará alguns registros para teste.

Lembre-se de verificar se o serviço do MySql está instalado e ativo e na porta padrão 3306.

![Imagem XAMPP Control Panel](https://docs.google.com/uc?id=10wtb_CHi55JO8js_iglx7wBkUlhAuiL6)

Caso necessário é possível alterar as configuração da conexão do banco de dados pelo arquivo `conexao.js`

Caso tudo estava certo será exibida as seguintes mensagens via terminal.
```bash
Conectado no MySql!
Base de dados criada ou já existente!
Conectado na Base meuBd !
Tabela criada ou já existente!
Procedure criada ou já existente!
```
Provavelmente a execução do comando de criar o banco de dados não termine e se for necessário, forçar o termino da execução do terminar pressionando as teclas Ctrl + C.


Agora que temos as dependências do projeto instalado e o banco de dados criado, podemos executar o projeto com o comando.
```bash
npm start
```
`OBS 1: A porta padrão deixado para subir o servidor do node é a 3000 e se encontra no arquivo app.js.`

`OBS 2: pode ser que seja necessário instalar a dependência nodemon, por ser uma dependência usada para o desenvolvimento.`

```bash
npm install nodemon -g
```

## Fluxo de trabalho

### Lista de Contatos da Agenda
![Imagem Lista de Contatos](https://docs.google.com/uc?id=1NnCkIPci5F0CyGOUsW5oLVFM3GG__7Fw)

### Novo Contato
![Imagem Novo Contato](https://docs.google.com/uc?id=1yYZ2WJckPCf_AvJg76FFWvmEqrfxik7P)

### Editar Contato
![Imagem Editar Contato](https://docs.google.com/uc?id=1bnaG5RHWgKr9f7by7h26fUC-80B8ktqT)

## Possibilidade de uso como API

**Os Exemplos a seguir são básicos, pois não possui criptografia ou validação via token.**


* Exemplo comando POST usando o PostMan para recuperar um contato.

`POST: localhost:3000/agenda/api/contato/16`
![Imagem postman post](https://docs.google.com/uc?id=1oo_Uxi6PfKvtSFvlIk0LJuDZlrpyoKR9)

* Exemplo comando PUT usando o PostMan para alterar um contato o mesmo metodo pode inserir um contato novo inibindo o elemento age_id ou o deixando com 0.

`PUT: localhost:3000/agenda/api`

Body do PUT tipo JSON
```bash
{
    "age_id": 16,
    "age_nome": "e",
    "age_email": "e@e.com",
    "age_telefone": "11"
}
```
![Imagem postman put alterar](https://docs.google.com/uc?id=19d1QCeCC2p2vznRnbAPSWg-9eUHkswWr)

* Exemplo comando DELETE usando o PostMan para excluir um contato.

`DELETE: localhost:3000/agenda/api/17`
![Imagem postman delete](https://docs.google.com/uc?id=1fjYxZvpoQHsXzqWBxOz2Adi6LHBjECDM)
