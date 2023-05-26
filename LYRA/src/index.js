const app = require('./config/server');

app.listen(app.get('port'),()=>{
    console.log('Servidor iniciado en el puerto: ', app.get('port'))
});
