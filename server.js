const express = require('express');
const app = express();
const { port }= require('./config');

const autosRoutes = require('./src/routes/autos');
const usersRoutes = require('./src/routes/users');
const historicoAutosAlquiladosRoutes = require('./src/routes/historicoAutosAlquilados');

app.use('/api/autos', autosRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/historico', historicoAutosAlquiladosRoutes);

app.listen(port, () =>{
    console.log(`Server listen on port ${port}` )
});