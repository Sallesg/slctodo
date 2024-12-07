import styled from 'styled-components';

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const DialogContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const Button = styled.button<{ variant?: 'cancel' }>`
  margin-top: 12px;
  margin-right: 8px;
  padding: 10px 16px;
  background-color: ${({ variant }) =>
    variant === 'cancel' ? 'gray' : '#074c4e'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'cancel' ? '#555' : '#056066'};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 8px;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  resize: none;
`;

export const FileInput = styled.input`
  margin-top: 12px;
`;
