export interface AppError {
  type: 'AppError';
  message: string;
  errorType: 'Login Error' | 'LogOut Error' | 'SignUp Error' | 'Network Error';
}

export function isAppError(obj: any): obj is AppError {
  return (
    obj && typeof obj === 'object' && 'type' in obj && obj.type === 'AppError'
  );
}
