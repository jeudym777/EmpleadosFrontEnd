# Conexión Frontend TypeScript con Backend C# API

Este proyecto se conecta con una API de empleados desarrollada en ASP.NET Core 9.0.

## 📋 Estructura Creada

### Modelos (`src/models/`)
- **empleado.model.ts**: Interfaces TypeScript para Empleado y EmpleadoDTO

### Servicios (`src/services/`)
- **empleado.service.ts**: Servicio para consumir la API REST con métodos CRUD

### Ejemplos (`src/topics/`)
- **09-api-empleados-example.ts**: Ejemplos de uso del servicio

## 🔌 API Endpoints

Tu backend expone estos endpoints:

### EmpleadoSQL (Base de Datos)
- `GET /api/EmpleadoSQL` - Listar empleados activos
- `GET /api/EmpleadoSQL/{codigo}` - Buscar por código
- `POST /api/EmpleadoSQL` - Crear empleado
- `PUT /api/EmpleadoSQL/{id}` - Actualizar empleado
- `DELETE /api/EmpleadoSQL/{codigo}` - Baja lógica

## 🚀 Cómo usar

### 1. Iniciar el Backend
```bash
cd BackendProject
dotnet run
```
El backend estará disponible en: `https://localhost:7031`

### 2. Probar el servicio en el Frontend

Actualiza tu `main.ts` para importar el ejemplo:

```typescript
import './topics/09-api-empleados-example';
import { testearServicio } from './topics/09-api-empleados-example';

// Ejecutar pruebas del servicio
testearServicio();
```

### 3. Ejecutar el Frontend
```bash
npm run dev
```

## 💡 Ejemplos de Uso del Servicio

```typescript
import { empleadoService } from './services/empleado.service';
import type { EmpleadoDTO } from './models/empleado.model';

// Listar todos los empleados
const empleados = await empleadoService.getEmpleados();

// Buscar empleado por código
const empleado = await empleadoService.getEmpleadoByCodigo('A001');

// Crear nuevo empleado
const nuevoEmpleado: EmpleadoDTO = {
    nombre: 'Juan Pérez',
    codEmpleado: 'A001',
    email: 'juan@empresa.com',
    edad: 30
};
const created = await empleadoService.createEmpleado(nuevoEmpleado);

// Actualizar empleado
await empleadoService.updateEmpleado(1, nuevoEmpleado);

// Eliminar empleado (soft delete)
await empleadoService.deleteEmpleado('A001');
```

## ⚙️ Configuración CORS

Tu backend ya está configurado para aceptar peticiones desde:
- `http://localhost:4200` (Angular)
- `https://localhost:4200`

Para otros puertos (como Vite en 5173), el proxy.conf.json redirige las peticiones.

## 🔧 Configuración del Proxy

El archivo `proxy.conf.json` redirige las peticiones `/api` a tu backend:

```json
{
  "/api": {
    "target": "https://localhost:7031",
    "secure": false,
    "changeOrigin": true
  }
}
```

## 📦 Modelo de Datos

```typescript
interface Empleado {
    id: number;
    nombre: string;
    codEmpleado: string;
    email: string;
    edad: number;
    fechaAlta: Date;
    fechaBaja: Date | null;
}
```

## 🛠️ Tecnologías

**Backend:**
- ASP.NET Core 9.0
- Dapper
- SQL Server
- Swagger/OpenAPI

**Frontend:**
- TypeScript
- Vite
- Fetch API

## 📝 Notas Importantes

1. **Certificado SSL**: El backend usa HTTPS con certificado autofirmado. Es normal ver advertencias en desarrollo.

2. **CORS**: Ya está configurado en el backend para localhost:4200. Si usas otro puerto, actualiza la configuración CORS en el backend.

3. **Soft Delete**: La operación DELETE no elimina físicamente el registro, solo marca `fechaBaja`.

4. **Validaciones**: El backend valida los datos automáticamente con Data Annotations.

## 🎯 Próximos Pasos

Para crear una aplicación Angular completa:

```bash
# Instalar Angular CLI
npm install -g @angular/cli

# Crear nuevo proyecto Angular
ng new empleados-app
cd empleados-app

# Copiar los archivos creados:
# - src/models/empleado.model.ts
# - src/services/empleado.service.ts
# - proxy.conf.json

# Ejecutar con proxy
ng serve --proxy-config proxy.conf.json
```

## 👨‍💻 Autor

Ingeniero Yeudi Martinez Sanchez
