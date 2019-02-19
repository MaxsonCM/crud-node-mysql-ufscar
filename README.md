# CRUD Nodejs & Express with Mysql

[Versão em português](https://github.com/MaxsonCM/crud-node-mysql-ufscar/blob/master/README-PT.md)

Exercise of the WEB discipline of the Specialization Course in Software Engineering 2018-2019.

## HOW TO INSTALL AND EXECUTE THE PROJECT

**What you will need ?**

* [Nodejs](https://nodejs.org/en/)
* [Xampp with MySql](https://www.apachefriends.org/pt_br/download.html)
* [Git (to copy the project)](https://git-scm.com/)
* [copy of the project](https://github.com/MaxsonCM/crud-node-mysql-ufscar)

With Git installed run the code below in the terminal
```bash
git clone https://github.com/MaxsonCM/crud-node-mysql-ufscar.git
```

**After copying the project and installation of Node Js from the terminal `into the project folder` and run the following command:**

```bash
npm install
```

The configuration of the database is in the `conexao.js` file, if mysql is in another configuration, you only need to change it.

After installing the module dependencies, **still in the terminal** execute the command.
```bash
node criaBd.js
```

This modules will create the database in MySql and will also create some records for testing.

Make sure you verify that the MySql service is installed and active.

![Imagem XAMPP Control Panel](https://docs.google.com/uc?id=10wtb_CHi55JO8js_iglx7wBkUlhAuiL6)

If all was right, the following messages will be displayed via the terminal.
```bash
Conectado no MySql!
Base de dados criada ou já existente!
Conectado na Base meuBd !
Tabela criada ou já existente!
Procedure criada ou já existente!
```
Probably the execution of the command to create the database does not finish and if necessary, force the termination of the execution of the end by pressing the Ctrl + C keys.


If all is right, we can execute the project with the command below.
```bash
npm start
```
`NOTE 1: The default server port is 3000 and is found in the app.js file.`

`NOTE 2: It may be necessary to install the nodemon dependency, because it is a dependency used for development.`

```bash
npm install nodemon -g
```

## Workflow

### Contact list
![Image Contact list](https://docs.google.com/uc?id=1NnCkIPci5F0CyGOUsW5oLVFM3GG__7Fw)

### New Contact
![Image New Contact](https://docs.google.com/uc?id=1yYZ2WJckPCf_AvJg76FFWvmEqrfxik7P)

### Edit Contact
![Image Edit Contact](https://docs.google.com/uc?id=1bnaG5RHWgKr9f7by7h26fUC-80B8ktqT)

## Example of use as API

**The following Examples are basic, does not have token encryption or validation.**

* Example POST command using [Postman](https://www.getpostman.com/) to retrieve a contact.

```bash
POST: localhost:3000/agenda/api/contato/1
```
![Image post command](https://docs.google.com/uc?id=1oo_Uxi6PfKvtSFvlIk0LJuDZlrpyoKR9)

* Example PUT command using Postman to change a contact.
* With the same method you can insert a new contact by inhibiting the age_id element or leaving it with 0.

```bash
PUT: localhost:3000/agenda/api
```

Body of PUT type JSON
```bash
{
    "age_id": 2,
    "age_nome": "e",
    "age_email": "e@e.com",
    "age_telefone": "11"
}
```
![Image put command](https://docs.google.com/uc?id=19d1QCeCC2p2vznRnbAPSWg-9eUHkswWr)

* Example DELETE command using Postman to delete a contact.


```bash
DELETE: localhost:3000/agenda/api/3
```
![Image delete command](https://docs.google.com/uc?id=1fjYxZvpoQHsXzqWBxOz2Adi6LHBjECDM)
