import './style.css';
import { EmpleadosCRUD } from './components/empleados-crud';

const app = document.querySelector<HTMLDivElement>('#app')!;

// Crear instancia del CRUD y hacerla global para los event handlers
const empleadosCRUD = new EmpleadosCRUD(app);
(window as any).empleadosCRUD = empleadosCRUD;
