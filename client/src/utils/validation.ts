export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 50;
};

export const validatePhone = (phone?: string): boolean => {
  if (!phone) return true;
  return /^[0-9]{10,11}$/.test(phone.replace(/[^0-9]/g, ''));
};

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  general?: string;
}

export const validateLoginForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {};

  if (!email) {
    errors.email = 'E-posta adresi zorunludur';
  } else if (!validateEmail(email)) {
    errors.email = 'Geçerli bir e-posta adresi giriniz';
  }

  if (!password) {
    errors.password = 'Şifre zorunludur';
  } else if (!validatePassword(password)) {
    errors.password = 'Şifre en az 6 karakter olmalıdır';
  }

  return errors;
};

export const validateRegisterForm = (
  username: string,
  email: string,
  password: string,
  phoneNumber?: string
): FormErrors => {
  const errors: FormErrors = {};

  if (!username) {
    errors.username = 'Kullanıcı adı zorunludur';
  } else if (!validateUsername(username)) {
    errors.username = 'Kullanıcı adı en az 3, en fazla 50 karakter olmalıdır';
  }

  if (!email) {
    errors.email = 'E-posta adresi zorunludur';
  } else if (!validateEmail(email)) {
    errors.email = 'Geçerli bir e-posta adresi giriniz';
  }

  if (!password) {
    errors.password = 'Şifre zorunludur';
  } else if (!validatePassword(password)) {
    errors.password = 'Şifre en az 6 karakter olmalıdır';
  }

  if (phoneNumber && !validatePhone(phoneNumber)) {
    errors.phoneNumber = 'Geçerli bir telefon numarası giriniz';
  }

  return errors;
};