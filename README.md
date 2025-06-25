# Hackatones - Frontend

Frontend de una plataforma de gestión de hackathones (eventos tecnológicos), donde:

- Un usuario normal puede registrarse, iniciar sesión, inscribirse a eventos y valorarlos.
- Un usuario administrador puede crear, editar y gestionar estos eventos.

Este proyecto está desarrollado en **React** y se comunica con el backend a través de una API REST.

---

## Cómo iniciar el proyecto

### 1. Clona el repositorio

git clone url-del-repositorio-frontend

### 2. Instala las dependencias

npm install

### 3. Configura las variables de entorno

Crea un archivo .env en la raíz del proyecto. Asegúrate de incluir la URL del backend, por ejemplo:

VITE_URL_API=http://localhost:4000

⚠️ Asegúrate de que el backend esté funcionando y disponible en esa URL.

### 4. Iniciar la aplicación

npm run dev

La aplicación se abrirá en http://localhost:5173 (o el puerto que indique la terminal).

## Funcionalidades

- Registro y login de usuarios

- Visualización de hackathones

- Inscripción a eventos

- Gestión de eventos por parte del administrador

- Subida y visualización de archivos adjuntos

- Evaluación de eventos una vez finalizados

- Visualización de la clasificación de los eventos
