import { pwRegExp } from '../constants';

export const pwUtil = (value) => {
  return pwRegExp.test(value);
};
