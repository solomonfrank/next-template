import { JSXElementConstructor, ReactElement } from "react";
import { Resend } from "resend";
import { CreateEmailOptions } from "resend/build/src/emails/interfaces";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export type sendEmailProps = {
  test?: boolean;
  to: string;
  subject: string;
  from: string;
  react: ReactElement<any, string | JSXElementConstructor<any>>;
};

export const sendEmail = ({ from, react, to, subject }: sendEmailProps) => {
  if (!resend) {
    return Promise.resolve();
  }
  resend.emails.send({
    from,
    to,
    subject,
    react,
  });
};
