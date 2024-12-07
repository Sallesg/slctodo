import styled from 'styled-components';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
}

const Svg = styled.svg<SvgProps>`
  width: ${(props) => props.size || '48px'};
  height: ${(props) => props.size || '48px'};
  fill: ${(props) => props.color || '#EA3838'};
`;

const Path = styled.path`
  fill-rule: evenodd;
  clip-rule: evenodd;
`;

const Circle = styled.circle`
  fill: ${(props) => props.color || '#EA3838'};
`;
export const CancelRound = ({ size = 20, color = '#EA3838' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle cx="24" cy="24" r="24" fill={color} />
      <Path
        d="M15 15.0004L31.2279 31.9996M15.7728 32L32 15"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
      />
    </Svg>
  );
};
