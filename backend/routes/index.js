var express = require('express');
var router = express.Router();
const formRoutes = require('./form/formRoutes');


router.get('/', async function(req, res, next) {
 
    res.status(200).send("hello bro");

});


router.use('/form', formRoutes);

module.exports = router;
