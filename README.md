# Alquiler de Autos

---

### Descripción
Aplicación que permite la creación de usuarios, alta de autos y estacionamientos para el alquiler de los mismos y su posterior finalización al terminar el alquiler.

---

### Funcionalidades
- Alquilar Auto
- Terminar Alquiler
- Crear Usuario 
- Login / Register

---

### Actores/Roles
- Usuarios

---

### Entidades Principales
- Usuarios
- Autos
- Estacionamientos

---

### Instrucciones Técnicas
Instrucciones técnicas:
1. Clonar Repositorio `git clone`
2. Instalar npm `npm install`
3. Arrancar proyecto `npm start`

---

### Endpoints

##### Autos

1. Get All (GET) = `localhost:3000/api/autos`
2. Create One (POST) = `localhost:3000/api/autos`
3. Update One (PUT) = `localhost:3000/api/autos/id_auto`
4. Delete One (DELETE) = `localhost:3000/api/autos/id_auto` 

##### Estacionamientos

1. Get All (GET) = `localhost:3000/api/estacionamientos`
2. Create One (POST) = `localhost:3000/api/estacionamientos`
3. Update One (PUT) = `localhost:3000/api/estacionamientos/id_estacionamiento`
4. Delete One (DELETE) = `localhost:3000/api/estacionamientos/id_estacionamiento` 
5. Assing Car (PUT) = `localhost:3000/api/estacionamientos/id_estacionamiento`

##### Historico

1. Get All (GET) = `localhost:3000/api/historico`
2. Create One (POST) = `localhost:3000/api/historico`
3. Update One (PUT) = `localhost:3000/api/historico/id_historico`
4. Delete One (DELETE) = `localhost:3000/api/historico/id_historico` 

##### Users

1. Get All (GET) = `localhost:3000/api/users`
2. Delete One (DELETE) = `localhost:3000/api/users/id_user`
3. Update One (PUT) = `localhost:3000/api/users/id_user`
4. Alquilar Auto (PUT) = `localhost:3000/api/users/alquilarAuto/id_user`
5. Terminar Alquiler (PUT) = `localhost:3000/api/users/terminaAlquiler/id_user`
6. Update One (PUT) = `localhost:3000/api/users/id_user`
7. SingIn (POST) = `localhost:3000/api/users/SingIn/id_user`
8. SingUp (POST) = `localhost:3000/api/users/SingUp/id_user` 


````

alquilarAuto: async (req, res) => {
        //Recibo ID usuario
        const { _id } = req.params;
        //Recibo ID auto par alaquilar
        const { auto } = req.body;

        //Le paso el auto por el req que recibo y luego le paso a la variable user el usuario
        const variableAuto = await autosModel.findById(auto);
        const variableUsers = await usersModel.findById(_id);
        //const autos = JSON.parse(variable);
        
        console.log(variableAuto.estado);
        console.log(variableUsers.auto);
        //valido que el auto este disponible y luego que el usuario no tenga auto alquilado
        if(variableAuto.estado == "Disponible"){
            if(variableUsers.auto.length == 0){
                //Asigno al auto el estado Alquilado, si este existe...
                await autosModel.findByIdAndUpdate(
                    auto, {
                    $set: { estado: 'Alquilado' },
                    }, { useFindAndModify: false }, err =>{
                        if(err){
                        res.status(404).send(Boom.notFound("el ID del auto es incorrecto"));
                    }
                });

                //Asigno el auto al Usuario, si este existe...
                await usersModel.findByIdAndUpdate(
                    _id, {
                    $push: { auto },
                    }, { useFindAndModify: false }, (err, uss) =>{
                        if(!uss){
                        res.status(404).send(Boom.notFound("No existe Usuario con el ID solicitado"))
                        }
                    });
        
                //Creo la transaccion historica        
                const newHistorico = new historicoModel({ date: Date.now(), auto: auto, user: _id });
                await newHistorico.save();
                res.status(200).send('Transacción realizada con Exito');
            };
            res.status(406).send(Boom.notAcceptable('El usuario ya tiene un auto alquilado'));
        };
        res.status(406).send(Boom.notAcceptable("El auto ya fue alquilado"))
    },

````