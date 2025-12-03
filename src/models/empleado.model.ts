// Modelo de Empleado según la API backend
export interface Empleado {
    id: number;
    nombre: string;
    codEmpleado: string;
    email: string;
    edad: number;
    fechaAlta?: string;
    fechaBaja?: string | null;
}

// DTO para crear empleados
export interface CreateEmpleadoDTO {
    nombre: string;
    codEmpleado: string;
    email: string;
    edad: number;
}

// DTO para actualizar empleados (sin id, sin fechas)
export interface UpdateEmpleadoDTO {
    nombre: string;
    codEmpleado: string;
    email: string;
    edad: number;
}

// DTO completo que devuelve el backend
export interface EmpleadoDTO {
    id: number;
    nombre: string;
    codEmpleado: string;
    email: string;
    edad: number;
    fechaAlta: string;
    fechaBaja: string | null;
}

// Respuesta de la API
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}
