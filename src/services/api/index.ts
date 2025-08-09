import { usersOrganizations } from '@/services/api/users-organizations';
import { auth } from './auth';

// Cada módulo de acá, hace referencia a una tabla de la base de datos.
// Luego en cada módulo, se crean los métodos que se necesiten para interactuar con la API.
const api = {
  auth,
  usersOrganizations,
};

export default api;
