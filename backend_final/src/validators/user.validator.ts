const isValidEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex: RegExp = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
};

const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime());
};

const validatePassword = (password: string): boolean => {
  const regex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  return regex.test(password);
};

export { isValidEmail, isValidPhoneNumber, isValidDate, validatePassword };
