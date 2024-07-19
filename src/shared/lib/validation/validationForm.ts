export const validatorEmail = (value: string): boolean => {
  const regMail =
    /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z0-9-]{2,6}$/;
  const regMails =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = true;
  if (!value) return isValid;

  if (!regMails.test(value) || !regMail.test(value)) return Boolean(!isValid);

  return isValid;
};

export const ValidatePassword = (value: string): boolean => {
  const regPassword = /^[\s\S]{8,32}$/;
  if (!value) return true;

  if (!regPassword.test(value)) return false;

  return true;
};

export const ValidateName = (value: string): boolean => {
  const regNameRu = /^[A-Za-z-а-яё\s+\D]{5,32}$/g;
  if (!value.trim()) return true;

  if (!regNameRu.test(value.trim())) return false;

  return true;
};
