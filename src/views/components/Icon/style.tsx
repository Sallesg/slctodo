import styled from 'styled-components';

export const Pressable = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
  border: none;
  &:hover {
    filter: brightness(1.1);
  }
`;
