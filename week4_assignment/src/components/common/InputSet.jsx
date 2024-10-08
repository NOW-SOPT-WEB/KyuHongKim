import styled from 'styled-components';

const InputSet = ({
  type = 'text',
  labelText,
  id,
  name,
  onInput,
  maxLength,
  onChange,
  blank,
  inputRef,
}) => {
  return (
    <InputWrapper>
      <InputLabel htmlFor={id}>{labelText}</InputLabel>
      <Input
        type={type}
        id={id}
        name={name}
        onInput={onInput}
        maxLength={maxLength}
        onChange={onChange}
        $blank={blank}
        ref={inputRef}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  width: 15rem;
  height: 2rem;
  border-radius: 3px;
  border: ${(props) => (props.$blank === true ? 'solid 1px red' : '0px')};
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fonts.md};
  width: 10rem;
`;
export default InputSet;
