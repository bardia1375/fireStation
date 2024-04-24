import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100vh;
  color: ${({ theme }) => theme.color.primary};
  background-image: linear-gradient(180deg, #d7ebee, #e4f3f4);
  box-shadow: inset 0px 0px 120px #75c9db59;

  & > main {
    flex: 1;
  }
`;
