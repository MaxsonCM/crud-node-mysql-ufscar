
var express = require('express');
var router = express.Router();
var agenda = require("../controllers/AgendaController.js");

//GETs
router.get('/', function (req, res) {
    agenda.list(req, res)
});
router.get('/contato/create', function (req, res) {
    agenda.create(req,res)
});
router.get('/contato/edit/:id', function (req, res) {
    agenda.edit(req, res)
});
router.get('/contato/delete/:id', function (req, res) {
    agenda.delete(req, res)
});
router.get('/:filtro', function (req, res) {
    agenda.list(req, res)
});


//POSTs
router.post('/api/contato/:id', function(req, res) {
    agenda.showApi(req, res);
});
router.post('/contato/delete/:id', function (req, res) {
    agenda.delete(req, res)
});
router.post('/contato/update/:id', function (req, res) {
    agenda.update(req, res)
});
router.post('/save', function(req, res) {
    agenda.save(req, res);
});
router.post('/', function (req, res) {
    agenda.list(req, res)
});

//PUTs
router.put('/api', function (req, res) {
    agenda.saveApi(req, res)
});
//DELETEs
router.delete('/api/:id', function (req, res) {
    agenda.deleteAPI(req, res)
});


module.exports = router;