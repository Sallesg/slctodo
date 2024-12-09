import styled, { css } from 'styled-components';
import { buttonPresets, ButtonPreset } from './style';
import { Text } from '../Text/Text';

interface ButtonProps {
  title: string;
  loading?: boolean;
  preset?: ButtonPreset;
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
  padding?: string;
  border?: string;
  bgcolor?: string;
  borderradius?: string;
}

const ButtonContainer = styled.button<ButtonProps>`
  width: ${({ width }) => width || 'auto'};
  padding: ${({ padding }) => padding || '4px'};
  height: ${({ height }) => height || 'auto'};
  border: ${({ border }) => border || 'none'};
  background-color: ${({ bgcolor }) => bgcolor || 'transparent'};
  border-radius: ${({ borderradius }) => borderradius || '4px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ preset = 'primary', disabled }) => {
    const buttonPreset =
      buttonPresets[preset][disabled ? 'disabled' : 'default'];
    return css`
      ${buttonPreset.container}
    `;
  }}

  transition: all 0.3s;
  &:hover {
    filter: brightness(1.2);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  width: 24px;
  height: 24px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid black;
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ButtonGeneral = ({
  title,
  loading = false,
  preset = 'primary',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <ButtonContainer
      title={title}
      disabled={disabled || loading}
      preset={preset}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Text preset="paragraphMedium" bold color="#FFFFFF">
          {title}
        </Text>
      )}
    </ButtonContainer>
  );
};
