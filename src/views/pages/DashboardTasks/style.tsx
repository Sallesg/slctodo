import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const NewTaskButton = styled.button`
  border: none;
  padding: 16px;
  border-radius: 10px;
  cursor: pointer;
  background: #d4f2d6;
  &:hover {
    opacity: 0.8;
  }
`;

export const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

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
  gap: 8px;

  svg {
    cursor: pointer;
  }
`;

export const TaskDescription = styled.p`
  font-size: 14px;
  color: #555;
`;
