import styled from 'styled-components';

const InputSet = ({ type, labelText, inputId }) => {
  return (
    <InputWrapper>
      <InputLabel htmlFor={inputId}>{labelText}</InputLabel>
      <Input type={type} id={inputId} />
    </InputWrapper>
  );
};

const InputWrapper = styled.section`
  width: 80%;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  height: 3rem;
  border-radius: 3px;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fonts.lg};
`;
export default InputSet;
