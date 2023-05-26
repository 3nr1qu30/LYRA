const querys = require('../sql/Querys');
const Controllers={};

function formatearFechaHora(fecha) {
  const fechaObj = new Date(fecha);

  const dia = fechaObj.getDate().toString().padStart(2, '0');
  const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
  const año = fechaObj.getFullYear().toString();
  const hora = fechaObj.getHours().toString().padStart(2, '0');
  const minutos = fechaObj.getMinutes().toString().padStart(2, '0');

  const formatoFechaHora = `Fecha: ${dia}/${mes}/${año} Hora: ${hora}:${minutos}`;

  return formatoFechaHora;
}

//Asistente
Controllers.PaginaPrincipalAsistente =async (req,res,next) => {
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    const GerenteSop = await querys.buscarGerentesSoporte();
    const PacyDoc = await querys.buscarDoctoresyPacientes();
    const Reportes = await querys.BuscarReportesAbiertos();
    res.render('PaginaPrincipalAsistente',{Usuario,TipoUsu,alerta,datosUsuario,PacyDoc,GerenteSop,Reportes,formatearFechaHora});
  }catch(error){
    console.log(error);
  }
};
Controllers.AñadirReporte = async (req,res,next)=>{
  const Usuario = req.session.usuario;
  const {Solicitante,Gerente,Descripcion} = req.body;
  try{
    const Reporte = await querys.AgregarReporte(Solicitante,Usuario,Gerente,Descripcion);
    if (Reporte) {
      return res.redirect('/Soporte/Asistente?alerta=ReporteAgregado')
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Soporte/Asistente?alerta=Error')
  }  
}

//FAQ'S
Controllers.PaginaPrincipalFAQS =async (req,res,next) => {
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario); //si
    const GerenteSop = await querys.buscarGerentesSoporte(); //no
    const PacyDoc = await querys.buscarDoctoresyPacientes(); //no
    const Reportes = await querys.BuscarReportesCerrado(); 
    const FAQS = await querys.BuscarFAQS(Usuario); 
    res.render('PaginaPrincipalFAQS',{Usuario,TipoUsu,alerta,datosUsuario,PacyDoc,GerenteSop,Reportes,formatearFechaHora,FAQS});
  }catch(error){
    console.log(error);
  }
};
Controllers.AñadirFAQ= async (req,res,next)=>{
  const Usuario = req.session.usuario;
  const {Pregunta,Respuesta} = req.body;
  try{
    const Reporte = await querys.AgregarFAQ(Pregunta,Respuesta,Usuario);
    if (Reporte) {
      return res.redirect('/Soporte/EditorFAQ?alerta=FAQAgregada')
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Soporte/EditorFAQ?alerta=Error')
  }  
}
Controllers.AñadirFAQC= async (req,res,next)=>{
  const Usuario = req.session.usuario;
  const {Pregunta2,Respuesta2} = req.body;
  try{
    const Reporte = await querys.AgregarFAQ(Pregunta2,Respuesta2,Usuario);
    if (Reporte) {
      return res.redirect('/Soporte/EditorFAQ?alerta=FAQAgregada')
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Soporte/EditorFAQ?alerta=Error')
  }  
}
Controllers.EliminarFAQ= async (req,res,next)=>{
  const {id_FAQs} = req.body;
  const Usuario = req.session.usuario;
  try{
    const Reporte = await querys.EliminarFAQ(id_FAQs,Usuario);
    if (Reporte) {
      return res.redirect('/Soporte/EditorFAQ?alerta=FAQEliminada')
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Soporte/EditorFAQ?alerta=Error')
  }  
}
Controllers.EditarFAQ= async (req,res,next)=>{
  const {id_FAQs, respuesta, pregunta} = req.body;
  const Usuario = req.session.usuario;
  try{
    const Reporte = await querys.EditarFAQ(id_FAQs,pregunta,respuesta,Usuario);
    if (Reporte) {
      return res.redirect('/Soporte/EditorFAQ?alerta=FAQEditada')
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Soporte/EditorFAQ?alerta=Error')
  }  
}

//Gerente de Soporte
Controllers.PaginaPrincipalGerenteSoporte= async (req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    const ReportesAbiertos = await querys.BuscarReportesAbiertos();
    const GerentesMantenimiento = await querys.buscarGerentesMantenimiento();
    const IngenirosSoporte = await querys.buscarIngenierosSoporte();
    const TodosReportes = await querys.Reportes();
    const MantenimientoFinalizado = await querys.BuscarReporteMantenimientoFinalizado();
    const GerenteSop = await querys.buscarGerentesSoporte();
    res.render('PaginaPrincipalGerenteSoporte',{Usuario,TipoUsu,alerta,datosUsuario,ReportesAbiertos,MantenimientoFinalizado,TodosReportes,GerentesMantenimiento,GerenteSop,IngenirosSoporte,formatearFechaHora});
  }catch(error){
    console.log(error);
  }
};

//Actualizar reportes GerenteSoporte
Controllers.ActualizarReportesGerenteSoporte = async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const {Id_reporte,UsuarioAsignado,Estatus} = req.body;
  try{
    querys.ActualizarReporteGerentes(Id_reporte,UsuarioAsignado,Usuario,Estatus);
    res.redirect('/Soporte/GerenteSoporte?alerta=Reporte Enviado');
  }catch(error){
    console.error(error);
    res.redirect('/Soporte/GerenteSoporte?alerta=Reporte no Enviado');
  }
}

//Actualizar reportes GerenteMantenimiento
Controllers.ActualizarReportesGerenteMantenimiento = async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const {Id_reporte,UsuarioAsignado,Estatus} = req.body;
  try{
    querys.ActualizarReporteGerentes(Id_reporte,UsuarioAsignado,Usuario,Estatus);
    res.redirect('/Soporte/GerenteMantenimiento?alerta=Reporte Enviado');
  }catch(error){
    console.error(error);
    res.redirect('/Soporte/GerenteMantenimiento?alerta=Reporte no Enviado');
  }
}

//Todos los usuario
Controllers.EditarDatos = async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
  const datosUsuario =await querys.buscarUsuario(Usuario);
  res.render('EditarDatosSoporte',{Usuario,TipoUsu,datosUsuario,alerta});
  }catch(error){
    console.error(error);
  }
};

//
Controllers.EditarDatosPost = async(req,res,next)=>{
  const {Nombre,Apellidos,Edad,Sexo,Correo} = req.body;
  const Usuario = req.session.usuario;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    if(datosUsuario.length > 0){
      const ActualizardatosDoctor = await querys.Actualizardatos(datosUsuario[0].id_persona,Nombre,Apellidos,Edad,Sexo,Correo);
      if(ActualizardatosDoctor){
        return res.redirect('/Soporte/EditarPerfil?alerta=Datos Actualizados');    
      }
    }
  }catch(error){
    return res.redirect('/Soporte/EditarPerfil?alerta=Error');
  }
};
//
Controllers.EditarPass = async(req,res,next) =>{
  const Usuario = req.session.usuario;
  const{Pass} = req.body;
  try{
    const PassActualizada = await querys.ActualizarPass(Usuario, Pass);
    if(PassActualizada){
      return res.redirect('/Soporte/EditarPerfil?alerta=Pass Actualizada');
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Soporte/EditarPerfil?alerta=Error Pass');
  }
};
//Gerente de mantenimiento
Controllers.PaginaPrincipalGerenteMantenimiento= async (req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    const ReportesMantenimientoPersonal = await querys.BuscarReportesMantenimientoPersonal(Usuario);
    const ReportesMantenimiento = await querys.BuscarReportesMantenimiento();
    const ReportesFinalizadoMantenimientoPersonal = await querys.BuscarReportesFinalizadoMantenimientoPersonal(Usuario);
    const ReportesFinalizadoMantenimiento = await querys.BuscarReportesFinalizadoMantenimiento();
    const GerentesMantenimiento = await querys.buscarGerentesMantenimiento();
    const IngenirosMantenimiento = await querys.buscarIngenierosMantenimiento();
    const TodosReportes = await querys.BuscarReportesEnviadosGerenteMantenimiento();
    const TodosReportesPersonales = await querys.BuscarReportesEnviadosGerenteMantenimientoPersonal(Usuario);
    const GerenteSop = await querys.buscarGerentesSoporte();
    res.render('PaginaPrincipalGerenteMantenimiento',{
      Usuario,TipoUsu,alerta,datosUsuario,
      ReportesMantenimientoPersonal,ReportesMantenimiento,
      ReportesFinalizadoMantenimientoPersonal,
      ReportesFinalizadoMantenimiento,TodosReportes,
      TodosReportesPersonales,GerentesMantenimiento,
      GerenteSop,IngenirosMantenimiento,formatearFechaHora});
  }catch(error){
    console.log(error);
  }
};
//Ingeniero de mantenimiento
Controllers.PaginaPrincipalIngenieroMantenimiento= async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    const ReportesEnProgramacionPersonal = await querys.BuscarReportesEnProgramacionPersonal(Usuario);
    const ReportesEnProgramacion = await querys.BuscarReportesEnProgramacion();
    const GerentesMantenimiento = await querys.buscarGerentesMantenimiento();
    const GerenteSop = await querys.buscarGerentesSoporte();
    res.render('PaginaPrincipalIngenieroMantenimiento',{Usuario,datosUsuario,TipoUsu,alerta,ReportesEnProgramacion,ReportesEnProgramacionPersonal,GerentesMantenimiento,GerenteSop,formatearFechaHora});

  }catch(error){
    console.error(error)
  }
};

//Actualizar reportes IngenieroMantenimiento
Controllers.ActualizarReportesIngenieroMantenimiento = async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const {Id_reporte,UsuarioAsignado,Estatus,Solucion} = req.body;
  try{
    querys.ActualizarReporteIngenieros(Id_reporte,UsuarioAsignado,Usuario,Estatus,Solucion);
    res.redirect('/Soporte/IngenieroMantenimiento?alerta=Reporte Enviado');
  }catch(error){
    console.error(error);
    res.redirect('/Soporte/IngenieroMantenimiento?alerta=Reporte no Enviado');
  }
}

//Actualizar reportes IngenieroMantenimiento
Controllers.ActualizarReportesIngenieroSoporte = async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const {Id_reporte,Estatus,Solucion} = req.body;
  try{
    querys.ActualizarReporteIngenierosSoporte(Id_reporte,Usuario,Estatus,Solucion);
    res.redirect('/Soporte/IngenieroSoporte?alerta=Reporte Enviado');
  }catch(error){
    console.error(error);
    res.redirect('/Soporte/IngenieroSoporte?alerta=Reporte no Enviado');
  }
}
//Ingeniero Soporte
Controllers.PaginaPrincipalIngenieroSoporte= async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    const ReportesEnProcesoPersonal = await querys.BuscarReportesEnProcesoPersonal(Usuario);
    const ReportesEnProceso = await querys.BuscarReportesEnProceso();
    const GerentesMantenimiento = await querys.buscarGerentesMantenimiento();
    const GerenteSop = await querys.buscarGerentesSoporte();
    res.render('PaginaPrincipalIngenieroSoporte',{Usuario,datosUsuario,TipoUsu,alerta,ReportesEnProceso,ReportesEnProcesoPersonal,GerentesMantenimiento,GerenteSop,formatearFechaHora});

  }catch(error){
    console.error(error)
  }
};
module.exports = Controllers;