import { ICONS, APP_CONSTANTS } from '../../constants';

/**
 * Tipos de alerta
 */
export type AlertType = 'success' | 'error';

/**
 * Componente reutilizable para mostrar alertas
 */
export class Alert {
    private container: HTMLElement;

    constructor(containerId: string = 'alert-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id '${containerId}' not found`);
        }
        this.container = container;
    }

    /**
     * Muestra una alerta
     */
    show(mensaje: string, tipo: AlertType = 'success'): void {
        const icon = tipo === 'success' ? ICONS.SUCCESS : ICONS.ERROR;
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${tipo} alert-animated`;
        alert.innerHTML = `
            <span class="alert-icon">${icon}</span>
            <span class="alert-message">${mensaje}</span>
        `;
        
        this.container.appendChild(alert);

        // Animación de entrada
        setTimeout(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translateY(0)';
        }, APP_CONSTANTS.ALERT.ANIMATION_DELAY);

        // Animación de salida y eliminación
        setTimeout(() => {
            this.hide(alert);
        }, APP_CONSTANTS.ALERT.DURATION);
    }

    /**
     * Oculta una alerta
     */
    private hide(alert: HTMLElement): void {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => alert.remove(), APP_CONSTANTS.ALERT.FADE_OUT_DELAY);
    }

    /**
     * Limpia todas las alertas
     */
    clear(): void {
        this.container.innerHTML = '';
    }
}
