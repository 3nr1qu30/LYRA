const encrypt = require('../helpers/EncriptarContraseñas');
const querys = require('../sql/Querys');
const Controllers={};
//Get 
//Enrique
Controllers.IndexGet= async(req,res,next)=>{
  req.session.destroy();
  try{
    const FAQS = await querys.BuscarFAQSTodas(); 
    res.render('Index',{FAQS});
  }catch(error){
    console.log(error);
  }
};
//Marco
Controllers.RegistroPacientesGet=(req,res,next)=>{
    const alerta = req.query.alerta;
    res.render('RegistroPacientes',{alerta});
};

Controllers.PruebaAudioGet=(req,res,next)=>{
  res.render('prueba')
}

//Marco
Controllers.InicioSesionGet=(req,res,next)=>{
  req.session.destroy();
  const alerta = req.query.alerta;
  res.render('InicioSesion',{alerta});
};
//Marco
Controllers.RegistroPsicolosGet=(req,res,next)=>{
  const alerta = req.query.alerta;
  res.render('RegistroPsicologos',{alerta});
}
//Post
//Marco
Controllers.RegistroPacientesPost = async (req, res, next) => {
  const { Nombre, Apellidos, Edad, Sexo, Usuario, Correo, Pass } = req.body;

  try {
    const usuarioExistente = await querys.buscarUsuario(Usuario);
    
    if (usuarioExistente.length > 0) {
      return res.redirect('/RegistroPacientes?alerta=Usuario ya registrado');
    }

    await querys.RegistrarUsuarios(Nombre, Apellidos, Edad, Sexo, Correo, Usuario, Pass,2);
    return res.redirect('/RegistroPacientes?alerta=Usuario registrado');
  } catch (error) {
    console.error(error);
    return res.redirect('/RegistroPacientes?alerta=Error Servidor');
  }
}
//Marco
Controllers.RegistroPsicologosPost = async (req, res, next) => {
  const { Nombre, Apellidos, Edad, Sexo, Usuario, Correo, Pass } = req.body;

  try {
    const usuarioExistente = await querys.buscarUsuario(Usuario);
    
    if (usuarioExistente.length > 0) {
      return res.redirect('/RegistroPsicologos?alerta=Usuario ya registrado');
    }

    await querys.RegistrarUsuarios(Nombre, Apellidos, Edad, Sexo, Correo, Usuario, Pass,1);
    return res.redirect('/RegistroPsicologos?alerta=Usuario registrado');
  } catch (error) {
    console.error(error);
    return res.redirect('/RegistroPsicologos?alerta=Error Servidor');
  }
}

//Isaac
Controllers.InicioSesionPost = async (req, res, next) => {
  const { Usuario, Pass } = req.body;
  
  try {
    const usuarioExistente = await querys.buscarUsuario(Usuario);

    if (usuarioExistente.length > 0 /* && await encrypt.compare(Pass, usuarioExistente[0].pass )*/){
      const idTipoUsuario = usuarioExistente[0].id_tipo_usuario;
      req.session.usuario=Usuario;
      req.session.tipo_usuario=idTipoUsuario;
      switch (idTipoUsuario) {
        case 1:
          res.redirect('/Psicologo');
          break;
        case 2:
          res.redirect('/Paciente');
          break;
        case 3:
          res.redirect('/Soporte/GerenteSoporte');
          break;
        case 4:
          res.redirect('/Soporte/GerenteMantenimiento');
          break;
        case 5:
          res.redirect('/Soporte/IngenieroSoporte')
          break;
        case 6:
          res.redirect('/Soporte/IngenieroMantenimiento')
          break;
        case 7:
          res.redirect('/Soporte/Asistente');
          break;
        case 8:
          // Código para usuario de tipo 8
          break;
        default:
          // Código para otro caso
      }
      
    }else{
      return res.redirect('/InicioSesion?alerta=Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error(error);
    return res.redirect('/InicioSesion?alerta=Error Servidor');
  }
};


module.exports = Controllers;