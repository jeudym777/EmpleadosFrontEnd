import { empleadoService } from '../services/empleado.service';
import type { Empleado, CreateEmpleadoDTO, UpdateEmpleadoDTO } from '../models/empleado.model';

export class EmpleadosCRUD {
    private empleados: Empleado[] = [];
    private empleadoEditando: Empleado | null = null;

    constructor(private container: HTMLElement) {
        this.render();
        this.cargarEmpleados();
    }

    private render() {
        this.container.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>🚀 Gestión de Empleados</h1>
                    <p>Sistema completo de administración con TypeScript + C# + SQL Server</p>
                </div>

                <div id="alert-container"></div>

                <div class="form-card">
                    <h2>${this.empleadoEditando ? '✏️ Editar Empleado' : '➕ Nuevo Empleado'}</h2>
                    <form id="form-empleado">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="nombre">Nombre Completo *</label>
                                <input type="text" id="nombre" name="nombre" required placeholder="Juan Pérez">
                            </div>
                            <div class="form-group">
                                <label for="codEmpleado">Código *</label>
                                <input type="text" id="codEmpleado" name="codEmpleado" required placeholder="A001" maxlength="4">
                            </div>
                            <div class="form-group">
                                <label for="email">Email *</label>
                                <input type="email" id="email" name="email" required placeholder="juan@empresa.com">
                            </div>
                            <div class="form-group">
                                <label for="edad">Edad *</label>
                                <input type="number" id="edad" name="edad" required placeholder="30" min="18" max="100">
                            </div>
                        </div>
                        <div class="form-actions">
                            ${this.empleadoEditando ? '<button type="button" id="btn-cancelar" class="btn btn-secondary">Cancelar</button>' : ''}
                            <button type="submit" class="btn ${this.empleadoEditando ? 'btn-primary' : 'btn-success'}">
                                ${this.empleadoEditando ? '💾 Actualizar' : '➕ Crear'} Empleado
                            </button>
                        </div>
                    </form>
                </div>

                <div class="table-card">
                    <h2>📋 Lista de Empleados</h2>
                    <div id="tabla-container">
                        <div class="loading">Cargando empleados...</div>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    private attachEventListeners() {
        const form = document.getElementById('form-empleado') as HTMLFormElement;
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        const btnCancelar = document.getElementById('btn-cancelar');
        if (btnCancelar) {
            btnCancelar.addEventListener('click', () => this.cancelarEdicion());
        }
    }

    private async handleSubmit(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            if (this.empleadoEditando) {
                // Para UPDATE - enviar solo los campos necesarios
                // Obtener codEmpleado del empleado en edición (no del form porque está deshabilitado)
                const updateDTO: UpdateEmpleadoDTO = {
                    nombre: formData.get('nombre') as string,
                    codEmpleado: this.empleadoEditando.codEmpleado, // ← Usar el código original
                    email: formData.get('email') as string,
                    edad: parseInt(formData.get('edad') as string)
                };
                
                console.log('Actualizando empleado ID:', this.empleadoEditando.id, 'DTO:', updateDTO);
                await empleadoService.updateEmpleado(this.empleadoEditando.id, updateDTO);
                this.mostrarAlerta('¡Empleado actualizado con éxito!', 'success');
            } else {
                // Para CREATE
                const createDTO: CreateEmpleadoDTO = {
                    nombre: formData.get('nombre') as string,
                    codEmpleado: formData.get('codEmpleado') as string,
                    email: formData.get('email') as string,
                    edad: parseInt(formData.get('edad') as string)
                };
                
                await empleadoService.createEmpleado(createDTO);
                this.mostrarAlerta(`¡Empleado "${createDTO.nombre}" creado con éxito!`, 'success');
            }
            
            form.reset();
            this.empleadoEditando = null;
            
            // Re-habilitar el campo de código
            const codInput = document.getElementById('codEmpleado') as HTMLInputElement;
            if (codInput) codInput.disabled = false;
            
            this.render();
            await this.cargarEmpleados();
        } catch (error: any) {
            console.error('Error completo:', error);
            const mensaje = error.message || 'Error al guardar el empleado';
            this.mostrarAlerta(`❌ ${mensaje}`, 'error');
        }
    }

    private async cargarEmpleados() {
        try {
            this.empleados = await empleadoService.getEmpleados();
            console.log('Empleados recibidos:', this.empleados);
            if (this.empleados.length > 0) {
                console.log('Ejemplo de fecha:', this.empleados[0].fechaAlta, 'Tipo:', typeof this.empleados[0].fechaAlta);
            }
            this.renderTabla();
        } catch (error) {
            this.mostrarAlerta('Error al cargar empleados', 'error');
            console.error(error);
        }
    }

    private renderTabla() {
        const tablaContainer = document.getElementById('tabla-container');
        if (!tablaContainer) return;

        if (this.empleados.length === 0) {
            tablaContainer.innerHTML = `
                <div class="loading">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
                    <p>No hay empleados registrados</p>
                </div>
            `;
            return;
        }

        tablaContainer.innerHTML = `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Edad</th>
                            <th>Fecha Alta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.empleados.map(emp => `
                            <tr>
                                <td data-label="Código"><strong>${emp.codEmpleado}</strong></td>
                                <td data-label="Nombre">${emp.nombre}</td>
                                <td data-label="Email">${emp.email}</td>
                                <td data-label="Edad">${emp.edad} años</td>
                                <td data-label="Fecha Alta">${this.formatearFecha(emp.fechaAlta)}</td>
                                <td data-label="Acciones" class="actions">
                                    <button class="btn btn-primary btn-small" onclick="window.empleadosCRUD.editarEmpleado(${emp.id})">
                                        ✏️ Editar
                                    </button>
                                    <button class="btn btn-danger btn-small" onclick="window.empleadosCRUD.eliminarEmpleado('${emp.codEmpleado}')">
                                        🗑️ Eliminar
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    public async editarEmpleado(id: number) {
        this.empleadoEditando = this.empleados.find(e => e.id === id) || null;
        if (!this.empleadoEditando) return;

        // Primero renderizar con el estado de edición
        this.render();

        // Esperar a que el DOM se actualice
        setTimeout(() => {
            // Llenar el formulario con los datos del empleado
            const nombreInput = document.getElementById('nombre') as HTMLInputElement;
            const codInput = document.getElementById('codEmpleado') as HTMLInputElement;
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const edadInput = document.getElementById('edad') as HTMLInputElement;

            if (nombreInput) nombreInput.value = this.empleadoEditando!.nombre;
            if (codInput) {
                codInput.value = this.empleadoEditando!.codEmpleado;
                codInput.disabled = true; // No permitir cambiar el código
            }
            if (emailInput) emailInput.value = this.empleadoEditando!.email;
            if (edadInput) edadInput.value = this.empleadoEditando!.edad.toString();

            // Scroll al formulario
            document.querySelector('.form-card')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    }

    public async eliminarEmpleado(codigo: string) {
        if (!confirm('¿Estás seguro de que deseas eliminar este empleado?')) return;

        try {
            await empleadoService.deleteEmpleado(codigo);
            this.mostrarAlerta('¡Empleado eliminado correctamente!', 'success');
            await this.cargarEmpleados();
        } catch (error) {
            this.mostrarAlerta('Error al eliminar el empleado', 'error');
            console.error(error);
        }
    }

    private cancelarEdicion() {
        this.empleadoEditando = null;
        this.render();
        const form = document.getElementById('form-empleado') as HTMLFormElement;
        if (form) form.reset();
        
        // Re-habilitar el campo de código
        const codInput = document.getElementById('codEmpleado') as HTMLInputElement;
        if (codInput) codInput.disabled = false;
    }

    private formatearFecha(fecha: string | undefined | null): string {
        try {
            if (!fecha) {
                return 'No registrada';
            }
            
            // Crear la fecha y ajustar la zona horaria
            const date = new Date(fecha);
            
            if (isNaN(date.getTime())) {
                return 'No registrada';
            }
            
            // Formatear la fecha en español
            const dia = date.getDate().toString().padStart(2, '0');
            const mes = (date.getMonth() + 1).toString().padStart(2, '0');
            const anio = date.getFullYear();
            
            return `${dia}/${mes}/${anio}`;
        } catch (error) {
            console.error('Error al formatear fecha:', fecha, error);
            return 'No registrada';
        }
    }

    private mostrarAlerta(mensaje: string, tipo: 'success' | 'error') {
        const alertContainer = document.getElementById('alert-container');
        if (!alertContainer) return;

        const icon = tipo === 'success' ? '✅' : '❌';
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${tipo} alert-animated`;
        alert.innerHTML = `
            <span class="alert-icon">${icon}</span>
            <span class="alert-message">${mensaje}</span>
        `;
        alertContainer.appendChild(alert);

        // Animación de entrada
        setTimeout(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translateY(0)';
        }, 10);

        // Animación de salida y eliminación
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => alert.remove(), 300);
        }, 3500);
    }
}
