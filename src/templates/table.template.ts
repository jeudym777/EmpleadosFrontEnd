import type { Empleado } from '../interfaces';
import { ICONS, MESSAGES } from '../constants';
import { DateFormatter } from '../utils';

/**
 * Template para la tabla de empleados
 */
export const tableTemplate = (empleados: Empleado[]): string => {
    if (empleados.length === 0) {
        return `
            <div class="loading">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${ICONS.EMPTY}</div>
                <p>${MESSAGES.EMPTY.NO_EMPLEADOS}</p>
            </div>
        `;
    }

    return `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Edad</th>
                        <th>Fecha Alta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${empleados.map(emp => tableRowTemplate(emp)).join('')}
                </tbody>
            </table>
        </div>
    `;
};

/**
 * Template para una fila de la tabla
 */
const tableRowTemplate = (empleado: Empleado): string => `
    <tr data-id="${empleado.id}">
        <td data-label="Código"><strong>${empleado.codEmpleado}</strong></td>
        <td data-label="Nombre">${empleado.nombre}</td>
        <td data-label="Email">${empleado.email}</td>
        <td data-label="Edad">${empleado.edad} años</td>
        <td data-label="Fecha Alta">${DateFormatter.toLocalFormat(empleado.fechaAlta)}</td>
        <td data-label="Acciones" class="actions">
            <button class="btn btn-primary btn-small btn-edit" data-id="${empleado.id}">
                ${ICONS.EDIT} Editar
            </button>
            <button class="btn btn-danger btn-small btn-delete" data-codigo="${empleado.codEmpleado}">
                ${ICONS.DELETE} Eliminar
            </button>
        </td>
    </tr>
`;

/**
 * Template para el contenedor de la tabla
 */
export const tableCardTemplate = (): string => `
    <div class="table-card">
        <h2>${ICONS.LIST} Lista de Empleados</h2>
        <div id="tabla-container">
            <div class="loading">${MESSAGES.EMPTY.LOADING}</div>
        </div>
    </div>
`;
