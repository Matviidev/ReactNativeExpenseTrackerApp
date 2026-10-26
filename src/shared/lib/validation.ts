const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const AMOUNT_PATTERN = /^\d+(\.\d{1,2})?$/;

export const required = (label: string) => ({
  required: `${label} is required`,
});

export const emailRules = {
  ...required("Email"),
  pattern: { value: EMAIL_PATTERN, message: "Enter a valid email" },
};

export const passwordRules = {
  ...required("Password"),
  minLength: { value: 6, message: "Password must be at least 6 characters" },
};

export const amountRules = {
  ...required("Amount"),
  pattern: { value: AMOUNT_PATTERN, message: "Enter a valid amount" },
};
