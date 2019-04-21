const mysql = require('mysql');
const MinhaCon = require('../conexao');

var con = mysql.createConnection({
    host: MinhaCon.meuHost,
    user: MinhaCon.meuUsuario,
    password: MinhaCon.minhaSenha,
    database: MinhaCon.minhaBase,
    multipleStatements: true
});
con.connect((err)=>{
    if(!err)
        console.log("Conectado na Base " + MinhaCon.minhaBase + " !");
    else
        console.log("Conexão Falhou ! Erro: " + JSON.stringify(err, undefined, 2));
});


var agendaController = {};

agendaController.list = function (req, res) {
    let meuWhere = ""
    let contato = {filtro, nome, email, telefone} = req.query
    
    if (contato.filtro !== undefined ){
        if (contato.filtro.length > 0){
            meuWhere = " ( age_nome LIKE '%" + contato.filtro + "%' OR\
            age_email LIKE '%" + contato.filtro + "%' OR\
            age_telefone LIKE '%" + contato.filtro + "%')"
        }
    }
    if (contato.nome !== undefined ){
        if (contato.nome.length > 0){
            if (meuWhere.length > 0) meuWhere += " AND "
            meuWhere += " age_nome LIKE '%" + contato.nome + "%' "
        }
    }
    if (contato.email !== undefined ){
        if (contato.email.length > 0){
            if (meuWhere.length > 0) meuWhere += " AND "
            meuWhere += " age_email LIKE '%" + contato.email + "%' "
        }
    }
    if (contato.telefone !== undefined ){
        if (contato.telefone.length > 0){
            if (meuWhere.length > 0) meuWhere += " AND "
            meuWhere += " age_telefone LIKE '%" + contato.telefone + "%' "
        }
    }
    if (meuWhere.length > 0) {
        meuWhere = " WHERE " + meuWhere
    }
    con.query('SELECT * FROM agenda ' + meuWhere + ' ORDER BY age_nome, age_id',(err, agenda, fields)=>{
        if (!err){
            //console.log("List");
            //res.send(rows);
            res.render("../views/agenda/index", {agenda: JSON.parse(JSON.stringify(agenda))});
        }else{
            console.log(err);
        }
    })
};

agendaController.create = function(req, res) {
    res.render("../views/agenda/create");
};

agendaController.edit = function (req, res) {
    con.query('SELECT * FROM agenda WHERE age_id = ?', [req.params.id], (err, contato, fields)=>{
        if (!err){
            //res.send(rows);
            res.render("../views/agenda/edit", {contato: contato});
        }else{
            console.log(err);
        }
    })
};

agendaController.delete = function (req, res) {
    con.query('DELETE FROM agenda WHERE age_id = ?',[req.params.id],(err, rows, fields)=>{
        if (!err){            
            console.log("Excluir id: " + [req.params.id]);
            //res.send('Contato Deletado');
            res.redirect("/agenda");
        }else{
            console.log(err);
        }
    })
};

agendaController.save = function (req, res) {
    let contato = {age_id, age_nome, age_email, age_telefone } = req.body;
    var sql = "SET @age_id = ?; SET @age_nome = ?; SET @age_email = ?; SET @age_telefone = ?; \
    CALL AgendaAddOrEdit(@age_id, @age_nome, @age_email, @age_telefone);";
    
    if (contato.age_id == undefined || contato.age_id == null) {
        contato.age_id = 0
    }
    if (contato.age_email == undefined || contato.age_email == null) {
        contato.age_email = ""
    }
    if (contato.age_telefone == undefined || contato.age_telefone == null) {
        contato.age_telefone = ""
    }
    if (contato.age_nome == undefined || contato.age_nome == null){
        contato.age_nome = ""
    }
    con.query(sql,[contato.age_id, contato.age_nome, contato.age_email, contato.age_telefone],(err, rows, fields) => {
        if (!err){                
            //res.redirect("/agenda/show/" + rows[1].age_id);
            res.redirect("/agenda");
        }else{
            console.log(err);
            res.render("../views/agenda/create");
        }
    })
};

agendaController.update = function (req, res) {
    let contato = {age_id, age_nome, age_email, age_telefone } = req.body;    
    //console.log("Recebido: " , contato);
    var sql = "SET @age_id = ?; SET @age_nome = ?; SET @age_email = ?; SET @age_telefone = ?; \
    CALL AgendaAddOrEdit(@age_id, @age_nome, @age_email, @age_telefone);";
    if (contato.age_id == undefined || contato.age_id == null){
        contato.age_id = req.params.id
    }
    if (contato.age_nome == undefined || contato.age_nome == null) {
        contato.age_nome = ""
    }
    if (contato.age_email == undefined || contato.age_email == null) {
        contato.age_email = ""
    }
    if (contato.age_telefone == undefined || contato.age_telefone == null) {
        contato.age_telefone = ""
    }
    if (contato.age_id == undefined || contato.age_id == null){
        res.send("ID é obrigatório");
    }else{
        if (contato.age_id != 0) {
            con.query(sql,[contato.age_id, contato.age_nome, contato.age_email, contato.age_telefone],(err, rows, fields) => {
                if (!err){
                    //console.log("Alterado id: " + contato.age_id);
                    res.redirect("/agenda");
                }else{
                    console.log('Erro: ' + err);
                }
            })
        }else{
            //não foi passado ID
            console.log('Id não passado');
        }
    }
};


agendaController.listAPI = function (req, res) {
    let meuWhere = ""
    let contato = {filtro, nome, email, telefone, id} = req.query
    
    if ([req.params.filtro] !== undefined ){
        let filtro = [req.params.filtro]
        if (filtro.length  > 0){
            meuWhere = " ( age_nome LIKE '%" + filtro + "%' OR\
            age_email LIKE '%" + filtro + "%' OR\
            age_telefone LIKE '%" + filtro  + "%')"
        }
    }
    if (contato.filtro !== undefined ){
        if (contato.filtro.length > 0){
            meuWhere = " ( age_nome LIKE '%" + contato.filtro + "%' OR\
            age_email LIKE '%" + contato.filtro + "%' OR\
            age_telefone LIKE '%" + contato.filtro + "%')"
        }
    }
    if (contato.nome !== undefined ){
        if (contato.nome.length > 0){
            if (meuWhere.length > 0) meuWhere += " AND "
            meuWhere += " age_nome LIKE '%" + contato.nome + "%' "
        }
    }
    if (contato.email !== undefined ){
        if (contato.email.length > 0){
            if (meuWhere.length > 0) meuWhere += " AND "
            meuWhere += " age_email LIKE '%" + contato.email + "%' "
        }
    }
    if (contato.telefone !== undefined ){
        if (contato.telefone.length > 0){
            if (meuWhere.length > 0) meuWhere += " AND "
            meuWhere += " age_telefone LIKE '%" + contato.telefone + "%' "
        }
    }
    if (contato.id !== undefined ){
        if (contato.id.length > 0){
            if (meuWhere.length > 0) meuWhere += " AND "
            meuWhere += " age_id = '" + contato.id + "'"
        }
    }
    if (meuWhere.length > 0) {
        meuWhere = " WHERE " + meuWhere
    }
    con.query('SELECT * FROM agenda ' + meuWhere + ' ORDER BY age_nome, age_id',(err, agenda, fields)=>{
        if (!err){
            res.send(agenda);
        }else{
            console.log(err);
            res.send();
        }
    })
};

agendaController.showApi = function (req, res) {
    con.query('SELECT * FROM agenda WHERE age_id = ?', [req.params.id], (err, contato, fields)=>{
        if (!err){
            if (contato.length > 0){
                res.send(contato);
            }else{
                res.send({Result: "Sem correnpondencia"});
            }
        }else{
            res.send({erro: "erro"});
            console.log(err);
        }
    })
};


//Updade
//put para localhost:3000/agenda
/* enviar como json o conteúdo
{
	"age_id": 2,
	"age_nome": "a",
	"age_email": "a@2.com",
	"age_telefone": "00"
}
*/
agendaController.saveApi = function (req, res) {
    let contato = {age_id, age_nome, age_email, age_telefone } = req.body;
    
    var sql = "SET @age_id = ?; SET @age_nome = ?; SET @age_email = ?; SET @age_telefone = ?; \
    CALL AgendaAddOrEdit(@age_id, @age_nome, @age_email, @age_telefone);";
    
    if (contato.age_id == undefined || contato.age_id == null) {
        contato.age_id = 0 //novo contato
    }
    if (contato.age_nome == undefined || contato.age_nome == null) {
        contato.age_nome = ""
    }
    if (contato.age_email == undefined || contato.age_email == null) {
        contato.age_email = ""
    }
    if (contato.age_telefone == undefined || contato.age_telefone == null) {
        contato.age_telefone = ""
    }
    con.query(sql,[contato.age_id, contato.age_nome, contato.age_email, contato.age_telefone],(err, rows, fields) => {
        if (!err){
            contato.age_id = rows.map(function () {return age_id})[0]
            res.send(contato);
        }else{
            console.log('Erro: ' + err);
        }
    })
};


agendaController.deleteAPI = function (req, res) {
    con.query('DELETE FROM agenda WHERE age_id = ?',[req.params.id],(err, rows, fields)=>{
        if (!err){   
            //console.log("Linhas afetadas: " + rows.affectedRows)
            res.send({sucesso: true, mensagem: ""});
        }else{
            res.send({sucesso: false, mensagem: err});
            console.log(err);
        }
    })
};

/*
agendaController.Conectado = function () {
    if (con.state === 'disconnected') {
        res.jason({Result: false})
    }else{
        res.jason({Result: true})
    }
}

agendaController.checkDB = function (req, res) {
    con.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '" + MinhaCon.minhaBase + "'", [req.params.id], (err, bd, fields)=>{
        if (!err){
            if (bd.length > 0){
                res.jason({Result: true})
            }else{
                res.jason({Result: false})
            }
        }else{
            res.jason({Result: false})
        }
    })
}
*/
module.exports = agendaController;