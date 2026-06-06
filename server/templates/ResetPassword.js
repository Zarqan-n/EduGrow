// PASSWORD RESET TEMPLATE

export const resetPasswordTemplate = (link) => {
  return `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
      
      <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">
        
        <div style="background:#dc2626; padding:20px; text-align:center;">
          <h1 style="color:white; margin:0;">EduGrow</h1>
        </div>

        <div style="padding:30px;">
          <h2 style="color:#111827;">Password Reset Request</h2>

          <p style="color:#4b5563; font-size:16px;">
            Use the OTP below to reset your password:
          </p>

          <div style="
            background:#fef2f2;
            padding:20px;
            text-align:center;
            border-radius:8px;
            margin:30px 0;
          ">
            <h1 style="
              margin:0;
              letter-spacing:8px;
              color:#dc2626;
              font-size:40px;
            ">
              ${link}
            </h1>
          </div>

          <p style="color:#6b7280;">
            This link is valid for 5 minutes.
          </p>

          <p style="color:#6b7280;">
            If you did not request a password reset, please ignore this email.
          </p>
        </div>

      </div>
    </div>
  `;
};