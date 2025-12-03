/**
 * Utilidades para formateo de fechas
 */
export class DateFormatter {
    /**
     * Formatea una fecha ISO a formato DD/MM/YYYY
     */
    static toLocalFormat(fecha: string | undefined | null): string {
        try {
            if (!fecha) {
                return 'No registrada';
            }
            
            const date = new Date(fecha);
            
            if (isNaN(date.getTime())) {
                return 'No registrada';
            }
            
            const dia = date.getDate().toString().padStart(2, '0');
            const mes = (date.getMonth() + 1).toString().padStart(2, '0');
            const anio = date.getFullYear();
            
            return `${dia}/${mes}/${anio}`;
        } catch (error) {
            console.error('Error al formatear fecha:', fecha, error);
            return 'No registrada';
        }
    }

    /**
     * Formatea una fecha a formato ISO
     */
    static toISOFormat(date: Date): string {
        return date.toISOString();
    }
}
