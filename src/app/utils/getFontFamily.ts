import { TextVariants, $fontFamily } from '@app/constants/fontTypes';

export const getFontFamily = (
  preset: TextVariants,
  bold?: boolean,
  semiBold?: boolean,
  light?: boolean,
) => {
  if (
    preset === 'headingLarge' ||
    preset === 'headingMedium' ||
    preset === 'headingSmall'
  ) {
    return $fontFamily.black;
  }
  switch (true) {
    case bold:
      return $fontFamily.bold;
    case semiBold:
      return $fontFamily.medium;
    case light:
      return $fontFamily.light;
    default:
      return $fontFamily.regular;
  }
};
