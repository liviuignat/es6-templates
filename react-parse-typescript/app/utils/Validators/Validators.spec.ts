 import { RequiredStringValidator } from './index';

describe('Required string validator', () => {
  let validator = new RequiredStringValidator();

  describe('When value is empty', () => {
    it('Should validator not to be valid', () => {
      expect(validator.getIsValid('')).toBe(false);
    });
  });

  describe('When value is NOT empty', () => {
    it('Should validator not to be valid', () => {
      expect(validator.getIsValid('NOT Empty')).toBe(true);
    });
  });
});