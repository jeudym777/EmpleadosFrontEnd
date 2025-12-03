/**
 * Interfaz principal del modelo Empleado
 */
export interface Empleado {
    id: number;
    nombre: string;
    codEmpleado: string;
    email: string;
    edad: number;
    fechaAlta?: string;
    fechaBaja?: string | null;
}
