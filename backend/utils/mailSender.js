import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_SENDER_EMAIL,
      pass: process.env.MAIL_SENDER_PASS,
    },
  });

const sendResetPasswordMail = async (to, url) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.MAIL_SENDER_EMAIL,
    to: to,
    subject: "[Brew Bliss] Password Reset",
    html: `
        <div style="margin: 0; padding: 0; background-color: #F5F0E8; font-family: Georgia, 'Times New Roman', serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F0E8; padding: 50px 20px;">
                <tr>
                    <td align="center">
                        <table width="580" cellpadding="0" cellspacing="0" style="max-width: 580px; width: 100%;">
                            <tr>
                                <td align="center" style="padding-bottom: 10px;">
                                    <div style="display: inline-block; border-bottom: 1px solid #FEA90C; padding-bottom: 14px; margin-bottom: 6px;">
                                        <a href="#" style="font-size: 30px; color: #0F0F0F; text-decoration: none; letter-spacing: 4px; font-weight: normal; text-transform: uppercase;">Brew Bliss</a>
                                    </div>
                                    <p style="color: #9a8a6a; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 8px 0 0 0;">Password Reset</p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    <div style="width: 40px; height: 1px; background-color: #FEA90C; display: inline-block;"></div>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #FFFFFF; border: 1px solid #e8e0d0; padding: 50px 48px;">
                                    <p style="color: #9a8a6a; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 28px 0;">A request was made</p>
                                    <p style="color: #0F0F0F; font-size: 17px; line-height: 1.8; margin: 0 0 16px 0;">
                                        Someone has requested a password reset for your Brew Bliss account.
                                    </p>
                                    <p style="color: #6a5f52; font-size: 15px; line-height: 1.8; margin: 0 0 40px 0;">
                                        If this wasn't you, simply ignore this email — your password will remain unchanged.
                                    </p>
                                    <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                        <tr>
                                            <td align="center" style="background-color: #FEA90C;">
                                                <a href="${url}" style="display: inline-block; padding: 14px 40px; color: #0F0F0F; text-decoration: none; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; font-family: Georgia, serif; font-weight: bold;">Reset Password</a>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style="border-top: 1px solid #e8e0d0; margin: 44px 0 28px 0;"></div>
                                    <p style="color: #b0a090; font-size: 12px; line-height: 1.7; margin: 0; text-align: center;">
                                        This link will expire in 24 hours. If you need further assistance, contact our support team.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 32px 0 0 0;">
                                    <p style="color: #b0a090; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">© ${new Date().getFullYear()} Brew Bliss LLC</p>
                                    <p style="color: #c0b0a0; font-size: 11px; letter-spacing: 1px; margin: 0;">All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        `,
  });
};

const sendContactMail = async (to, message) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.MAIL_SENDER_EMAIL,
    to: process.env.MAIL_SENDER_EMAIL,
    replyTo: to,
    subject: "[Brew Bliss] Contact Form",
    html: `
        <div style="margin: 0; padding: 0; background-color: #F5F0E8; font-family: Georgia, 'Times New Roman', serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F0E8; padding: 50px 20px;">
                <tr>
                    <td align="center">
                        <table width="580" cellpadding="0" cellspacing="0" style="max-width: 580px; width: 100%;">
                            <tr>
                                <td align="center" style="padding-bottom: 10px;">
                                    <div style="display: inline-block; border-bottom: 1px solid #FEA90C; padding-bottom: 14px; margin-bottom: 6px;">
                                        <a href="#" style="font-size: 30px; color: #0F0F0F; text-decoration: none; letter-spacing: 4px; font-weight: normal; text-transform: uppercase;">Brew Bliss</a>
                                    </div>
                                    <p style="color: #9a8a6a; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 8px 0 0 0;">New Message Received</p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    <div style="width: 40px; height: 1px; background-color: #FEA90C; display: inline-block;"></div>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #FFFFFF; border: 1px solid #e8e0d0; padding: 50px 48px;">
                                    <p style="color: #9a8a6a; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 28px 0;">Contact Form Submission</p>
                                    <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 36px;">
                                        <tr>
                                            <td style="padding: 14px 18px; background-color: #fdf8f0; border-left: 2px solid #FEA90C;">
                                                <p style="margin: 0 0 4px 0; color: #9a8a6a; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">From</p>
                                                <a href="mailto:${to}" style="color: #0F0F0F; font-size: 15px; text-decoration: none;">${to}</a>
                                            </td>
                                        </tr>
                                    </table>
                                    <p style="color: #9a8a6a; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px 0;">Message</p>
                                    <div style="background-color: #fdf8f0; border: 1px solid #e8e0d0; padding: 24px 28px;">
                                        <p style="color: #0F0F0F; font-size: 15px; line-height: 1.9; margin: 0;">${message}</p>
                                    </div>
                                    <div style="border-top: 1px solid #e8e0d0; margin: 44px 0 28px 0;"></div>
                                    <p style="color: #b0a090; font-size: 12px; line-height: 1.7; margin: 0; text-align: center;">
                                        Reply directly to this email to respond to the sender.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 32px 0 0 0;">
                                    <p style="color: #b0a090; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">© ${new Date().getFullYear()} Brew Bliss LLC</p>
                                    <p style="color: #c0b0a0; font-size: 11px; letter-spacing: 1px; margin: 0;">All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        `,
  });
};

const sendNewsletterMail = async (to) => {
  const transporter = createTransporter();

  // Confirmation to the subscriber
  await transporter.sendMail({
    from: process.env.MAIL_SENDER_EMAIL,
    to: to,
    subject: "[Brew Bliss] You're subscribed!",
    html: `
        <div style="margin: 0; padding: 0; background-color: #F5F0E8; font-family: Georgia, 'Times New Roman', serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F0E8; padding: 50px 20px;">
                <tr>
                    <td align="center">
                        <table width="580" cellpadding="0" cellspacing="0" style="max-width: 580px; width: 100%;">
                            <tr>
                                <td align="center" style="padding-bottom: 10px;">
                                    <div style="display: inline-block; border-bottom: 1px solid #FEA90C; padding-bottom: 14px; margin-bottom: 6px;">
                                        <a href="#" style="font-size: 30px; color: #0F0F0F; text-decoration: none; letter-spacing: 4px; font-weight: normal; text-transform: uppercase;">Brew Bliss</a>
                                    </div>
                                    <p style="color: #9a8a6a; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 8px 0 0 0;">Newsletter</p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px 0;">
                                    <div style="width: 40px; height: 1px; background-color: #FEA90C; display: inline-block;"></div>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #FFFFFF; border: 1px solid #e8e0d0; padding: 50px 48px;">
                                    <p style="color: #9a8a6a; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 28px 0;">Welcome aboard</p>
                                    <p style="color: #0F0F0F; font-size: 17px; line-height: 1.8; margin: 0 0 16px 0;">
                                        Thank you for subscribing to the Brew Bliss newsletter.
                                    </p>
                                    <p style="color: #6a5f52; font-size: 15px; line-height: 1.8; margin: 0 0 40px 0;">
                                        You'll be the first to hear about exclusive updates, new arrivals, and special offers.
                                    </p>
                                    <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                        <tr>
                                            <td align="center" style="background-color: #FEA90C;">
                                                <a href="#products" style="display: inline-block; padding: 14px 40px; color: #0F0F0F; text-decoration: none; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; font-family: Georgia, serif; font-weight: bold;">Shop Now</a>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style="border-top: 1px solid #e8e0d0; margin: 44px 0 28px 0;"></div>
                                    <p style="color: #b0a090; font-size: 12px; line-height: 1.7; margin: 0; text-align: center;">
                                        If you didn't subscribe, you can safely ignore this email.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 32px 0 0 0;">
                                    <p style="color: #b0a090; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">© ${new Date().getFullYear()} Brew Bliss LLC</p>
                                    <p style="color: #c0b0a0; font-size: 11px; letter-spacing: 1px; margin: 0;">All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        `,
  });

  await transporter.sendMail({
    from: process.env.MAIL_SENDER_EMAIL,
    to: process.env.MAIL_SENDER_EMAIL,
    subject: "[Brew Bliss] New Newsletter Subscriber",
    html: `
        <div style="font-family: Georgia, serif; padding: 40px; background-color: #F5F0E8;">
            <p style="font-size: 16px; color: #0F0F0F;">New subscriber: <a href="mailto:${to}" style="color: #FEA90C;">${to}</a></p>
        </div>
        `,
  });
};

export { sendResetPasswordMail, sendContactMail, sendNewsletterMail };
