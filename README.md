# Empleados Frontend - CRUD

Sistema de gestión de empleados desarrollado con TypeScript y Vite, conectado a un backend ASP.NET Core.

## 🚀 Características

- ✅ CRUD completo de empleados (Crear, Leer, Actualizar, Eliminar)
- ✅ Interfaz moderna y responsive
- ✅ Diseño adaptable para móviles y tablets
- ✅ Validación de formularios
- ✅ Notificaciones animadas de éxito/error
- ✅ Formateo de fechas (DD/MM/YYYY)

## 🛠️ Tecnologías

- **Frontend**: TypeScript
- **Build Tool**: Vite 7.2.2
- **Backend**: ASP.NET Core 9.0 (C#)
- **Base de datos**: SQL Server
- **ORM**: Dapper

## 📋 Requisitos previos

- Node.js (v18 o superior)
- Backend ASP.NET Core corriendo en http://localhost:5010
- SQL Server con tabla `Empleados`

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jeudym777/EmpleadosFrontEnd.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🎯 Uso

1. Asegúrate de que el backend esté corriendo en `http://localhost:5010`
2. Abre el navegador en `http://localhost:5173` (o el puerto que indique Vite)
3. Usa la interfaz para gestionar empleados

## 📁 Estructura del proyecto

```
src/
├── components/
│   └── empleados-crud.ts    # Componente principal del CRUD
├── models/
│   └── empleado.model.ts    # Interfaces y DTOs
├── services/
│   └── empleado.service.ts  # Servicio de API
├── main.ts                  # Punto de entrada
└── style.css                # Estilos globales
```

## 🔌 API Endpoints

- `GET /api/EmpleadoSQL` - Obtener todos los empleados
- `POST /api/EmpleadoSQL` - Crear empleado
- `PUT /api/EmpleadoSQL/{id}` - Actualizar empleado
- `DELETE /api/EmpleadoSQL/{codEmpleado}` - Eliminar empleado

## 👤 Autor

[@jeudym777](https://github.com/jeudym777)
