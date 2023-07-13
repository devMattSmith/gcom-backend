import { SafeString } from "handlebars";
const nodemailer = require("nodemailer");
const templateService = require("../services/templateService");

const transporter = nodemailer.createTransport({
  host: "mail.vps84069.inmotionhosting.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "test@projectanddemoserver.com",
    pass: "2{MC7&%%yxSk",
  },
  tls: { rejectUnauthorized: false },
});
const sendEmail = async (mailOptions) => {
  transporter.verify(async (error) => {
    if (error) console.log(error);
  });
  const emailResponse = await transporter.sendMail(mailOptions);
  // if (!emailResponse.messageId) return error
  return { result: "Email sent successfully" };
};

export const sendForgotPasswordEmail = async (toEmail, name, url) => {
  const content = `Reset Your Password`;
  const subject = "Restore Password";
  const title = "Restore Password";
  const mainLink = url;

  const html = templateService.getForgotTemplate({
    name,
    content,
    subject,
    title,
    mainLink,
  });

  const mailOptions = {
    from: "test@projectanddemoserver.com",
    to: toEmail,
    subject: "Request Reset Password",
    attachments: [
      {
        filename: "image.jpg",
        path: "https://gcom-public.s3.amazonaws.com/logo.png",
        cid: "logoImage", //same cid value as in the html img src
      },
    ],
    html,
  };

  const sendEmailResponse = await sendEmail(mailOptions);
  return sendEmailResponse;
};

export const sendVerifyingUserEmail = async (toEmail, name, url) => {
  const content = `Please verify your email`;
  const subject = "Verify Email";
  const title = "Verify Email";
  const mainLink = url;

  const html = templateService.emailVerifyTemplate({
    name,
    content,
    subject,
    title,
    mainLink,
  });

  const mailOptions = {
    from: "test@projectanddemoserver.com",
    to: toEmail,
    subject: "Request Verify Email",
    attachments: [
      {
        filename: "image.jpg",
        path: "https://gcom-public.s3.amazonaws.com/logo.png",
        cid: "logoImage", //same cid value as in the html img src
      },
    ],
    html,
  };

  const sendEmailResponse = await sendEmail(mailOptions);
  return sendEmailResponse;
};

export const sendWelcomEmail = async (toEmail, name) => {
  const subject = "Welcome to GCOM";
  const title = "Welcome to GCOM";
  const content = `Thank you for registering!`;
  const html = templateService.welcomTemplate({
    name,
    content,
    subject,
    title,
  });

  const mailOptions = {
    from: "test@projectanddemoserver.com",
    to: toEmail,
    subject: "Welcome",
    attachments: [
      {
        filename: "image.jpg",
        path: "https://gcom-public.s3.amazonaws.com/logo.png",
        cid: "logoImage", //same cid value as in the html img src
      },
    ],
    html,
  };

  const sendEmailResponse = await sendEmail(mailOptions);
  return sendEmailResponse;
};
