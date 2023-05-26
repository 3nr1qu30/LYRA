const express = require('express');
const router = express.Router();
const PrincipalControllers = require('../controllers/PrincipalControllers');
//get
router.get('/', PrincipalControllers.IndexGet);
//Marco
router.get('/RegistroPacientes',PrincipalControllers.RegistroPacientesGet);
//Marco
router.get('/RegistroPsicologos',PrincipalControllers.RegistroPsicolosGet);

//Pruebas para conversion de audio a base64 y viceversa
router.get('/prueba',PrincipalControllers.PruebaAudioGet);

//Marco
router.get('/InicioSesion',PrincipalControllers.InicioSesionGet);
//Post
//Marco
router.post('/RegistroPacientes',PrincipalControllers.RegistroPacientesPost);
//Marco
router.post('/RegistroPsicologos',PrincipalControllers.RegistroPsicologosPost);
//Marco
router.post('/InicioSesion',PrincipalControllers.InicioSesionPost);
module.exports= router;