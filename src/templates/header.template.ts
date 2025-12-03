import { ICONS } from '../constants';

/**
 * Template para el header de la aplicación
 */
export const headerTemplate = (): string => `
    <div class="header">
        <h1>${ICONS.ROCKET} Gestión de Empleados</h1>
        <p>Sistema completo de administración con TypeScript + C# + SQL Server</p>
    </div>
`;
