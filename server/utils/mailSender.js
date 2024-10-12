const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com", // Default to Gmail SMTP
      port: process.env.MAIL_PORT || 587, // Standard TLS port
      secure: false, // Use true if using port 465
      auth: {
        user: process.env.MAIL_USER, // Email account user
        pass: process.env.MAIL_PASS, // Email account password
      },
      tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate issues (if needed)
      },
    });

    const mailOptions = {
      from: `"Sender" <${process.env.MAIL_USER}>`, // Sender name and address
      to: email, // Receiver's email
      subject: title, // Email subject
      html: body, // HTML body content
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    return error.message;
  }
};

module.exports = mailSender;
