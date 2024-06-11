import { renderAsync } from "@react-email/components";
import { Resend } from "resend";

import TwoFaEmail from "@/emails/2fa-email";
import ConfirmEmail from "@/emails/confirm-email";
import ResetPassEmail from "@/emails/reset-pass-email";

import { noReplyMailer } from "./nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
  name?: string
) => {
  // TODO: Query params of both token and email should be used for verification, so there is no need for uuid token and can use smaller token such as nummber.

  

  let mailData = {
    from: 'Cipher | Do not reply <noreply@aaginnovations.com>',
    to: email,
    subject: 'Your two factor authentication code for Cipher Login',
    emailHtml: '',
  }

  const emailHtml = renderAsync(<TwoFaEmail email={email} token={token}/>).then((result)=> {
    mailData.emailHtml = result
  }).then(()=> {
     noReplyMailer(mailData)
  })

  // await noReplyMailer(mailData);

  // await resend.emails.send({
  //   from: 'onboarding@resend.dev',
  //   to: email,
  //   subject: '2 Factor Autentication Code',
  //   html: `<p>Your 2FA code: ${token}</p>`,
  // });
};

export const sendVerificationEmail = async (email: string, token: string, name?: string) => {
  // TODO: Query params of both token and email should be used for verification, so there is no need for uuid token and can use smaller token such as nummber.
  const confirmLink = `${domain}/new-verification?token=${token}&email=${email}`;

  let mailData = {
    from: 'Cipher | Do not reply <noreply@aaginnovations.com>',
    to: email,
    subject: 'Confirm your email to verify Cipher account',
    emailHtml:''
  }

  const emailHtml = renderAsync(<ConfirmEmail email={email} inviteLink={confirmLink} />).then((result)=> {
    mailData.emailHtml = result
  }).then(()=> {
    noReplyMailer(mailData)
 })


  // await noReplyMailer(mailData);

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "Confirm your email",
  //   html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  // });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  // TODO: Query params of both token and email should be used for verification, so there is no need for uuid token and can use smaller token such as nummber.
  const confirmLink = `${domain}/new-password?token=${token}&email=${email}`;

  let mailData = {
    from: 'Cipher | Do not reply <noreply@aaginnovations.com>',
    to: email,
    subject: 'Link to reset your Cipher account password',
    emailHtml:''
  }

  const emailHtml = renderAsync(<ResetPassEmail email={email} inviteLink={confirmLink} />).then((result)=> {
    mailData.emailHtml = result
  }).then(()=> {
    noReplyMailer(mailData)
 })

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "Reset your password",
  //   html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
  // });
};
