const mysql = require('mysql2');
const encrypt = require('../helpers/EncriptarContraseñas');
const moment = require('moment-timezone');

const con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "n0m3l0", 
  database: "LYRA"
});

con.connect((err) => {
  if (err) {
    console.error('Error conectando la base de datos:', err);
    throw err;
  }
  console.log('Base de datos conectada');
});

const db = {};
//Consultas

//Enrique
db.BuscarReportesAbiertos = ()=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 1`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesMantenimientoPersonal = (Usuario)=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 3 and r.id_usuario_asignado='${Usuario}'`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesFinalizadoMantenimientoPersonal = (Usuario)=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 5 and r.id_usuario_asignado='${Usuario}'`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

db.BuscarReportesFinalizadoMantenimiento = ()=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 5`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

db.BuscarReportesMantenimiento = ()=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 3`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
//Enrique
db.BuscarReporteMantenimientoFinalizado = ()=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 6`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesEnviadosGerenteMantenimientoPersonal = (Usuario)=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 4 or id_Repore_Estatus=6 and id_usuario_manipulo_Reporte='${Usuario}'`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesEnProgramacionPersonal = (Usuario)=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 4 and id_usuario_asignado='${Usuario}'`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesEnProcesoPersonal = (Usuario)=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 2 and id_usuario_asignado='${Usuario}'`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesEnProceso = (Usuario)=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 2`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesEnProgramacion = (Usuario)=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 4`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesEnviadosGerenteMantenimiento = ()=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 4 or id_Repore_Estatus=6`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarReportesCerrado = ()=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT r.*, re.descripcion_estatus
    FROM Reporte AS r
    JOIN Reporte_Estatus AS re ON r.id_Repore_Estatus = re.id_Reporte_Estatus
    WHERE r.id_Repore_Estatus = 8`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarFAQS = (Usuario)=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM FAQs WHERE id_editor = '${Usuario}'`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.BuscarFAQSTodas = ()=>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM FAQs`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


//Todes
db.buscarUsuario = (nombre_usuario) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM usuario NATURAL JOIN persona where nombre_usuario = ?`, [nombre_usuario], (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.buscarDoctoresyPacientes = () =>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM usuario NATURAL JOIN persona where id_tipo_usuario = 1 or id_tipo_usuario = 2`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//Enrique
db.buscarGerentesSoporte = () =>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM usuario NATURAL JOIN persona where id_tipo_usuario = 3`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

db.buscarGerentesMantenimiento = () =>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM usuario NATURAL JOIN persona where id_tipo_usuario = 4`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

db.buscarIngenierosSoporte = () =>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM usuario NATURAL JOIN persona where id_tipo_usuario = 5`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

db.buscarIngenierosMantenimiento = () =>{
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM usuario NATURAL JOIN persona where id_tipo_usuario = 6`, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//Enrique
db.AgregarReporte =(Id_UsarioSolici,Id_Manupulo,Id_GerenteSo,Descripcion)=>{
  return new Promise(async(resolve, reject) =>{
    // Obtener la fecha y hora actual en la zona horaria de México
    const fechaHoraActual = moment().tz('America/Mexico_City');
    
    // Formatear la fecha y hora en el formato deseado para MySQL (datetime: 'YYYY-MM-DD HH:MM:SS')
    const fechaHoraFormateada = fechaHoraActual.format('YYYY-MM-DD HH:mm:ss');
    

    const query = `INSERT INTO reporte VALUES 
    (default,'${Id_UsarioSolici}','${Id_Manupulo}','${Id_GerenteSo}',1,'${fechaHoraFormateada}','${Descripcion}','')`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
}

//Enrique
db.AgregarFAQ =(Pregunta,Respuesta,Id_editor)=>{
  return new Promise(async(resolve, reject) =>{
    const query = `INSERT INTO FAQs VALUES 
    (default,'${Pregunta}','${Respuesta}','${Id_editor}')`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
}


//Roberto
db.BuscarPacientes = (Paciente)=>{
  return new Promise(async(resolve, reject)=>{
    const query = `SELECT * FROM usuario WHERE nombre_usuario ='${Paciente}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Roberto
db.BuscarEnlaces = (Paciente)=>{
  return new Promise(async(resolve, reject)=>{
    const query = `SELECT * FROM psicologo_paciente where nombre_Paciente ='${Paciente}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Roberto
db.DesplegarPacientes = (Doctor)=>{
  return new Promise(async(resolve, reject) =>{
    const query = `SELECT * FROM vista_pacientes_doctor where nombre_Doctor = '${Doctor}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
};
//Isaac
db.InfoPacientes = (Paciente)=>{
  return new Promise(async(resolve, reject) =>{
    const query = `SELECT * FROM datospaciente where nombre_usuario = '${Paciente}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
};

//Isaac
db.BuscarResumenes=(Paciente)=>{
  return new Promise(async(resolve, reject) =>{
    const query = `SELECT * FROM resumen_conversacion NATURAL JOIN psicologo_paciente where nombre_Paciente ='${Paciente}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
};

//Enrique
db.Reportes=()=>{
  return new Promise(async(resolve, reject) =>{
    const query = `SELECT r.*, e.descripcion_estatus FROM Reporte r JOIN Reporte_Estatus e ON r.id_Repore_Estatus = e.id_Reporte_Estatus;`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
};
// Inserción de datos

// Marcos 
db.RegistrarUsuarios = (nombre, apellido, edad, sexo, correo_electronico, nombre_usuario, pass, id_tipo_usuario) => {
  return new Promise(async(resolve, reject) => {
    const contra = await encrypt.encrypt(pass);
    const query = `CALL agregar_persona_usuario(?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nombre, apellido, edad, sexo, correo_electronico, nombre_usuario, contra, id_tipo_usuario];
    con.query(query, values, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Roberto
db.EnlzarPsicoDoc = (Paciente,Psicologo)=>{
  return new Promise(async(resolve, reject) => {
    const query = `INSERT INTO psicologo_paciente values(default,'${Paciente}','${Psicologo}')`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
};



// Modificación de datos

//Gonzalo
db.ActualizarPass = (Usuario,Pass)=>{
  return new Promise(async(resolve, reject) => {
    const PassEn = await encrypt.encrypt(Pass);
    const query = `UPDATE usuario set pass='${PassEn}' where nombre_usuario='${Usuario}'`;
    con.query(query,(error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// Gonzalo
db.Actualizardatos = (Id_Usuario,Nombre,Apellido,Edad,Sexo,Correo)=>{
  return new Promise(async(resolve, reject)=>{
    const query = `CALL actualizar_persona_usuario(?, ?, ?, ?, ?, ?)`;
    const values = [Id_Usuario,Nombre,Apellido,Edad,Sexo,Correo];
    con.query(query, values, (error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Enrique
db.ActualizarReporteGerentes =(Id_Reporte,UsuarioAsignado,UsuarioManipula,Estado)=>{
  return new Promise(async(resolve, reject)=>{
    // Obtener la fecha y hora actual en la zona horaria de México
    const fechaHoraActual = moment().tz('America/Mexico_City');
    // Formatear la fecha y hora en el formato deseado para MySQL (datetime: 'YYYY-MM-DD HH:MM:SS')
    const fechaHoraFormateada = fechaHoraActual.format('YYYY-MM-DD HH:mm:ss');
    const Estatus=parseInt(Estado) 
    const query = `update reporte set id_usuario_manipulo_Reporte='${UsuarioManipula}', id_Repore_Estatus=${Estatus}, id_usuario_asignado='${UsuarioAsignado}', fecha_hora='${fechaHoraFormateada}' where id_reporte=${Id_Reporte} `;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//Enrique
db.ActualizarReporteIngenieros =(Id_Reporte,UsuarioAsignado,UsuarioManipula,Estado,Solucion)=>{
  return new Promise(async(resolve, reject)=>{
    // Obtener la fecha y hora actual en la zona horaria de México
    const fechaHoraActual = moment().tz('America/Mexico_City');
    // Formatear la fecha y hora en el formato deseado para MySQL (datetime: 'YYYY-MM-DD HH:MM:SS')
    const fechaHoraFormateada = fechaHoraActual.format('YYYY-MM-DD HH:mm:ss');
    const Estatus=parseInt(Estado) 
    const query = `update reporte set id_usuario_manipulo_Reporte='${UsuarioManipula}', id_Repore_Estatus=${Estatus}, id_usuario_asignado='${UsuarioAsignado}', fecha_hora='${fechaHoraFormateada}',solucion_reporte='${Solucion}' where id_reporte=${Id_Reporte} `;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

db.EditarFAQ=(id_FAQs,pregunta,respuesta,Usuario)=>{
  return new Promise(async(resolve, reject)=>{
    const query = `update FAQs set pregunta='${pregunta}', respuesta='${respuesta}' where id_FAQs='${id_FAQs}'  and id_editor='${Usuario}' `;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
// Eliminación de datos

//Enrique
db.EliminarFAQ =(id_FAQs,Usuario)=>{
  return new Promise(async(resolve, reject) =>{
    const query = `DELETE FROM FAQs WHERE id_FAQs = '${id_FAQs}' AND id_editor = '${Usuario}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
}

module.exports = db;

