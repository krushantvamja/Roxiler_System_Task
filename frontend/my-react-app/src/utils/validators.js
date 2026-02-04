// Email validation
export const isValidEmail = (email) => {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation (min 6 chars)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Required field validation
export const isRequired = (value) => {
  return value !== undefined && value !== null && value.toString().trim() !== "";
};

// Register form validation
export const validateRegister = ({ name, email, address, password }) => {
  const errors = {};

  if (!isRequired(name)) errors.name = "Name is required";
  if (!isValidEmail(email)) errors.email = "Invalid email address";
  if (!isRequired(address)) errors.address = "Address is required";
  if (!isValidPassword(password))
    errors.password = "Password must be at least 6 characters";

  return errors;
};

// Login form validation
export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!isValidEmail(email)) errors.email = "Invalid email";
  if (!isRequired(password)) errors.password = "Password is required";

  return errors;
};
