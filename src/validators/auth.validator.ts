export const validateRegister = (data: any): string[] => {
    const errors: string[] = [];
    if (!data.email) errors.push("Email is required");
    if (!data.password) errors.push("Password is required");
    if (data.password && data.password.length < 6) errors.push("Password must be at least 6 characters");
    return errors;
};

export const validateLogin = (data: any): string[] => {
    const errors: string[] = [];
    if (!data.email) errors.push("Email is required");
    if (!data.password) errors.push("Password is required");
    return errors;
};
export const validateForgotPassword = (data: any): string[] => {
    const errors: string[] = [];
    if (!data.email) errors.push("Email is required");
    return errors;
};
export const validateResetPassword = (data: any): string[] => {
    const errors: string[] = [];
    if (!data.email) errors.push("Email is required");
    if (!data.code) errors.push("OTP code is required");
    if (!data.newPassword) errors.push("New password is required");
    if (data.newPassword && data.newPassword.length < 6) errors.push("Password must be at least 6 characters");
    return errors;
  };
export const validateSendOtp = (data: any): string[] => {
    const errors: string[] = [];
    if(!data.type) errors.push("OTP type is required");
    return errors;
};
export const validateVerifyOtp = (data:any): string[] => {
    const errors: string[] =[];
    if (!data.code) errors.push("OTP code is required");
    if (!data.type) errors.push("OTP type is required");
    return errors;
};