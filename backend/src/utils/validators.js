export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password) => {
  // 8–16 chars, 1 uppercase, 1 special char
  const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;
  return regex.test(password);
};

export const isValidName = (name) => {
  return name && name.length >= 20 && name.length <= 60;
};

export const isValidAddress = (address) => {
  return !address || address.length <= 400;
};

export const isValidRating = (rating) => {
  return rating >= 1 && rating <= 5;
};
