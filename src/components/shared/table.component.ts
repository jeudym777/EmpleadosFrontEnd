import type { Empleado } from '../../interfaces';
import { tableTemplate } from '../../templates';

/**
 * Opciones de configuración para la tabla
 */
export interface TableOptions {
    onEdit?: (id: number) => void;
    onDelete?: (codigo: string) => void;
}

/**
 * Componente reutilizable para la tabla de empleados
 */
export class Table {
    private container: HTMLElement;
    private options: TableOptions;

    constructor(containerId: string, options: TableOptions = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id '${containerId}' not found`);
        }
        this.container = container;
        this.options = options;
    }

    /**
     * Renderiza la tabla con los datos proporcionados
     */
    render(empleados: Empleado[]): void {
        this.container.innerHTML = tableTemplate(empleados);
        this.attachEventListeners();
    }

    /**
     * Adjunta event listeners a los botones de la tabla
     */
    private attachEventListeners(): void {
        // Event delegation para los botones de editar
        this.container.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            
            // Botón editar
            if (target.closest('.btn-edit')) {
                const btn = target.closest('.btn-edit') as HTMLElement;
                const id = parseInt(btn.dataset.id || '0');
                if (this.options.onEdit && id) {
                    this.options.onEdit(id);
                }
            }
            
            // Botón eliminar
            if (target.closest('.btn-delete')) {
                const btn = target.closest('.btn-delete') as HTMLElement;
                const codigo = btn.dataset.codigo || '';
                if (this.options.onDelete && codigo) {
                    this.options.onDelete(codigo);
                }
            }
        });
    }

    /**
     * Limpia la tabla
     */
    clear(): void {
        this.container.innerHTML = '';
    }
}
