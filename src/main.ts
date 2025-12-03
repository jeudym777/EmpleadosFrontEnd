import './style.css';
import { EmpleadosCRUD } from './components/empleados-crud.component';

const app = document.querySelector<HTMLDivElement>('#app')!;

// Crear instancia del CRUD
new EmpleadosCRUD(app);
