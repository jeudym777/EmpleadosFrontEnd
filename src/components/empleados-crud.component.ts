import type { Empleado, CreateEmpleadoDTO, UpdateEmpleadoDTO } from '../interfaces';
import { empleadoService } from '../services/empleado.service';
import { Alert, Table, Form, confirmModal } from './shared';
import { headerTemplate, tableCardTemplate } from '../templates';
import { MESSAGES } from '../constants';

/**
 * Componente principal para el CRUD de empleados
 */
export class EmpleadosCRUD {
    private container: HTMLElement;
    private empleados: Empleado[] = [];
    private empleadoEditando: Empleado | null = null;
    
    // Componentes reutilizables
    private alert!: Alert;
    private table!: Table;
    private form!: Form;

    constructor(container: HTMLElement) {
        this.container = container;
        this.init();
    }

    /**
     * Inicializa el componente
     */
    private async init(): Promise<void> {
        this.renderLayout();
        this.initializeComponents();
        await this.cargarEmpleados();
    }

    /**
     * Renderiza la estructura principal del layout
     */
    private renderLayout(): void {
        this.container.innerHTML = `
            <div class="container">
                ${headerTemplate()}
                <div id="alert-container"></div>
                <div id="form-container"></div>
                ${tableCardTemplate()}
            </div>
        `;
    }

    /**
     * Inicializa los componentes reutilizables
     */
    private initializeComponents(): void {
        // Componente de alertas
        this.alert = new Alert('alert-container');

        // Componente de formulario
        this.form = new Form('form-container', {
            onSubmit: (data) => this.handleFormSubmit(data),
            onCancel: () => this.cancelarEdicion()
        });
        this.form.render(false);

        // Componente de tabla
        this.table = new Table('tabla-container', {
            onEdit: (id) => this.editarEmpleado(id),
            onDelete: (codigo) => this.eliminarEmpleado(codigo)
        });
    }

    /**
     * Carga la lista de empleados desde la API
     */
    private async cargarEmpleados(): Promise<void> {
        try {
            this.empleados = await empleadoService.getEmpleados();
            this.table.render(this.empleados);
        } catch (error) {
            this.alert.show(MESSAGES.ERROR.LOAD, 'error');
            console.error('Error al cargar empleados:', error);
        }
    }

    /**
     * Maneja el envío del formulario
     */
    private async handleFormSubmit(data: CreateEmpleadoDTO | UpdateEmpleadoDTO): Promise<void> {
        try {
            if (this.empleadoEditando) {
                await this.actualizarEmpleado(data as UpdateEmpleadoDTO);
            } else {
                await this.crearEmpleado(data as CreateEmpleadoDTO);
            }
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : MESSAGES.ERROR.GENERIC;
            this.alert.show(mensaje, 'error');
            console.error('Error en formulario:', error);
        }
    }

    /**
     * Crea un nuevo empleado
     */
    private async crearEmpleado(data: CreateEmpleadoDTO): Promise<void> {
        await empleadoService.createEmpleado(data);
        this.alert.show(MESSAGES.SUCCESS.CREATE(data.nombre), 'success');
        this.form.reset();
        await this.cargarEmpleados();
    }

    /**
     * Actualiza un empleado existente
     */
    private async actualizarEmpleado(data: UpdateEmpleadoDTO): Promise<void> {
        if (!this.empleadoEditando) return;

        // Usar el código del empleado en edición (campo deshabilitado)
        const updateDTO: UpdateEmpleadoDTO = {
            ...data,
            codEmpleado: this.empleadoEditando.codEmpleado
        };

        await empleadoService.updateEmpleado(this.empleadoEditando.id, updateDTO);
        this.alert.show(MESSAGES.SUCCESS.UPDATE, 'success');
        this.cancelarEdicion();
        await this.cargarEmpleados();
    }

    /**
     * Prepara el formulario para editar un empleado
     */
    private editarEmpleado(id: number): void {
        this.empleadoEditando = this.empleados.find(e => e.id === id) || null;
        if (!this.empleadoEditando) return;

        this.form.render(true);
        this.form.fill({
            nombre: this.empleadoEditando.nombre,
            codEmpleado: this.empleadoEditando.codEmpleado,
            email: this.empleadoEditando.email,
            edad: this.empleadoEditando.edad
        }, true); // true = deshabilitar código

        this.form.scrollToView();
    }

    /**
     * Elimina un empleado
     */
    private async eliminarEmpleado(codigo: string): Promise<void> {
        confirmModal.show({
            title: MESSAGES.CONFIRM.DELETE_TITLE,
            message: MESSAGES.CONFIRM.DELETE_MESSAGE,
            confirmText: MESSAGES.CONFIRM.DELETE_CONFIRM,
            cancelText: MESSAGES.CONFIRM.DELETE_CANCEL,
            confirmClass: 'btn-danger',
            onConfirm: async () => {
                try {
                    await empleadoService.deleteEmpleado(codigo);
                    this.alert.show(MESSAGES.SUCCESS.DELETE, 'success');
                    await this.cargarEmpleados();
                } catch (error) {
                    this.alert.show(MESSAGES.ERROR.DELETE, 'error');
                    console.error('Error al eliminar:', error);
                }
            }
        });
    }

    /**
     * Cancela la edición y vuelve al modo creación
     */
    private cancelarEdicion(): void {
        this.empleadoEditando = null;
        this.form.render(false);
        this.form.reset();
    }
}
