import validation from "validate.js";

export default function Validate(fieldName, value) {
  const constraints = {
    search: {
      length: {
        minimum: 2,
        maximum: 40
        //message: "^Search text must be between 1 and 40 characters"
      },
      format: { pattern: "^[A-Za-z ]+$" }
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
}
