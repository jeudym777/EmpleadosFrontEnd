import type { Empleado, CreateEmpleadoDTO, UpdateEmpleadoDTO } from '../models/empleado.model';

// Configuración de la API
const API_BASE_URL = 'http://localhost:5010/api';

export class EmpleadoService {
    
    // Obtener todos los empleados (SQL)
    async getEmpleados(): Promise<Empleado[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/EmpleadoSQL`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            throw error;
        }
    }

    // Obtener empleado por código
    async getEmpleadoByCodigo(codigo: string): Promise<Empleado> {
        try {
            const response = await fetch(`${API_BASE_URL}/EmpleadoSQL/${codigo}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener empleado:', error);
            throw error;
        }
    }

    // Crear nuevo empleado
    async createEmpleado(empleadoDTO: CreateEmpleadoDTO): Promise<Empleado> {
        try {
            const response = await fetch(`${API_BASE_URL}/EmpleadoSQL`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empleadoDTO)
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error al crear empleado:', error);
            throw error;
        }
    }

    // Actualizar empleado
    async updateEmpleado(id: number, empleadoDTO: UpdateEmpleadoDTO): Promise<Empleado> {
        try {
            console.log('UPDATE - ID:', id, 'DTO:', empleadoDTO);
            const response = await fetch(`${API_BASE_URL}/EmpleadoSQL/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empleadoDTO)
            });
            
            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Response text:', responseText);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${responseText}`);
            }
            
            return responseText ? JSON.parse(responseText) : {} as Empleado;
        } catch (error) {
            console.error('Error al actualizar empleado:', error);
            throw error;
        }
    }

    // Eliminar empleado (soft delete)
    async deleteEmpleado(codigo: string): Promise<void> {
        try {
            const response = await fetch(`${API_BASE_URL}/EmpleadoSQL/${codigo}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            throw error;
        }
    }
}

// Exportar una instancia del servicio
export const empleadoService = new EmpleadoService();
