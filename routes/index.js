var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

//var agenda = require("../controllers/AgendaController.js");

router.get('/', function(req, res) { 
  //var dados = agenda.checkDB
  //console.log ( dados)
  res.render('index', { title: 'AGENDA DE CONTATOS', 
                        data: dateFormat(new Date(), 'dd/mm/yyyy') } 
            );
});

module.exports = router;
