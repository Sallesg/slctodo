import { ThemeColors } from '@views/styles/theme';

export type ButtonPreset =
  | 'primary'
  | 'CreateTask'
  | 'DeleteTask'
  | 'EditTask'
  | 'ReadTask';

interface ButtonUI {
  container: string;
  content: ThemeColors;
}

export const buttonPresets: Record<
  ButtonPreset,
  { default: ButtonUI; disabled: ButtonUI }
> = {
  primary: {
    default: {
      container: 'background-color: #074c4e;',
      content: 'secondary',
    },
    disabled: {
      container: 'background-color: #b0b0b0;',
      content: 'background',
    },
  },
  CreateTask: {
    default: {
      container: 'background-color: #3498db;',
      content: 'secondary',
    },
    disabled: {
      container: 'background-color: #b0b0b0;',
      content: 'background',
    },
  },
  DeleteTask: {
    default: {
      container: 'background-color: #e74c3c;',
      content: 'secondary',
    },
    disabled: {
      container: 'background-color: #b0b0b0;',
      content: 'background',
    },
  },
  EditTask: {
    default: {
      container: 'background-color: #f39c12;',
      content: 'secondary',
    },
    disabled: {
      container: 'background-color: #b0b0b0;',
      content: 'background',
    },
  },
  ReadTask: {
    default: {
      container: 'background-color: #2ecc71;',
      content: 'secondary',
    },
    disabled: {
      container: 'background-color: #b0b0b0;',
      content: 'background',
    },
  },
};
