/**
 * Constantes de configuración de la API
 */
export const API_CONFIG = {
    BASE_URL: 'http://localhost:5010/api',
    ENDPOINTS: {
        EMPLEADOS: '/Empleados',
        EMPLEADO_BY_ID: (id: number) => `/Empleados/${id}`,
        EMPLEADO_BY_CODIGO: (codigo: string) => `/Empleados/${codigo}`,
    },
    TIMEOUT: 30000, // 30 segundos
} as const;

/**
 * Códigos de estado HTTP
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;
