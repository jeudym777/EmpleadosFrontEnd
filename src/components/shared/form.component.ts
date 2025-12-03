import type { CreateEmpleadoDTO, UpdateEmpleadoDTO } from '../../interfaces';
import { formTemplate } from '../../templates';
import { APP_CONSTANTS } from '../../constants';

/**
 * Datos del formulario
 */
export interface FormData {
    nombre: string;
    codEmpleado: string;
    email: string;
    edad: number;
}

/**
 * Opciones de configuración para el formulario
 */
export interface FormOptions {
    onSubmit?: (data: CreateEmpleadoDTO | UpdateEmpleadoDTO) => void;
    onCancel?: () => void;
}

/**
 * Componente reutilizable para el formulario de empleados
 */
export class Form {
    private container: HTMLElement;
    private options: FormOptions;
    private formElement: HTMLFormElement | null = null;

    constructor(containerId: string, options: FormOptions = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id '${containerId}' not found`);
        }
        this.container = container;
        this.options = options;
    }

    /**
     * Renderiza el formulario
     */
    render(isEditMode: boolean = false): void {
        this.container.innerHTML = formTemplate(isEditMode);
        this.formElement = document.getElementById('form-empleado') as HTMLFormElement;
        this.attachEventListeners();
    }

    /**
     * Adjunta event listeners al formulario
     */
    private attachEventListeners(): void {
        if (!this.formElement) return;

        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        const btnCancelar = document.getElementById('btn-cancelar');
        if (btnCancelar) {
            btnCancelar.addEventListener('click', () => {
                if (this.options.onCancel) {
                    this.options.onCancel();
                }
            });
        }
    }

    /**
     * Maneja el envío del formulario
     */
    private handleSubmit(): void {
        if (!this.formElement) return;

        const formData = new globalThis.FormData(this.formElement);
        const data: FormData = {
            nombre: formData.get('nombre') as string,
            codEmpleado: formData.get('codEmpleado') as string,
            email: formData.get('email') as string,
            edad: parseInt(formData.get('edad') as string),
        };

        if (this.options.onSubmit) {
            this.options.onSubmit(data);
        }
    }

    /**
     * Rellena el formulario con datos
     */
    fill(data: FormData, disableCode: boolean = false): void {
        setTimeout(() => {
            const nombreInput = document.getElementById('nombre') as HTMLInputElement;
            const codInput = document.getElementById('codEmpleado') as HTMLInputElement;
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const edadInput = document.getElementById('edad') as HTMLInputElement;

            if (nombreInput) nombreInput.value = data.nombre;
            if (codInput) {
                codInput.value = data.codEmpleado;
                if (disableCode) {
                    codInput.disabled = true;
                }
            }
            if (emailInput) emailInput.value = data.email;
            if (edadInput) edadInput.value = data.edad.toString();
        }, APP_CONSTANTS.FORM.DOM_UPDATE_DELAY);
    }

    /**
     * Resetea el formulario
     */
    reset(): void {
        if (this.formElement) {
            this.formElement.reset();
        }
        
        const codInput = document.getElementById('codEmpleado') as HTMLInputElement;
        if (codInput) {
            codInput.disabled = false;
        }
    }

    /**
     * Obtiene el código de empleado actual (útil cuando está deshabilitado)
     */
    getCodeValue(): string {
        const codInput = document.getElementById('codEmpleado') as HTMLInputElement;
        return codInput ? codInput.value : '';
    }

    /**
     * Hace scroll al formulario
     */
    scrollToView(): void {
        this.container.scrollIntoView({ behavior: 'smooth' });
    }
}
