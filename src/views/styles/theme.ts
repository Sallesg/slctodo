export default {};

export const theme = {
  colors: {
    primary: '#2b2e41',
    secondary: '#FFFFFF',
    primaryContrast: '#074c4e',
    background: '#f5f5f5',
    error: '#e74c3c',
    success: '#2ecc71',
    buttonPrimary: '#3498db',
  },
  spacings: {
    small: '1rem',
    medium: '2rem',
    large: '3rem',
  },
  bgColors: {
    primary: '#074c4e',
    secondary: '#FFFFFF',
  },
  borderRadii: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  textVariants: {
    defaults: {
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '1.5',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      lineHeight: '1.2',
    },
  },
  margins: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

export type Theme = typeof theme;
export type ThemeColors = keyof Theme['colors'];
export type Spacing = keyof Theme['spacings'];
export type BorderRadii = keyof Theme['borderRadii'];
export type Margins = keyof Theme['margins'];
