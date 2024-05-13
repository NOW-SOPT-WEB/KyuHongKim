const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;

export const pwUtil = (value) => {
  return pwRegExp.test(value);
};
