export const validatePlantQuery = ({ data, allowed = [], forbidden = [], mandatory = [] }) => {
  const errors = [];
  const trans_data = {};

  Object.keys(data).forEach(field => {
    if (forbidden.includes(field)) {
      errors.push(`Field '${field}' is not allowed.`);
    }
  });

  Object.keys(data).forEach(field => {
    if (mandatory.includes(field) && !data[field]) {
      errors.push(`Field '${field}' is mandatory.`);
    }
  });

  Object.keys(data)
  .filter(field => !forbidden.includes(field))
  .forEach(field => {
    if (allowed.length > 0 && !allowed.includes(field)) {
      errors.push(`Field '${field}' is not allowed.`);
      return;
    }

    switch (field) {
      case 'id':
      case 'mother_id':
      case 'father_id':
      case 'strain_id':
      if (!/^\d+$/.test(data[field])) {
        errors.push(`Invalid ${field}. It must be a positive number.`);
      } else {
        trans_data[field] = Number(data[field]);
      }
      break;
      case 'name':
      if (typeof data[field] !== 'string') {
        errors.push('Invalid name. It must be a string.');
      } else {
        trans_data[field] = data[field];
      }
      break;
      case 'gender':
      if (!['m', 'f'].includes(data[field].toLowerCase())) {
        errors.push('Invalid gender. Allowed values: m, f');
      } else {
        trans_data[field] = data[field].toLowerCase();
      }
      break;
      case 'is_clone_generator':
      if (!['true', 'false'].includes(data[field].toLowerCase())) {
        errors.push('is_clone_generator must be true or false.');
      } else {
        trans_data[field] = data[field].toLowerCase() === 'true';
      }
      break;
      case 'growth_start_date':
      case 'germination_date':
      case 'seedling_date':
      case 'vegetative_date':
      case 'preflowering_date':
      case 'flowering_date':
      case 'harvesting_date':
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data[field])) {
        errors.push(`Invalid ${field}. It must be in the format YYYY-MM-DD.`);
      } else {
        trans_data[field] = data[field];
      }
      break;
      case 'start_stage':
      if (Number(data[field]) < 0 || Number(data[field]) > 6) {
        errors.push('Invalid start_stage. Allowed values: 0-6');
      } else {
        trans_data[field] = Number(data[field]);
      }
      break;
      default:
      errors.push(`Unknown field: ${field}`);
    }
    }
  );

  return {
    isValid: errors.length === 0,
    transformed_data: trans_data,
    errors,
  };
};
