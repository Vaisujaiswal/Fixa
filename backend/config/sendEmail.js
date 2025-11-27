// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: process.env.SMTP_SECURE === 'true', // convert to boolean
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export const sendEmail = async (to, subject, html) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.SMTP_FROM,
//       to,
//       subject,
//       html,
//     });
//     console.log("✅ Email sent successfully");
//   } catch (err) {
//     console.error("❌ Email failed:", err.message);
//   }
// };













import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, bodyContent) => {
  try {
    const htmlTemplate = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4f46e5; text-align: center;">Fixa Service Notification</h2>
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #333;">${bodyContent}</p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="http://your-frontend-url.com" style="background-color: #4f46e5; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Visit Fixa</a>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: htmlTemplate,
    });

    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
};
