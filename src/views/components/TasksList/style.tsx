import styled from 'styled-components';

export const TaskCard = styled.div`
  background: #fff3c2;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TaskTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

export const Actions = styled.div`
  display: flex;
  gap: 4px;
  svg {
    cursor: pointer;
  }
`;

export const TaskDescription = styled.p`
  font-size: 14px;
  color: #555;
`;
