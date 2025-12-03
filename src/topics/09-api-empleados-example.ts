import { empleadoService } from '../services/empleado.service';
import type { EmpleadoDTO } from '../models/empleado.model';

// Ejemplo de uso del servicio de empleados

async function mostrarEmpleados() {
    console.log('=== LISTAR TODOS LOS EMPLEADOS ===');
    try {
        const empleados = await empleadoService.getEmpleados();
        console.log('Empleados encontrados:', empleados);
        console.table(empleados);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function buscarEmpleado(codigo: string) {
    console.log(`=== BUSCAR EMPLEADO ${codigo} ===`);
    try {
        const empleado = await empleadoService.getEmpleadoByCodigo(codigo);
        console.log('Empleado encontrado:', empleado);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function crearEmpleado() {
    console.log('=== CREAR NUEVO EMPLEADO ===');
    const nuevoEmpleado: EmpleadoDTO = {
        nombre: 'Carlos Rodríguez',
        codEmpleado: 'A003',
        email: 'carlos@empresa.com',
        edad: 28
    };

    try {
        const empleado = await empleadoService.createEmpleado(nuevoEmpleado);
        console.log('Empleado creado:', empleado);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function actualizarEmpleado(id: number) {
    console.log(`=== ACTUALIZAR EMPLEADO ${id} ===`);
    const empleadoActualizado: EmpleadoDTO = {
        nombre: 'Juan Pérez Actualizado',
        codEmpleado: 'A001',
        email: 'juan.nuevo@empresa.com',
        edad: 31
    };

    try {
        const empleado = await empleadoService.updateEmpleado(id, empleadoActualizado);
        console.log('Empleado actualizado:', empleado);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function eliminarEmpleado(codigo: string) {
    console.log(`=== ELIMINAR EMPLEADO ${codigo} ===`);
    try {
        await empleadoService.deleteEmpleado(codigo);
        console.log('Empleado eliminado correctamente');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función principal para probar el servicio
async function testearServicio() {
    console.log('🚀 Iniciando pruebas del servicio de empleados...\n');
    
    // Listar todos los empleados
    await mostrarEmpleados();
    
    // Descomentar las funciones que quieras probar:
    
    // await buscarEmpleado('A001');
    // await crearEmpleado();
    // await actualizarEmpleado(1);
    // await eliminarEmpleado('A001');
}

// Exportar la función de prueba
export { testearServicio };
