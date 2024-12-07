export const validatePassword = (password: string) => {
  if (!password) return 'O campo senha é obrigatório.';
  if (password.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra maiúscula.';
  }
  if (!/[a-z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra minúscula.';
  }
  if (!/[0-9]/.test(password)) {
    return 'A senha deve conter pelo menos um número.';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'A senha deve conter pelo menos um caractere especial.';
  }
  return '';
};
