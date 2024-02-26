/**
 * Validates required fields in a request body.
 * @param {Object} body - The request body object containing fields to be validated.
 * @param {Array} requiredFields - An array of field names that are required.
 * @param {Array} errors - An array to store validation errors.
 */
export function ValidateRequiredFields(
  body,
  requiredFields,
  fieldMappings,
  errors
) {
  requiredFields.forEach((field) => {
    const mappingFieldName = fieldMappings[field] || field;

    if (
      !(field in body) ||
      (typeof body === "string" && body[field].trim() === "")
    ) {
      errors.push(`${mappingFieldName} is required.`);
    }
  });
}

/**
 * Validates data type of specified fields in a request body.
 * @param {Object} body - The request body object containing fields to be validated.
 * @param {string} expectedType - The expected data type.
 * @param {Array} fields - An array of field names to be validated.
 * @param {Array} errors - An array to store error messages.
 */
export function ValidateDataType(
  body,
  expectedType,
  fields,
  fieldMappings,
  errors
) {
  for (const key of fields) {
    const mappingFieldName = fieldMappings[key] || key;
    if (body.hasOwnProperty(key)) {
      const value = body[key];
      if (value && typeof value !== expectedType) {
        errors.push(`Invalid type for ${mappingFieldName.toLowerCase()}.`);
      }
    }
  }
}
