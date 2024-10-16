var express = require('express');
var router = express.Router();
const formRoutes = require('./form/formRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./user/usersRoutes');



router.use('/users', userRoutes)
router.use('/form', formRoutes);
router.use('/',authRoutes);


module.exports = router;
