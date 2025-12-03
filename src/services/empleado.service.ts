import type { Empleado, CreateEmpleadoDTO, UpdateEmpleadoDTO, ApiError } from '../interfaces';
import { API_CONFIG, HTTP_STATUS } from '../constants';

/**
 * Servicio para gestionar las operaciones de empleados con la API
 */
export class EmpleadoService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
    }

    /**
     * Obtiene todos los empleados
     */
    async getEmpleados(): Promise<Empleado[]> {
        try {
            const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADOS}`);
            
            if (!response.ok) {
                throw this.createError(response.status, 'Error al obtener empleados');
            }
            
            return await response.json();
        } catch (error) {
            throw this.handleError(error, 'Error al cargar la lista de empleados');
        }
    }

    /**
     * Obtiene un empleado por código
     */
    async getEmpleadoByCodigo(codigo: string): Promise<Empleado> {
        try {
            const response = await fetch(
                `${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADO_BY_CODIGO(codigo)}`
            );
            
            if (!response.ok) {
                throw this.createError(response.status, 'Empleado no encontrado');
            }
            
            return await response.json();
        } catch (error) {
            throw this.handleError(error, 'Error al buscar el empleado');
        }
    }

    /**
     * Crea un nuevo empleado
     */
    async createEmpleado(empleadoDTO: CreateEmpleadoDTO): Promise<Empleado> {
        try {
            const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADOS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empleadoDTO)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw this.createError(response.status, errorText || 'Error al crear empleado');
            }
            
            return await response.json();
        } catch (error) {
            throw this.handleError(error, 'Error al crear el empleado');
        }
    }

    /**
     * Actualiza un empleado existente
     */
    async updateEmpleado(id: number, empleadoDTO: UpdateEmpleadoDTO): Promise<Empleado> {
        try {
            const response = await fetch(
                `${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADO_BY_ID(id)}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(empleadoDTO)
                }
            );
            
            if (!response.ok) {
                const errorText = await response.text();
                throw this.createError(response.status, errorText || 'Error al actualizar empleado');
            }
            
            const responseText = await response.text();
            return responseText ? JSON.parse(responseText) : {} as Empleado;
        } catch (error) {
            throw this.handleError(error, 'Error al actualizar el empleado');
        }
    }

    /**
     * Elimina un empleado (soft delete)
     */
    async deleteEmpleado(codigo: string): Promise<void> {
        try {
            const response = await fetch(
                `${this.baseUrl}${API_CONFIG.ENDPOINTS.EMPLEADO_BY_CODIGO(codigo)}`,
                {
                    method: 'DELETE'
                }
            );
            
            if (!response.ok) {
                throw this.createError(response.status, 'Error al eliminar empleado');
            }
        } catch (error) {
            throw this.handleError(error, 'Error al eliminar el empleado');
        }
    }

    /**
     * Crea un objeto de error personalizado
     */
    private createError(status: number, message: string): ApiError {
        return {
            status,
            message,
            details: this.getErrorDetails(status)
        };
    }

    /**
     * Maneja errores y los convierte en mensajes legibles
     */
    private handleError(error: unknown, defaultMessage: string): Error {
        if (error instanceof Error) {
            return error;
        }
        
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return new Error((error as ApiError).message);
        }
        
        return new Error(defaultMessage);
    }

    /**
     * Obtiene detalles del error según el código de estado HTTP
     */
    private getErrorDetails(status: number): string {
        switch (status) {
            case HTTP_STATUS.BAD_REQUEST:
                return 'Los datos enviados no son válidos';
            case HTTP_STATUS.UNAUTHORIZED:
                return 'No autorizado';
            case HTTP_STATUS.FORBIDDEN:
                return 'Acceso prohibido';
            case HTTP_STATUS.NOT_FOUND:
                return 'Recurso no encontrado';
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
                return 'Error interno del servidor';
            default:
                return 'Error desconocido';
        }
    }
}

// Instancia singleton del servicio
export const empleadoService = new EmpleadoService();
