/**
 * Interfaz para las opciones del modal de confirmación
 */
export interface ConfirmModalOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmClass?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

/**
 * Componente reutilizable para modales de confirmación
 */
export class ConfirmModal {
    private modal: HTMLElement | null = null;

    /**
     * Muestra el modal de confirmación
     */
    show(options: ConfirmModalOptions): void {
        this.removeExisting();
        this.createModal(options);
        this.attachEventListeners(options);
        this.animateIn();
    }

    /**
     * Crea el HTML del modal
     */
    private createModal(options: ConfirmModalOptions): void {
        const confirmText = options.confirmText || 'Confirmar';
        const cancelText = options.cancelText || 'Cancelar';
        const confirmClass = options.confirmClass || 'btn-danger';

        this.modal = document.createElement('div');
        this.modal.className = 'modal-overlay';
        this.modal.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h3>${options.title}</h3>
                </div>
                <div class="modal-body">
                    <p>${options.message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-action="cancel">
                        ${cancelText}
                    </button>
                    <button class="btn ${confirmClass}" data-action="confirm">
                        ${confirmText}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);
    }

    /**
     * Adjunta event listeners a los botones del modal
     */
    private attachEventListeners(options: ConfirmModalOptions): void {
        if (!this.modal) return;

        const confirmBtn = this.modal.querySelector('[data-action="confirm"]');
        const cancelBtn = this.modal.querySelector('[data-action="cancel"]');
        const overlay = this.modal;

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                options.onConfirm();
                this.hide();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (options.onCancel) {
                    options.onCancel();
                }
                this.hide();
            });
        }

        // Cerrar al hacer click fuera del modal
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                if (options.onCancel) {
                    options.onCancel();
                }
                this.hide();
            }
        });

        // Cerrar con la tecla ESC
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (options.onCancel) {
                    options.onCancel();
                }
                this.hide();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }

    /**
     * Animación de entrada
     */
    private animateIn(): void {
        if (!this.modal) return;
        
        setTimeout(() => {
            this.modal?.classList.add('modal-show');
        }, 10);
    }

    /**
     * Oculta el modal con animación
     */
    private hide(): void {
        if (!this.modal) return;

        this.modal.classList.remove('modal-show');
        setTimeout(() => {
            this.modal?.remove();
            this.modal = null;
        }, 300);
    }

    /**
     * Remueve cualquier modal existente
     */
    private removeExisting(): void {
        const existing = document.querySelector('.modal-overlay');
        if (existing) {
            existing.remove();
        }
    }
}

/**
 * Instancia singleton del modal
 */
export const confirmModal = new ConfirmModal();
