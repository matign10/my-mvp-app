// Simulación de base de datos de usuarios
const users = [
  {
    email: 'matias.gonzalez.novillo@gmail.com',
    password: 'asd39829775', // En una implementación real, esto estaría hasheado
    name: 'Matías González Novillo',
    role: 'admin'
  }
];

export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    // En una implementación real, generaríamos un JWT token
    return {
      success: true,
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
  return { success: false, error: 'Credenciales inválidas' };
}; 