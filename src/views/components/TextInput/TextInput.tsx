import { useRef } from 'react';
import { Text } from '../Text/Text';
import { $fontFamily, $fontSizes } from '@app/constants/fontTypes';

type TextInputContainerProps = React.ComponentProps<'input'> & {
  display?: string;
  flexdirection?: string;
  marginBottom?: string;
  padding?: string;
  bordercolor?: string;
  borderradius?: string;
};

export interface TextInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'date';
  errorMessage?: string;
  RightComponent?: React.ReactElement;
  inputprops: TextInputContainerProps;
  options?: { value: string; label: string }[];
}

export const TextInput = ({
  label,
  errorMessage,
  RightComponent,
  type,
  ...inputprops
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const $textInputContainer = {
    flexdirection: 'row',
    borderwidth: errorMessage ? 2 : 1,
    padding: '8px',
    bordercolor: errorMessage ? 'error' : 'gray4',
    borderradius: '12px',
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <Text preset="paragraphLarge" semiBold margin="0 0 4px">
        {label}
      </Text>
      <div {...$textInputContainer} onClick={focusInput}>
        <input
          ref={inputRef}
          style={$textInputStyle}
          {...inputprops.inputprops}
          type={type}
        />
        {RightComponent && RightComponent}
      </div>
      {errorMessage && (
        <Text preset="paragraphSmall" bold color="red" margin="6px 0 0">
          {errorMessage}
        </Text>
      )}
    </div>
  );
};

const $textInputStyle = {
  flexGrow: 1,
  flexShrink: 1,
  padding: '18px 10px',
  width: '100%',
  borderRadius: 12,
  fontFamily: $fontFamily.regular[0],
  fontWeight: $fontFamily.regular[1],
  ...$fontSizes.paragraphMedium,
};
