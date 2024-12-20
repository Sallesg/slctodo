import styled from 'styled-components';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
}

const Svg = styled.svg<SvgProps>`
  width: ${(props) => props.size || '23px'};
  height: ${(props) => props.size || '23px'};
  fill: ${(props) => props.color || 'green'};
`;

export const EditIcon = ({ size = 23 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none">
      <path
        opacity="0.6"
        d="M10 3.12131H3C2.46957 3.12131 1.96086 3.33202 1.58579 3.70709C1.21071 4.08217 1 4.59087 1 5.12131V19.1213C1 19.6517 1.21071 20.1604 1.58579 20.5355C1.96086 20.9106 2.46957 21.1213 3 21.1213H17C17.5304 21.1213 18.0391 20.9106 18.4142 20.5355C18.7893 20.1604 19 19.6517 19 19.1213V12.1213"
        stroke="#5061FC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.5 1.62132C17.8978 1.2235 18.4374 1 19 1C19.5626 1 20.1022 1.2235 20.5 1.62132C20.8978 2.01915 21.1213 2.55871 21.1213 3.12132C21.1213 3.68393 20.8978 4.2235 20.5 4.62132L11 14.1213L7 15.1213L8 11.1213L17.5 1.62132Z"
        stroke="#5061FC"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
