
# Alquiler de Autos

---

### Descripción
- El presente proyecto está siendo desarrollado de forma colaborativa por Julian Ricomagno, Santiago Cersosimo y Diego Boyatjian, utilizando node.js y mongoDB.
- Éste consta de una API que permite alquilar un Auto de uno de los diferentes Estacionamientos que se proporciona en la app, almacenar la transaccion en una coleccion y finalizar el alquiler.

---

### Funcionalidades
- login/singup de Usuario
- alquilar un auto
- terminar alquiler

---

### Actores/Roles
- Usuarios
- Administrador

---

### Entidades Principales
- Usuarios
- Autos
- Estacionamientos
- Historico Transacciones

---

### Instrucciones Técnicas

1. Clonar/forkear el proyecto: `git clone`
2. Instalar las dependencias que utiliza el proyecto: `npm install`
3. Ejecutar la API `npm start`

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
2. Delete One (DELETE) = `localhost:3000/api/historico/id_historico` 

##### Users

1. Get All (GET) = `localhost:3000/api/users`
2. Delete One (DELETE) = `localhost:3000/api/users/id_user`
3. Update One (PUT) = `localhost:3000/api/users/id_user`
4. Alquilar Auto (PUT) = `localhost:3000/api/users/alquilarAuto/id_user`
5. Terminar Alquiler (PUT) = `localhost:3000/api/users/terminaAlquiler/id_user`
6. SingIn (POST) = `localhost:3000/api/users/SingIn/id_user`
7. SingUp (POST) = `localhost:3000/api/users/SingUp/id_user` 