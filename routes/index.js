var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {  
  res.render('index', { title: 'Agenda de Contatos' });
});

module.exports = router;
