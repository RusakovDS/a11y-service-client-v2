export interface User {
  firstname?: string;
  lastname?: string;
  id: number | null;
  email: string | null;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends SignInFormData {
  firstname?: string;
  lastname?: string;
  confirmPassword: string;
}
