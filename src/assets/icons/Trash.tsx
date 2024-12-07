import styled from 'styled-components';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
}

const Svg = styled.svg<SvgProps>`
  width: ${(props) => props.size || '20px'};
  height: ${(props) => props.size || '20px'};
  fill: ${(props) => props.color || 'red'};
`;

export const TrashIcon = ({ size = 20, color = 'red' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M4.525 19C4.1125 19 3.75937 18.8531 3.46563 18.5594C3.17188 18.2656 3.025 17.9125 3.025 17.5V3.25H2V1.75H6.7V1H13.3V1.75H18V3.25H16.975V17.5C16.975 17.9 16.825 18.25 16.525 18.55C16.225 18.85 15.875 19 15.475 19H4.525ZM15.475 3.25H4.525V17.5H15.475V3.25ZM7.175 15.35H8.675V5.375H7.175V15.35ZM11.325 15.35H12.825V5.375H11.325V15.35Z"
        fill={color}
      />
    </Svg>
  );
};
