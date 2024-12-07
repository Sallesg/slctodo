import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
`;

export const Button = styled.button`
  padding: 14px;
  font-size: 1.2rem;
  border: none;
  background-color: #074c4e;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
`;
