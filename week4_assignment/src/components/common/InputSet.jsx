import styled from 'styled-components';

const InputSet = ({ type, labelText, id, name }) => {
  return (
    <InputWrapper>
      <InputLabel htmlFor={id}>{labelText}</InputLabel>
      <Input type={type} id={id} name={name} />
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
  height: 2rem;
  border-radius: 3px;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fonts.md};
`;
export default InputSet;
