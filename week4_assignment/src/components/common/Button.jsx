import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 1rem;
  color: white;
  width: 7rem;
  height: 2.8rem;
  border: 0;
  cursor: pointer;
`;
