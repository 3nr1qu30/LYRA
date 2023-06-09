const querys = require('../sql/Querys');
const Controllers={};

//Todes
Controllers.Principal =async (req,res,next)=>{
    const Usuario = req.session.usuario;
    const TipoUsu = req.session.tipo_usuario;
    let Enlace='undefined';
    try{
      Enlace =await querys.BuscarEnlaces(Usuario);
      res.render('PaginaPrincipalPacientes',{Usuario,TipoUsu,Enlace});
    }catch{
      res.render('PaginaPrincipalPacientes',{Usuario,TipoUsu,Enlace});
    }
  };

//Gonzalo
Controllers.EditarPerfil = async(req,res,next) =>{
    const Usuario = req.session.usuario;
    const TipoUsu = req.session.tipo_usuario;
    const alerta = req.query.alerta;
    try{
      const datosUsuario =await querys.buscarUsuario(Usuario);
      res.render('EditarDatosPaciente',{Usuario,TipoUsu,datosUsuario,alerta});
    }catch(error){
            console.log(error);
    }
};

//Gonzalo
Controllers.EditarDatosPacientePost = async(req,res,next)=>{
  const {Nombre,Apellidos,Edad,Sexo,Correo} = req.body;
  const Usuario = req.session.usuario;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    if(datosUsuario.length > 0){
      const ActualizardatosDoctor = await querys.Actualizardatos(datosUsuario[0].id_persona,Nombre,Apellidos,Edad,Sexo,Correo);
      if(ActualizardatosDoctor){
        return res.redirect('/Paciente/EditarPerfil?alerta=Datos Actualizados');    
      }
    }
  }catch(error){
    return res.redirect('/Paciente/EditarPerfil?alerta=Error');
  }
};

//Gonzalo
Controllers.EditarPass = async(req,res,next) =>{
  const Usuario = req.session.usuario;
  const{Pass} = req.body;
  try{
    const PassActualizada = await querys.ActualizarPass(Usuario, Pass);
    if(PassActualizada){
      return res.redirect('/Paciente/EditarPerfil?alerta=Pass Actualizada');
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Paciente/EditarPerfil?alerta=Error Pass');
  }
};

Controllers.RegistrarResumen = async(req,res,next)=>{
  const{Resumen,Enlace} = req.body;
  try{
    querys.AgregarResumen(Enlace,Resumen);
  }catch(error){
    console.error(error);
  }
};
/* h*/
module.exports = Controllers;
