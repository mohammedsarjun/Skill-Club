export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 50) return "Name must be less than 50 characters";
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
  if (!regex.test(trimmed)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
  return null;
}

export function validateEmail(email: string): Boolean | null {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ;
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  if (!/[!@#$%^&*]/.test(password)) return "Password must contain a special character";
  return null;
}

export function validateConfirmPassword(password: string, confirm: string): string | null {
  return password === confirm ? null : "Passwords do not match";
}
