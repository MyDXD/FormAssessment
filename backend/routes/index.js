var express = require('express');
var router = express.Router();
const formRoutes = require('./form/formRoutes');
const authRoutes = require('./authRoutes');


router.get('/', async function(req, res, next) {
    res.status(200).send("hello bro");
});


router.use('/form', formRoutes);
router.use('/',authRoutes);


module.exports = router;
