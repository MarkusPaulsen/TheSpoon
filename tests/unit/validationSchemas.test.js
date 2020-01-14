const Joi = require('joi');

const validationSchemas = require('../../validationSchemas.js');

describe('Schemas', () => {

  describe('registrationCustomerValidation', () => {

    it('should validate a correct schema', () => {
      const schema = {
        username: "xXEmilioXx",
        email: "xXEmilioXx@mail.com",
        password: "12345"
      };
      const result = Joi.validate(schema, validationSchemas.registrationCustomerValidation);
      expect(result.error).toBeNull();
    });
    it('should not validate a too short password', () => {
      const schema = {
        username: "xXEmilioXx",
        email: "xXEmilioXx@mail.com",
        password: "1234"
      };
      const result = Joi.validate(schema, validationSchemas.registrationCustomerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a too short username', () => {
      const schema = {
        username: "pew",
        email: "xXEmilioXx@mail.com",
        password: "123456"
      };
      const result = Joi.validate(schema, validationSchemas.registrationCustomerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate an invalid email', () => {
      const schema = {
        username: "xXEmilioXx",
        email: "xXEmilioXxmail.com",
        password: "123456"
      };
      const result = Joi.validate(schema, validationSchemas.registrationCustomerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema without the username', () => {
      const schema = {
        email: "xXEmilioXx@mail.com",
        password: "123456"
      };
      const result = Joi.validate(schema, validationSchemas.registrationCustomerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema without the email', () => {
      const schema = {
        username: "xXEmilioXx",
        password: "123456"
      };
      const result = Joi.validate(schema, validationSchemas.registrationCustomerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema without the password', () => {
      const schema = {
        username: "xXEmilioXx",
        email: "xXEmilioXx@mail.com"
      };
      const result = Joi.validate(schema, validationSchemas.registrationCustomerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema with an extra field', () => {
      const schema = {
        username: "xXEmilioXx",
        email: "xXEmilioXx@mail.com",
        password: "12345",
        extra: "extra"
      };
      const result = Joi.validate(schema, validationSchemas.registrationCustomerValidation);
      expect(result.error).not.toBeNull();
    })
  });

  describe('registrationOwnerValidation', () => {

    it('should validate a correct schema', () => {
      const schema = {
        username: "xXEmilioXx",
        name: "Emilio",
        surname: "Imperiali",
        email: "xXEmilioXx@mail.com",
        password: "12345"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).toBeNull();
    });
    it('should not validate a too short password', () => {
      const schema = {
        username: "xXEmilioXx",
        name: "Emilio",
        surname: "Imperiali",
        email: "xXEmilioXx@mail.com",
        password: "1234"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a too short username', () => {
      const schema = {
        username: "pew",
        name: "Emilio",
        surname: "Imperiali",
        email: "xXEmilioXx@mail.com",
        password: "123456"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate an invalid email', () => {
      const schema = {
        username: "xXEmilioXx",
        name: "Emilio",
        surname: "Imperiali",
        email: "xXEmilioXxmail.com",
        password: "123456"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema without the username', () => {
      const schema = {
        name: "Emilio",
        surname: "Imperiali",
        email: "xXEmilioXx@mail.com",
        password: "123456"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema without the name', () => {
      const schema = {
        username: "xXEmilioXx",
        surname: "Imperiali",
        email: "xXEmilioXx@mail.com",
        password: "12345"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema without the surname', () => {
      const schema = {
        username: "xXEmilioXx",
        name: "Emilio",
        email: "xXEmilioXx@mail.com",
        password: "12345"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema without the email', () => {
      const schema = {
        username: "xXEmilioXx",
        name: "Emilio",
        surname: "Imperiali",
        password: "123456"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema without the password', () => {
      const schema = {
        username: "xXEmilioXx",
        name: "Emilio",
        surname: "Imperiali",
        email: "xXEmilioXx@mail.com"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    });
    it('should not validate a schema with an extra field', () => {
      const schema = {
        username: "xXEmilioXx",
        name: "Emilio",
        surname: "Imperiali",
        email: "xXEmilioXx@mail.com",
        password: "12345",
        extra: "extra"
      };
      const result = Joi.validate(schema, validationSchemas.registrationOwnerValidation);
      expect(result.error).not.toBeNull();
    })
  })
});