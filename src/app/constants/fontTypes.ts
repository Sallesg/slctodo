export type TextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

export const $fontFamily = {
  regular: ['Roboto', '400'],
  medium: ['Roboto', '500'],
  bold: ['Roboto', '700'],
  light: ['Roboto', '300'],
  black: ['Roboto', '900'],
};

export const $fontSizes: Record<
  TextVariants,
  { fontSize: string; lineHeight: string }
> = {
  headingLarge: { fontSize: '36px', lineHeight: '38.4px' },
  headingMedium: { fontSize: '24px', lineHeight: '26.4px' },
  headingSmall: { fontSize: '20px', lineHeight: '23.4px' },
  paragraphLarge: { fontSize: '18px', lineHeight: '25.2px' },
  paragraphMedium: { fontSize: '16px', lineHeight: '22.4px' },
  paragraphSmall: { fontSize: '14px', lineHeight: '19.6px' },
  paragraphCaption: { fontSize: '12px', lineHeight: '16.8px' },
  paragraphCaptionSmall: { fontSize: '10px', lineHeight: '14px' },
};
