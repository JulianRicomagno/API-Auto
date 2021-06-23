
# Alquiler de Autos

---

### Descripción

- EL presente proyecto es una API de alquiler de autos, la cual permiteirá el registro y posterior login de usuarios,los cuales podran consultar
el listado de estacionamientos con que cuenta la aplicación registrados (donde se encuentran los autos por alquilar). A partir de los estacionamientos el usuario podra ver los autos disponibles, de aquel estacionamiento al cual prefiera acercarse a retirar el auto. Una vez elegido el estacionamiento y vistos los autos disponibles, el usuario podra alquilar el auto que mas le guste, solo podra alquilar un auto por vez y este tiene que estar disponible. Una vez devuelto el auto en el estacionamiento podrá finalizar el alquiler desde la app podra cancelar el alquiler.

- La app, por otra parte le permite al administrador el manejo de la alta, baja y modificación de los estacionamientos y autos con diferencia de las acciones que puede realizar el usuario comun.

---

### Funcionalidades

#### Usuario

- login/singup de Usuario
- alquilar un auto
- terminar alquiler
- listar autos y estacionamientos
- agregar auto a favoritos
- remover auto de favoritos

#### Administrador

- login/singup de Admin
- alquilar un auto
- terminar alquiler
- alta de estacionamientos y autos
- baja de estacionamientos y autos
- modificaciones de estacionamientos y autos
- agregar auto a favoritos
- remover auto de favoritos

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
3. Solicitar archivo `.env`
4. Ejecutar la API `npm start`

---

### Endpoints

##### Autos

1. Get All (GET) = `localhost:3000/api/autos`
2. Create One (POST) = `localhost:3000/api/autos`
3. Update One (PUT) = `localhost:3000/api/autos/id`
4. Delete One (DELETE) = `localhost:3000/api/autos/id` 

##### Estacionamientos

1. Get All (GET) = `localhost:3000/api/estacionamientos`
2. Create One (POST) = `localhost:3000/api/estacionamientos`
3. Update One (PUT) = `localhost:3000/api/estacionamientos/id`
4. Delete One (DELETE) = `localhost:3000/api/estacionamientos/id` 
5. Assing Car (PUT) = `localhost:3000/api/estacionamientos/id`
6. Get Cats (GET) = `localhost:3000/api/estacionamientos/getCars/id`

##### Historico

1. Get All (GET) = `localhost:3000/api/historico`
2. Delete One (DELETE) = `localhost:3000/api/historico/id` 

##### Users

1. Get All (GET) = `localhost:3000/api/users`
2. Delete One (DELETE) = `localhost:3000/api/users/id`
3. Update One (PUT) = `localhost:3000/api/users/id`
4. Alquilar Auto (PUT) = `localhost:3000/api/users/alquilarAuto/id`
5. Terminar Alquiler (PUT) = `localhost:3000/api/users/terminaAlquiler/id`
6. SingIn (POST) = `localhost:3000/api/users/SingIn/id`
7. SingUp (POST) = `localhost:3000/api/users/SingUp/id` 
8. Obtener todos los favoritos favoritos (GET) = `localhost:3000/api/users/getAllMyFavorites/id`
9. Agregar a favoritos (POST) = `localhost:3000/api/users/addToFavorites/id`
10. Remover de favoritos (POST) = `localhost:3000/api/users/removeFromFavoritos/id`