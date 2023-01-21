const validateName = (name) => {
  const nameregex = new RegExp(/[a-zA-Z][a-z/A-Z]+[a-z/A-Z]$/);
  return nameregex.test(name);
};
const validateEmail = (email) => {
  const emailregex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
  return emailregex.test(email);
};

module.exports = { validateEmail, validateName };
