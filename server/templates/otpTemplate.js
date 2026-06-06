// OTP EMAIL TEMPLATE

export const otpTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
      
      <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">
        
        <div style="background:#2563eb; padding:20px; text-align:center;">
          <h1 style="color:white; margin:0;">EduGrow</h1>
        </div>

        <div style="padding:30px;">
          <h2 style="color:#111827;">Verify Your Account</h2>

          <p style="color:#4b5563; font-size:16px;">
            Use the OTP below to verify your account:
          </p>

          <div style="
            background:#eff6ff;
            padding:20px;
            text-align:center;
            border-radius:8px;
            margin:30px 0;
          ">
            <h1 style="
              margin:0;
              letter-spacing:8px;
              color:#2563eb;
              font-size:40px;
            ">
              ${otp}
            </h1>
          </div>

          <p style="color:#6b7280;">
            This OTP is valid for 10 minutes.
          </p>

          <p style="color:#6b7280;">
            If you did not request this OTP, please ignore this email.
          </p>
        </div>

      </div>
    </div>
  `;
};