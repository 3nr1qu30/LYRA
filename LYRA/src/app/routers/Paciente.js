const express = require('express');
const router = express.Router();
const PacienteControllers = require('../controllers/PacienteControllers');
//Get
//Todes
router.get('/',PacienteControllers.Principal);

//Gonzalo
router.get('/EditarPerfil',PacienteControllers.EditarPerfil);

//Post

//Gonzalo
router.post('/EditarPerfil', PacienteControllers.EditarDatosPacientePost);

//Gonzalo
router.post('/EditarPass', PacienteControllers.EditarPass);
router.post('/AgregarReporte', PacienteControllers.RegistrarResumen);
module.exports= router;