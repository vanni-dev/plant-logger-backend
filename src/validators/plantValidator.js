// src/common/plantValidator.js
export const validatePlantData = (data) => {
  const errors = [];
  const requiredFields = ['gender', 'strain_id', 'start_stage'];

  for (let field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      errors.push(`${field} is required`);
    }
  }

  if (data.gender !== undefined && !['m', 'f'].includes(data.gender)) {
    errors.push('Invalid gender');
  }

  if (data.strain_id !== undefined && (isNaN(data.strain_id) || data.strain_id <= 0)) {
    errors.push('Invalid strain_id');
  }

  if (data.is_clone_generator !== undefined && typeof data.is_clone_generator !== 'boolean') {
    errors.push('is_clone_generator must be a boolean');
  }

  if (data.start_stage !== undefined && (isNaN(data.start_stage) || data.start_stage < 0 || data.start_stage > 6)) {
    errors.push('Invalid start_stage');
  }

  if (data.mother_id !== undefined && (isNaN(data.mother_id) || data.mother_id <= 0)) {
    errors.push('Invalid mother_id');
  }

  if (data.father_id !== undefined && (isNaN(data.father_id) || data.father_id <= 0)) {
    errors.push('Invalid father_id');
  }

  const dateFields = ['growth_start_date', 'germination_date', 'seedling_date', 'vegetative_date', 'preflowering_date', 'flowering_date', 'harvesting_date'];
  for (let field of dateFields) {
    if (data[field] && isNaN(Date.parse(data[field]))) {
      errors.push(`Invalid ${field}`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, message: 'Valid data' };
};
