const express = require('express');
const router = express.Router();
const PsicologoControllers = require('../controllers/PsicologoControllers');
//get
router.get('/', PsicologoControllers.Principal);
//Gonzalo
router.get('/EditarPerfil',PsicologoControllers.EditarDatos);
//Post
//Gonzalo
router.post('/EditarPerfil', PsicologoControllers.EditarDatosPsicologoPost);
//Gonzalo
router.post('/EditarPass', PsicologoControllers.EditarPass);
//Roberto
router.post('/Enlace', PsicologoControllers.EnlazarPaciente);

router.post('/Resumenes',PsicologoControllers.Resumenes);
module.exports= router;