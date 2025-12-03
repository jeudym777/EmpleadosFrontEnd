import { ICONS, APP_CONSTANTS } from '../constants';

/**
 * Template para el formulario de empleados
 */
export const formTemplate = (isEditing: boolean): string => `
    <div class="form-card">
        <h2>${isEditing ? `${ICONS.EDIT} Editar Empleado` : `${ICONS.ADD} Nuevo Empleado`}</h2>
        <form id="form-empleado">
            <div class="form-grid">
                <div class="form-group">
                    <label for="nombre">Nombre Completo *</label>
                    <input type="text" id="nombre" name="nombre" required placeholder="Juan Pérez">
                </div>
                <div class="form-group">
                    <label for="codEmpleado">Código *</label>
                    <input 
                        type="text" 
                        id="codEmpleado" 
                        name="codEmpleado" 
                        required 
                        placeholder="A001" 
                        maxlength="${APP_CONSTANTS.VALIDATION.COD_EMPLEADO_MAX_LENGTH}">
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required placeholder="juan@empresa.com">
                </div>
                <div class="form-group">
                    <label for="edad">Edad *</label>
                    <input 
                        type="number" 
                        id="edad" 
                        name="edad" 
                        required 
                        placeholder="30" 
                        min="${APP_CONSTANTS.VALIDATION.MIN_AGE}" 
                        max="${APP_CONSTANTS.VALIDATION.MAX_AGE}">
                </div>
            </div>
            <div class="form-actions">
                ${isEditing ? '<button type="button" id="btn-cancelar" class="btn btn-secondary">Cancelar</button>' : ''}
                <button type="submit" class="btn ${isEditing ? 'btn-primary' : 'btn-success'}">
                    ${isEditing ? `${ICONS.SAVE} Actualizar` : `${ICONS.ADD} Crear`} Empleado
                </button>
            </div>
        </form>
    </div>
`;
