import styled from 'styled-components';

export const Sidebar = styled.div`
  width: 200px;
  background: #d1e5f7;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    a {
      color: #333;
      text-decoration: none;
      font-size: 16px;
      margin-bottom: 10px;
      &:hover {
        color: #000;
      }
    }
  }
`;
