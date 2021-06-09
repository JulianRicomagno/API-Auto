const express = require('express');
const app = express();
const { port }= require('./config');

const autosRoutes = require('./src/routes/autos');
const estacionamientosRoutes = require('./src/routes/estacionamientos');
const usersRoutes = require('./src/routes/users');
const historicoAutosAlquiladosRoutes = require('./src/routes/historicoAutosAlquilados');
const validateToken = require('./src/middlewares/validateToken')
//const {JWTsecret} = require('../../config');

app.use(express.json());
// comentario 50
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin,     X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,     DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

// REVISAR TODAS LAS RUTAS!!

app.use('/api/autos',   autosRoutes);
app.use('/api/estacionamientos',  estacionamientosRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/historico',  historicoAutosAlquiladosRoutes);

app.listen(port, () =>{
    console.log(`Server listen on port ${port}` )
});