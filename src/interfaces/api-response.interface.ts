/**
 * Interfaz genérica para respuestas de la API
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

/**
 * Interfaz para errores de API
 */
export interface ApiError {
    status: number;
    message: string;
    details?: string;
}
