/**
 * Constantes de la aplicación
 */
export const APP_CONSTANTS = {
    ALERT: {
        DURATION: 3500, // milisegundos
        ANIMATION_DELAY: 10,
        FADE_OUT_DELAY: 300,
    },
    FORM: {
        DOM_UPDATE_DELAY: 50, // espera para actualización del DOM
    },
    VALIDATION: {
        MIN_AGE: 16,
        MAX_AGE: 100,
        COD_EMPLEADO_MAX_LENGTH: 4,
    },
} as const;

/**
 * Mensajes de la aplicación
 */
export const MESSAGES = {
    SUCCESS: {
        CREATE: (nombre: string) => `¡Empleado "${nombre}" creado con éxito!`,
        UPDATE: '¡Empleado actualizado con éxito!',
        DELETE: '¡Empleado eliminado correctamente!',
    },
    ERROR: {
        LOAD: 'Error al cargar empleados',
        CREATE: 'Error al crear el empleado',
        UPDATE: 'Error al actualizar el empleado',
        DELETE: 'Error al eliminar el empleado',
        GENERIC: 'Ha ocurrido un error inesperado',
    },
    CONFIRM: {
        DELETE_TITLE: '⚠️ Confirmar Eliminación',
        DELETE_MESSAGE: '¿Estás seguro de que deseas eliminar este empleado? Esta acción no se puede deshacer.',
        DELETE_CONFIRM: '🗑️ Sí, Eliminar',
        DELETE_CANCEL: 'Cancelar',
    },
    EMPTY: {
        NO_EMPLEADOS: 'No hay empleados registrados',
        LOADING: 'Cargando empleados...',
    },
} as const;

/**
 * Iconos de la aplicación
 */
export const ICONS = {
    SUCCESS: '✅',
    ERROR: '❌',
    EDIT: '✏️',
    DELETE: '🗑️',
    ADD: '➕',
    SAVE: '💾',
    ROCKET: '🚀',
    LIST: '📋',
    EMPTY: '📭',
} as const;
