const express = require('express')
const router = express.Router()

const {sequelize} = require('../model/bd');

router.get('/', async function(req, res) {
    await sequelize.sync({force: true})
    res.json({ title: 'Instalado com sucesso!!!' });
  });

module.exports = router