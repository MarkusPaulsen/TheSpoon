import validation from "validate.js";

export default function Validate(fieldName, value) {
  const constraints = {
    username: {
      length: {
        minimum: 1,
        message: "^Please enter a username"
      }
    },

    password: {
      length: {
        minimum: 1,
        message: "^Please enter a password"
      }
    }
  };

  let formValues = {};
  formValues[fieldName] = value;

  let formFields = {};
  formFields[fieldName] = constraints[fieldName];

  const result = validation(formValues, formFields);

  if (result) {
    return result[fieldName][0];
  }
  return null;
}
