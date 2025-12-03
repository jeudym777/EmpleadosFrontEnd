# FRONTEND - GESTIÓN DE EMPLEADOS

## Arquitectura TypeScript + Vite

---

### INTERFACES
- **Empleado**: Modelo principal del dominio
- **CreateEmpleadoDTO**: Datos para crear empleado
- **UpdateEmpleadoDTO**: Datos para actualizar empleado
- **ApiResponse**: Respuesta genérica de la API

---

### CONSTANTS
- **API_CONFIG**: URLs y endpoints del backend
- **MESSAGES**: Mensajes de la aplicación
- **ICONS**: Iconos utilizados
- **HTTP_STATUS**: Códigos de estado HTTP
- **APP_CONSTANTS**: Configuración general

---

### SERVICES
**EmpleadoService**
- Comunicación con API REST
- Métodos HTTP (GET, POST, PUT, DELETE)
- Manejo de errores centralizado
- Transformación de datos con DTOs

---

### COMPONENTS

**EmpleadosCRUD** (Principal)
- Orquesta toda la funcionalidad CRUD
- Gestiona el estado de los empleados
- Coordina componentes reutilizables

**Componentes Reutilizables**
- **Alert**: Notificaciones al usuario
- **Table**: Tabla de datos
- **Form**: Formulario de entrada
- **ConfirmModal**: Diálogos de confirmación

---

### TEMPLATES
- Funciones que generan HTML
- Separación de vista y lógica
- Templates para: Header, Form, Table

---

### STYLES (CSS Modular)
- **variables.css**: Colores y espaciados
- **base.css**: Estilos globales
- **components.css**: Botones, forms, tables, alerts, modals
- Responsive design con media queries

---

### UTILS
- **DateFormatter**: Conversión de fechas
- **Validator**: Validaciones de datos

---

## FLUJO DE DATOS

**Acción del Usuario**
→ Componente captura evento
→ Service hace petición HTTP
→ API Backend procesa
→ Respuesta con DTO
→ Actualización de UI

---

## SEGURIDAD Y BUENAS PRÁCTICAS

- Type Safety con TypeScript
- Event Delegation (sin variables globales)
- Separación de responsabilidades
- DTOs específicos por operación
- Error Handling centralizado
- Constantes para evitar magic numbers
- CSS modular y reutilizable
- Componentes independientes y testeables
