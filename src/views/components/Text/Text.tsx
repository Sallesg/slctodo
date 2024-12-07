import styled from 'styled-components';
import { $fontSizes, TextVariants } from '@app/constants/fontTypes';
import { getFontFamily } from '@app/utils/getFontFamily';

interface StyledTextProps {
  preset: TextVariants;
  fontFamily?: string[];
  fontWeight?: string[];
  color?: string;
  margin?: string;
}

const StyledText = styled.p<StyledTextProps>`
  font-size: ${(props) => $fontSizes[props.preset]?.fontSize};
  line-height: ${(props) => $fontSizes[props.preset]?.lineHeight};
  font-family: ${(props) => props.fontFamily?.[0] || 'inherit'};
  font-weight: ${(props) => props.fontFamily?.[1] || 'normal'};
  color: ${(props) => props.color || 'black'};
  margin: ${(props) => props.margin || '0'};
`;

interface TextProps {
  children: React.ReactNode;
  preset?: TextVariants;
  bold?: boolean;
  semiBold?: boolean;
  light?: boolean;
  style?: React.CSSProperties;
  color?: string;
  margin?: string;
}

export const Text = ({
  children,
  preset = 'paragraphMedium',
  bold,
  semiBold,
  light,
  style,
  color = 'black',
  margin,
  ...props
}: TextProps) => {
  const fontFamily = getFontFamily(preset, bold, semiBold, light);

  return (
    <StyledText
      preset={preset}
      fontFamily={fontFamily}
      style={style}
      color={color}
      margin={margin}
      {...props}
    >
      {children}
    </StyledText>
  );
};
