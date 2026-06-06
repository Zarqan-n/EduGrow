// COURSE PURCHASE TEMPLATE

export const coursePurchaseTemplate = (
  username,
  courseName,
  instructor,
  price
) => {
  return `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
      
      <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">
        
        <div style="background:#059669; padding:20px; text-align:center;">
          <h1 style="color:white; margin:0;">EduGrow</h1>
        </div>

        <div style="padding:30px;">
          
          <h2 style="color:#111827;">
            Enrollment Successful
          </h2>

          <p style="color:#4b5563; font-size:16px;">
            Hello ${username},
          </p>

          <p style="color:#4b5563;">
            Your course purchase has been confirmed successfully.
          </p>

          <div style="
            background:#ecfdf5;
            padding:20px;
            border-radius:8px;
            margin:30px 0;
          ">
            
            <p>
              <strong>Course:</strong> ${courseName}
            </p>

            <p>
              <strong>Instructor:</strong> ${instructor}
            </p>

            <p>
              <strong>Amount Paid:</strong> ₹${price}
            </p>

          </div>

          <p style="color:#6b7280;">
            You can now access this course from your dashboard.
          </p>

          <p style="color:#6b7280;">
            Thank you for learning with EduGrow.
          </p>

        </div>

      </div>
    </div>
  `;
};