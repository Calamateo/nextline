# Sistema de gestión de tareas
### Reto de crear un backend

El sistema de gestión de tareas tiene como propósito el que un usuario pueda
visualizar, agregar, editar o eliminar las tareas que requiera registrar en su día a día. Y
debido a que el sistema es utilizado por varios usuarios, es necesario que la API
identifique al usuario o sesión que está solicitando cierta información. (No es necesario
crear un módulo de registro y autentificación de usuarios)

## Características
Cada tarea debe tener:
- Titulo (Obligatorio)
- Descripción (Obligatorio)
- Estatus de compleción (Obligatorio)
- Fecha de entrega (Obligatorio)
- Comentarios (Opcional)
- Responsable (Opcional)
- Tags (Opcional)

Los endpoints que deberán estar disponibles en la API son:
- GET -> Regresa información breve de todas las tareas
- GET -> Regresa toda la información de una tarea
- POST -> Crear una tarea
- PUT -> Editar una tarea 
- DELETE -> Borrar una tarea


## Installation
Requiere [Node.js](https://nodejs.org/).
#### Instala las dependencias y dev dependencias 
```sh
npm install
```
#### construcción de contenedores docker
```sh
docker compose up -d postgres
```
#### Migraciones
```sh
npm run migrations:run
```
#### Para el entorno de producción...
```sh
npm run start
```
#### Para el entorno de desarrollo...
```sh
npm run dev
```

## APIs
Dentro se encuentran archivos JSON para probar las APIs, con las variables como headers, solo se necesita exportar los archivos
### Insomnia
[![Insomnia.png](https://i.postimg.cc/dtB87psv/Insomnia.png)](https://postimg.cc/MvncNsfr)
### Postman
[![Postman.png](https://i.postimg.cc/2SSnnGyW/Postman.png)](https://postimg.cc/XptZbwwN)
### Swagger
Con la herramienta swagger la cual se accede http://localhost:{port}/doc/#/, se debe de introducir la autorizacion. La password se encuentra en las variables de entorno
[![swagger.png](https://i.postimg.cc/RVyvTVVT/swagger.png)](https://postimg.cc/fJ74zsd3)

## Test
Se añadieron Test end to end para la verificación de las APIs. Se puede ver mas a detalle en el siguiente link https://nextline-test-e2e.netlify.app/
[![Test-e2e.png](https://i.postimg.cc/m2N0PL1D/Test-e2e.png)](https://postimg.cc/ppr07tZb)

### CI/CD
Asi mismo se añadieron los test a Github actions, para cada vez que se haga un push se corran las pruebas
[![github.png](https://i.postimg.cc/P56f8zvP/github.png)](https://postimg.cc/5XCWhz3V)
## License

MIT


   [node.js]: <http://nodejs.org>
   
