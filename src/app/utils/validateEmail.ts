export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'O campo e-mail é obrigatório.';
  if (!emailRegex.test(email)) return 'Por favor, insira um e-mail válido.';
  return '';
};
