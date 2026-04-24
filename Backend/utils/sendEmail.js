const nodemailer = require("nodemailer");
const ENV = require("../Helper/ENV/environment")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,      
    pass: ENV.EMAIL_PASS,      
  },
});


exports.sendOtpEmail = async (to, name, otp) => {
  const mailOptions = {
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email — OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">Hi ${name},</h2>
        <p>Thanks for signing up! Use the OTP below to verify your email address:</p>
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 28px; font-weight: bold; letter-spacing: 6px; border-radius: 6px; margin: 20px 0;">
          ${otp}
        </div>
        <p style="color: #666;">This OTP will expire in <strong>10 minutes</strong>.</p>
        <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
