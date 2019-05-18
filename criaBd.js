var mysql = require('mysql');
const MinhaCon = require('./conexao');

const criarBase = function(){
    let con = mysql.createConnection({
        host: MinhaCon.meuHost,
        user: MinhaCon.meuUsuario,
        password: MinhaCon.minhaSenha,
        port: MinhaCon.minhaPorta
    });

    con.connect(function(err) {
        if(err) throw err;
        console.log("Conectado no MySql!");
        con.query("CREATE DATABASE IF NOT EXISTS " + MinhaCon.minhaBase,
        function(err, result){
            if (err) throw err;
            console.log("Base de dados criada ou já existente!");
    
            con = mysql.createConnection({
                host: MinhaCon.meuHost,
                user: MinhaCon.meuUsuario,
                password: MinhaCon.minhaSenha,
                database: MinhaCon.minhaBase
            });
            con.connect(function(err){
                if(err) throw err;
                console.log("Conectado na Base " + MinhaCon.minhaBase + " !");
                
                var sql = "CREATE TABLE IF NOT EXISTS agenda (age_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, age_nome VARCHAR(255), age_email VARCHAR(255), age_telefone VARCHAR(255))"                
                con.query(sql, function(err, result){
                    if (err) throw err;
                    console.log("Tabela criada ou já existente!");                
                });
                
                sql = 'DROP procedure IF EXISTS AgendaAddOrEdit'
                con.query(sql, function(err,result){
                    if (err) throw err;
                    console.log("Excluisão da Procedure case exista!");                
                });

                sql = "CREATE PROCEDURE AgendaAddOrEdit ("
                sql += "IN _age_id INT,"
                sql += "IN _age_nome VARCHAR(255),"
                sql += "IN _age_email VARCHAR(255),"
                sql += "IN _age_telefone VARCHAR(255)"
                sql += ") " + String.fromCharCode(10)
                sql += "BEGIN" + String.fromCharCode(10)
                sql += "IF _age_id = 0 THEN" + String.fromCharCode(10)
                sql += "INSERT INTO agenda (age_nome, age_email, age_telefone) "
                sql += "VALUES (_age_nome, _age_email, _age_telefone);" + String.fromCharCode(10)
                sql += "SET _age_id = LAST_INSERT_ID();" + String.fromCharCode(10)
                sql += "ELSE" + String.fromCharCode(10)
                sql += "UPDATE agenda "
                sql += "SET "
                sql += "age_nome = _age_nome, "
                sql += "age_email = _age_email, "
                sql += "age_telefone = _age_telefone "
                sql += "WHERE age_id = _age_id;"  + String.fromCharCode(10)
                sql += " END IF;" + String.fromCharCode(10)
                sql += " SELECT _age_id AS 'age_id';" + String.fromCharCode(10)
                sql += "END"

                con.query(sql, function(err,result){
                    if (err) throw err;
                    console.log("Procedure criada ou já existente!");                
                });

				sql = "INSERT INTO agenda (age_nome, age_email, age_telefone)VALUES ('A','a@a.com','00-000-000');"
				con.query(sql, function(err,result){
                    if (err) throw err;
                    console.log("Insert Contato A!");                
                });

				sql = "INSERT INTO agenda (age_nome, age_email, age_telefone)VALUES ('B','b@b.com','11-1111-1111');"
				con.query(sql, function(err,result){
                    if (err) throw err;
                    console.log("Insert Contato B!");                
                });

                sql = "INSERT INTO agenda (age_nome, age_email, age_telefone)VALUES ('C','c@c.com','22-2222-2222');"
				con.query(sql, function(err,result){
                    if (err) throw err;
                    console.log("Insert Contato C!");                
                });

            });
        });
        con.end;
    });    
}

criarBase();